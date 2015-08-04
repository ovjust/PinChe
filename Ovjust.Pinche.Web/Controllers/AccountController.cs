using Ovjust.Pinche.Web.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Ovjust.Pinche.Web.Controllers
{
    public class AccountController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (UserAuthority.GetCurUser() == null)
                return View();
            if (returnUrl != null && !string.IsNullOrEmpty(returnUrl.TrimEnd('/')))
            {
                return RedirectToLocal("/default/index/" + "?returnUrl=" + returnUrl);
            }
            return RedirectToAction("Index", "Default");
        }

        [AllowAnonymous]
        public ActionResult Regist(string returnUrl)
        {
            if (UserAuthority.GetCurUser() == null)
                return View();
            if (returnUrl != null && !string.IsNullOrEmpty(returnUrl.TrimEnd('/')))
            {
                return RedirectToLocal("/default/index/" + "?returnUrl=" + returnUrl);
            }
            return RedirectToAction("Index", "Default");
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            Session.Abandon();
            Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
            Response.Expires = 0;
            Response.Buffer = true;
            Response.ExpiresAbsolute = DateTime.Now.AddSeconds(-1);
            Response.AddHeader("pragma", "no-cache");
            Response.CacheControl = "no-cache";

            Response.Headers["UID"] = string.Empty;

            return RedirectToAction("Index","Home");
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            var user = UserAuthority.GetLogin(model.UserName,model.Password);

            if (ModelState.IsValid && user != null)
            {
                FormsAuthentication.SetAuthCookie(model.UserName, false);
                UserAuthority.SetCurUser(user);
                if (returnUrl != null && !string.IsNullOrEmpty(returnUrl.TrimEnd('/')))
                {
                    return RedirectToLocal("/Home/index/" + "?returnUrl=" + returnUrl);
                }
                return RedirectToAction("Index", "Home");
            }

            ViewBag.Error = "用户名或密码不正确。";
            return View(model);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        public class LoginViewModel
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }
    }
}
