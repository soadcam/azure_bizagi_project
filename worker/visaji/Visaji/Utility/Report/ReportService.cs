using DinkToPdf;
using DinkToPdf.Contracts;

namespace Visaji.Utility.Report
{
    public class ReportService : IReportService
    {
        private readonly IConverter _converter;
        public ReportService(IConverter converter)
        {
            _converter = converter;
        }
        public byte[] GeneratePdfReport(string html)
        {
            GlobalSettings globalSettings = new()
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 25, Bottom = 25 }
            };
            ObjectSettings objectSettings = new()
            {
                PagesCount = true,
                HtmlContent = html
            };
            WebSettings webSettings = new()
            {
                DefaultEncoding = "utf-8"
            };
            HeaderSettings headerSettings = new()
            {
                FontSize = 15,
                FontName = "Ariel",
                Right = "Page [page] of [toPage]",
                Line = true
            };
            FooterSettings footerSettings = new()
            {
                FontSize = 12,
                FontName = "Ariel",
                Center = "VISAJI",
                Line = true
            };
            objectSettings.HeaderSettings = headerSettings;
            objectSettings.FooterSettings = footerSettings;
            objectSettings.WebSettings = webSettings;
            HtmlToPdfDocument htmlToPdfDocument = new()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings },
            };
            return _converter.Convert(htmlToPdfDocument);
        }
    }
}
