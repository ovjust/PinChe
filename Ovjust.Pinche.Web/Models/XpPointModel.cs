using DevExpress.Xpo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ovjust.Pinche.Web.Models
{
    public class XpPointListModel
    {
        [Key(true)]
        [DisplayName("Id")]
        public virtual int Id { set; get; }
        [Indexed]
        [DisplayName("Guid")]
        public virtual Guid Code { set; get; }
        [DisplayName("创建时间")]
        public virtual DateTime CreateTime { get; set; }
        //[DisplayName("创建人")]
        //public virtual string Rec_CreateBy { get; set; }
        [DisplayName("已经删除")]
        public virtual bool Disabled { get; set; }
        //[Key(true)]
        //public virtual int ID { get; set; }
        [DisplayName("修改时间")]
        public virtual DateTime ModifyTime { get; set; }

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