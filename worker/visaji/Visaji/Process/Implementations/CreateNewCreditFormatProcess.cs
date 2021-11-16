using System.IO;
using System.Linq;
using System.Text;
using Visaji.Models;

namespace Visaji.Process.Implementations
{
    public class CreateNewCreditFormatProcess : AbstractProces
    {
        public CreateNewCreditFormatProcess(ProcessConfiguration configuration) : base(configuration)
        {
        }

        public override void Execute()
        {
            var credits = _configuration.Context.Credits
                .Where(c => string.IsNullOrEmpty(c.FormatCreditUrl));
            foreach (var credit in credits)
                CreateFormatPdf(credit);
            if (credits.Any())
                _configuration.Context.SaveChanges();
        }

        private void CreateFormatPdf(Credit credit)
        {
            string formatHtml = Encoding.UTF8.GetString(Resources.format_credit);
            formatHtml = formatHtml.Replace("@@fullname", credit.Customer.Fullname)
                        .Replace("@@identity_number", credit.Customer.IdentityNumber)
                        .Replace("@@amount_requested", credit.AmmountRequested.ToString("C"))
                        .Replace("@@comments", credit.Comments);
            var reportBytes = _configuration.ReportService.GeneratePdfReport(formatHtml);
            credit.FormatCreditUrl = Path.Combine(Path.GetTempPath(), $"report_{credit.Customer.IdentityNumber}.pdf");
            if (File.Exists(credit.FormatCreditUrl))
                File.Delete(credit.FormatCreditUrl);
            if (!Directory.Exists(Path.GetDirectoryName(credit.FormatCreditUrl)))
                Directory.CreateDirectory(Path.GetDirectoryName(credit.FormatCreditUrl));
            File.WriteAllBytes(credit.FormatCreditUrl, reportBytes);
            credit.FormatCreditUrl = _configuration.StorageAccountHelper.SaveFile(credit.UploadUrlPath, Path.GetFileName(credit.FormatCreditUrl), credit.FormatCreditUrl).Result;
        }
    }
}
