using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ovjust.Pinche.Web.Controllers.Base
{
    public class BaseController : Controller
    {
        //
        // GET: /Base/

        protected override void OnException(ExceptionContext filterContext)
        {

            //LogManager logManager = new LogManager(Server.MapPath("~/Exception.txt"));

            //logManager.SaveLog(filterContext.Exception.Message, DateTime.Now);

            base.OnException(filterContext);

        }

    }
}
