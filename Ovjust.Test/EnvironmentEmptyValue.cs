using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Ovjust.Test
{
    [TestClass]
    public class EnvironmentEmptyValue
    {
        [TestMethod]
        public void TestMethod1()
        {
            var dbServer = Environment.GetEnvironmentVariable("OPENSHIFT_MYSQL_DB_HOST");
        }
    }
}
