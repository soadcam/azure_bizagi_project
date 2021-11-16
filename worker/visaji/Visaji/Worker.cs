using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Visaji.Models;
using Visaji.Process;
using Visaji.Utility;
using Visaji.Utility.Report;

namespace Visaji
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly VisajiContext _context;
        private readonly IConfiguration _configuration;
        private readonly IReportService _reportService;
        private readonly IStorageAccountHelper _storageAccountHelper;
        private readonly ProcessConfiguration _processConfiguration;

        public Worker(ILogger<Worker> logger,
                        VisajiContext context,
                        IConfiguration configuration,
                        IReportService reportService,
                        IStorageAccountHelper storageAccountHelper)
        {
            _logger = logger;
            _context = context;
            _configuration = configuration;
            _reportService = reportService;
            _storageAccountHelper = storageAccountHelper;
            _processConfiguration = new()
            {
                Context = _context,
                Configuration = _configuration,
                ReportService = _reportService,
                StorageAccountHelper = _storageAccountHelper,
            };
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var factory = new ProcessFactory(_processConfiguration);
            _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            CreateFormatNewCredits(factory);
        }

        private void CreateFormatNewCredits(ProcessFactory processFactory) 
        {
            var customers = _context.Customers.ToList();
            var procesors = processFactory.GetProcesses();
            procesors.ToList().ForEach(p => p.Execute());
        }
    }
}