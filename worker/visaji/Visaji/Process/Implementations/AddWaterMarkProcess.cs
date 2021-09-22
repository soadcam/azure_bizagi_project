using ImageMagick;
using System;
using System.IO;
using System.Linq;
using Visaji.Models;

namespace Visaji.Process.Implementations
{
    public class AddWaterMarkProcess : AbstractProces
    {
        public AddWaterMarkProcess(ProcessConfiguration configuration) : base(configuration)
        {
        }

        public override void Execute()
        {
            var credits = _configuration.Context.Credits
                .Where(c => !string.IsNullOrEmpty(c.PropertyUrlOriginal) && string.IsNullOrEmpty(c.PropertyUrlModified));
            foreach (var credit in credits)
                ProcessImageCredit(credit);
            if (credits.Any())
                _configuration.Context.SaveChanges();
        }

        private void ProcessImageCredit(Credit credit)
        {
            credit.PropertyUrlModified = Path.Combine(credit.UploadUrlPath, $"{Path.GetFileNameWithoutExtension(credit.PropertyUrlOriginal)}_modified{Path.GetExtension(credit.PropertyUrlOriginal)}");
            if (!Directory.Exists(Path.GetDirectoryName(credit.PropertyUrlModified)))
                Directory.CreateDirectory(Path.GetDirectoryName(credit.PropertyUrlModified));
            using var image = new MagickImage(credit.PropertyUrlOriginal);
            image.Resize(Convert.ToInt32(_configuration.Configuration["WidthResize"]), Convert.ToInt32(_configuration.Configuration["HeighResize"]));
            image.Strip();

            var label = new MagickImage(MagickColors.Transparent, image.Width, image.Height);
            label.Settings.TextAntiAlias = false;
            label.Settings.FontPointsize = 30;
            label.Settings.FillColor = MagickColors.Red;
            label.Annotate($"{credit.Customer.Fullname}{Environment.NewLine}{credit.Customer.IdentityNumber}", Gravity.Southeast);
            image.Composite(label, Gravity.Southeast, CompositeOperator.Over);

            image.Write(credit.PropertyUrlModified);
        }
    }
}
