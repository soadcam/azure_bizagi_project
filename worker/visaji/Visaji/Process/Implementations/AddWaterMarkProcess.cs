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
            string containerName = credit.UploadUrlPath;
            string fileName = Path.GetFileName(credit.PropertyUrlOriginal);
            string localFullPath = Path.Combine(Path.GetTempPath(), fileName);
            string modifiedFileName = $"{Path.GetFileNameWithoutExtension(fileName)}_modified{Path.GetExtension(fileName)}";
            string localModifiedFullPath = Path.Combine(Path.GetTempPath(), modifiedFileName);
            _configuration.StorageAccountHelper.DownloadFile(containerName, fileName, localFullPath).Wait();
            using var image = new MagickImage(localFullPath);
            image.Resize(Convert.ToInt32(_configuration.Configuration["WidthResize"]), Convert.ToInt32(_configuration.Configuration["HeighResize"]));
            image.Strip();

            var label = new MagickImage(MagickColors.Transparent, image.Width, image.Height);
            label.Settings.TextAntiAlias = false;
            label.Settings.FontPointsize = 30;
            label.Settings.FillColor = MagickColors.Red;
            label.Annotate($"{credit.Customer.Fullname}{Environment.NewLine}{credit.Customer.IdentityNumber}", Gravity.Southeast);
            image.Composite(label, Gravity.Southeast, CompositeOperator.Over);

            image.Write(localModifiedFullPath);
            credit.PropertyUrlModified = _configuration.StorageAccountHelper.SaveFile(containerName, modifiedFileName, localModifiedFullPath).Result;
        }
    }
}
