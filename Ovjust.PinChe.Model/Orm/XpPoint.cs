using DevExpress.Xpo;
using Ovjust.Pinche.Model.Orm.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ovjust.Pinche.Model.Orm
{
    public class XpPoint:BaseXPObject
    {
        public XpPoint()
            : base()
        {
        }
        public XpPoint(Session sess)
            : base(sess)
        {
        }

       

        [DisplayName("用户")]
        public Guid UserCode { set; get; }

        [DisplayName("名称")]
        [Size(20)]
        public string Name { set; get; }

        [DisplayName("地址")]
        [Size(100)]
        public string Address { set; get; }

        [DisplayName("城市")]
        [Size(20)]
        public string City { set; get; }

        [DisplayName("经度")]
        public decimal Longitude { set; get; }

        [DisplayName("纬度")]
        public decimal Latitude { set; get; }


    }
}
