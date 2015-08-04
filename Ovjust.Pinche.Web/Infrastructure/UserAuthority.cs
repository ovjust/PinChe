using DevExpress.Xpo;
using Ovjust.DbXpoProvider;
using Ovjust.Pinche.Basic;
using Ovjust.Pinche.Model.Orm;
using System.Linq;
using System.Web;

namespace Ovjust.Pinche.Web.Infrastructure
{
    public class UserAuthority
    {
        public static void SetCurUser(XpUser user)
        {
            HttpContext.Current.Session[Sessions.User] = user;
        }

        public static XpUser GetCurUser()
        {
            return HttpContext.Current.Session[Sessions.User] as XpUser;
        }

        public static XpUser CheckGetUser()
        {
            var user = GetCurUser();
            if (user == null)
            {
                throw new NotLoginException();
            }
            return user;
        }

        public static XpUser GetLogin(string name, string pwd)
        {
            var query = new XPQuery<XpUser>(XpoHelper.Sess);
            var user = query.SingleOrDefault(p => p.Name == name && p.Pwd == pwd && p.Disabled == false);
            return user;
        }
    }
}