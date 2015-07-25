using Ovjust.Pinche.Web.Controllers.Base;
using Ovjust.Pinche.Web.Infrastructure.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ovjust.Pinche.Web.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Home/
        [MyHandleError]
        public ActionResult Index()
        {
            return View();
        }

  
    }
}
