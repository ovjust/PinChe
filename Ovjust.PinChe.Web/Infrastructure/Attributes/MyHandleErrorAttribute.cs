using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ovjust.Pinche.Web.Infrastructure.Attributes
{
    public class MyHandleErrorAttribute : HandleErrorAttribute
    {

        public override void OnException(ExceptionContext filterContext)
        {

            base.OnException(filterContext);

            string path = filterContext.HttpContext.Server.MapPath("~/Exception.txt");

            StreamWriter sw = System.IO.File.AppendText(path);

            sw.WriteLine(DateTime.Now.ToString() + ":" + filterContext.Exception.Message);

            sw.Close();

        }

    }
}