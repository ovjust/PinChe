using Ovjust.Pinche.Web.Infrastructure;
using System.Web.Mvc;

namespace CAH.MDM.Web.Infrastructure
{
    public class BaseController : Controller
    {
        /// <summary>
        /// 访问预处理
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //是否已登录
            if (UserAuthority.GetCurUser() == null)
            {
                filterContext.Result = new RedirectResult("/Account/Login?returnUrl=" + Request.Path);
                return;
            }

 //           //
 //           bool bPermission = MenuHelper.CheckPagePermission(RouteData.Values["controller"].ToString(),
 //RouteData.Values["action"].ToString());
 //           if (!bPermission)
 //           {
 //               var mPageFirst = MenuHelper.GetFirstPage();
 //               filterContext.Result = new RedirectResult(string.Format("/{0}/{1}", mPageFirst.Controller, mPageFirst.Action));
 //               return;
 //           }
 //           base.OnActionExecuting(filterContext);
        }
    }
}