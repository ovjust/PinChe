using DevExpress.Xpo;
using Ovjust.Pinche.Basic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ovjust.Pinche.Model.Orm.Base
{
    [NonPersistent]
    [OptimisticLocking(false)]
    public class XPObjectBase : XPBaseObject
    {
        [NonPersistent]
        public bool IsSystemUser;
        protected XPObjectBase()
        {
            this.IsSystemUser = true;
        }
        public XPObjectBase(Session session)
            : base(session)
        {
            this.IsSystemUser = true;
        }
        [DisplayName("创建时间")]
        public virtual DateTime Rec_CreateTime { get; set; }
        //[DisplayName("创建人")]
        //public virtual string Rec_CreateBy { get; set; }
        [DisplayName("已经删除")]
        public virtual int Disabled { get; set; }
        //[Key(true)]
        //public virtual int ID { get; set; }
        [DisplayName("修改时间")]
        public virtual DateTime Rec_ModifyTime { get; set; }
        //[DisplayName("修改人")]
        //public virtual string Rec_ModifyBy { get; set; }


        //public virtual void deserialize(byte[] buffer)
        //{
        //    MemoryStream input = new MemoryStream(buffer);
        //    BinaryReader reader = new BinaryReader(input);
        //    //this.ID = reader.ReadInt32();
        //    this.Rec_CreateTime = Convert.ToDateTime(reader.ReadString());
        //    this.Rec_CreateBy = reader.ReadString();
        //    this.Rec_ModifyTime = Convert.ToDateTime(reader.ReadString());
        //    this.Rec_ModifyBy = reader.ReadString();
        //    //this.gcFlag = reader.ReadBoolean();
        //}
        //public virtual void OnInitialize()
        //{
        //    //this.gcFlag = false;
        //    this.Rec_CreateTime = this.Rec_ModifyTime = Convert.ToDateTime(DateTime.MinValue);
        //}
        protected override void OnSaving()
        {
            base.OnSaving();
            DateTime now = Global.Now;
            this.Rec_ModifyTime = now;
        
            //if (this.ID == 0)
            if (this.Rec_CreateTime == DateTime.MinValue)
            {
                this.Rec_CreateTime = now;
                //if (this.IsSystemUser)
                //{
                //    this.Rec_CreateBy = GetLoginUserId();
                //}
                //else
                //{
                //    this.Rec_CreateBy = this.Rec_ModifyBy;
                //}
            }
            //else
            //{
            //this.Rec_ModifyTime = now;
            //    if (this.IsSystemUser)
            //    {
            //        this.Rec_ModifyBy = GetLoginUserId();
            //    }
            //    else
            //    {
            //        this.Rec_ModifyBy = this.Rec_ModifyBy;
            //    }
            //}
        }

        //private string GetLoginUserId()
        //{
        //    var user = Global.LoginUser as XPUserInfo;
        //    return user == null ? null : user.EmployeeId.ToString();
        //}
        //public virtual byte[] serialize()
        //{
        //    MemoryStream output = new MemoryStream();
        //    BinaryWriter writer = new BinaryWriter(output);
        //    //writer.Write(this.ID);
        //    writer.Write(this.Rec_CreateTime.ToString("yyyy-MM-dd HH:mm:ss"));
        //    writer.Write((this.Rec_CreateBy == null) ? "" : this.Rec_CreateBy);
        //    writer.Write(this.Rec_ModifyTime.ToString("yyyy-MM-dd HH:mm:ss"));
        //    writer.Write((this.Rec_ModifyBy == null) ? "" : this.Rec_ModifyBy);
        //    //writer.Write(this.gcFlag);
        //    byte[] buffer = output.ToArray();
        //    writer.Close();
        //    output.Close();
        //    return buffer;
        //}
    }
}
