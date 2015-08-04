using DevExpress.Xpo;
using Ovjust.Pinche.Model.Orm.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ovjust.Pinche.Model.Orm
{
    public class XpUser : BaseXPObject
    {
        public XpUser()
            : base()
        {
        }

        [DisplayName("名称")]
        [Size(20)]
        public string Name { get; set; }

        [DisplayName("名称")]
        [Size(20)]
        public string NickName { get; set; }

        [DisplayName("邮箱")]
        [Size(50)]
        public string Email { get; set; }

        [DisplayName("密码")]
        [Size(20)]
        public string Pwd { get; set; }

        [DisplayName("手机")]
        [Size(20)]
        public string Mobile { get; set; }
    }
}
