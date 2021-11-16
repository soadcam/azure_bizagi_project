using Microsoft.Extensions.Configuration;
using Visaji.Models;
using Visaji.Utility;
using Visaji.Utility.Report;

namespace Visaji.Process
{
    public class ProcessConfiguration
    {
        public VisajiContext Context { get; set; }
        public IConfiguration Configuration { get; set; }
        public IReportService ReportService { get; set; }
        public IStorageAccountHelper StorageAccountHelper { get; set; }
    }
}
