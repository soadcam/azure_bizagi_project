using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Reflection;
using System.Runtime.Loader;
using Visaji.Models;
using Visaji.Utility.Report;

namespace Visaji
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json", true, true);
            var configuration = builder.Build();
            var architectureFolder = (IntPtr.Size == 8) ? "64 bit" : "32 bit";
            string wkHtmlToPdfPath = Path.Combine(configuration["RootAppPath"], @$"wkhtmltox\v0.12.4\{architectureFolder}\libwkhtmltox");
            CustomAssemblyLoadContext context = new();
            context.LoadUnmanagedLibrary(wkHtmlToPdfPath);
            return Host.CreateDefaultBuilder(args)
                .UseWindowsService()
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<Worker>();
                    services.AddDbContext<VisajiContext>(options =>
                        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Singleton, ServiceLifetime.Singleton);
                    services.AddDatabaseDeveloperPageExceptionFilter();
                    services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
                    services.AddSingleton<IReportService, ReportService>();
                });
        }
    }

    internal class CustomAssemblyLoadContext : AssemblyLoadContext
    {
        public IntPtr LoadUnmanagedLibrary(string absolutePath)
        {
            return LoadUnmanagedDll(absolutePath);
        }
        protected override IntPtr LoadUnmanagedDll(String unmanagedDllName)
        {
            return LoadUnmanagedDllFromPath(unmanagedDllName);
        }

        protected override Assembly Load(AssemblyName assemblyName)
        {
            throw new NotImplementedException();
        }
    }
}
