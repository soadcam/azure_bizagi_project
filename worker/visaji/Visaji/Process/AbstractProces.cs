using System.Threading.Tasks;
using Visaji.Models;

namespace Visaji.Process
{
    public abstract class AbstractProces
    {
        protected readonly ProcessConfiguration _configuration;

        protected AbstractProces(ProcessConfiguration configuration)
        {
            _configuration = configuration;
        }

        public abstract void Execute();
    }
}
