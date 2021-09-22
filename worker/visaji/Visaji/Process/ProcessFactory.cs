using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Visaji.Process
{
    public class ProcessFactory
    {
        private readonly ProcessConfiguration _configuration;

        public ProcessFactory(ProcessConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IEnumerable<AbstractProces> GetProcesses()
        {
            foreach (var type in Enum.GetValues(typeof(ProcessType)).Cast<ProcessType>())
                yield return GetProcess(type);
        }

        private AbstractProces GetProcess(ProcessType processType)
        {
            var assembly = Assembly.GetExecutingAssembly();
            Type type = assembly.GetType($"Visaji.Process.Implementations.{processType.ToString()}Process");
            return (AbstractProces)Activator.CreateInstance(type, new object[] { _configuration });
        }
    }
}
