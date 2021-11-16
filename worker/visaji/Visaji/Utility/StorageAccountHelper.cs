using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Visaji.Utility
{
    public interface IStorageAccountHelper
    {
        Task DownloadFile(string containerName, string fileName, string fullPath);
        Task<string> SaveFile(string containerName, string fileName, string fullPath);
    }

    public class StorageAccountHelper : IStorageAccountHelper
    {
        private readonly IConfiguration _configuration;
        private readonly BlobServiceClient _blobServiceClient;

        public StorageAccountHelper(IConfiguration configuration)
        {
            _configuration = configuration;
            _blobServiceClient = new BlobServiceClient(_configuration.GetConnectionString("StorageAccount"));
        }

        public async Task DownloadFile(string containerName, string fileName, string fullPath)
        {
            BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.DownloadToAsync(fullPath);
        }

        public async Task<string> SaveFile(string containerName, string fileName, string fullPath)
        {
            BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.GetBlobClient(fileName);
            var response = await blobClient.UploadAsync(fullPath, true);
            return blobClient.Uri.AbsoluteUri;
        }
    }
}
