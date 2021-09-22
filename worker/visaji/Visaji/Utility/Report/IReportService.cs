namespace Visaji.Utility.Report
{
    public interface IReportService
    {
        public byte[] GeneratePdfReport(string html);
    }
}
