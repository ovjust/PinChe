using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ovjust.DbXpoProvider;
using DevExpress.Xpo;
using DevExpress.Xpo.Exceptions;
using Ovjust.Pinche.Model;

namespace Ovjust.Test
{
    [TestClass]
    public class XpoConn
    {
        [TestInitialize]
        public void SetUp()
        {
            XpoSessionInit.Init();
        }
        [TestMethod]
        public void BaiduMysqlSucess()
        {
            try
            {
                var sess = XpoSessionInit.Sess;
                var m = new MyKeyValue(sess);
                var now = DateTime.Now;
                m.Key = now.ToLongTimeString();
                m.Value = now;
                m.Save();
                var query = sess.GetObjectByKey<MyKeyValue>(1);
                var k = query.Key;
               var list= new XPQuery<MyKeyValue>(sess).ToList();
             var data=  sess.ExecuteQuery("select * from MyKeyValue");
                //var data = sess.ExecuteQuery("show dataBases");
            }
            catch { }
        }
    }
}
