using AutoMapper;
using DevExpress.Data.Filtering;
using DevExpress.Xpo;
using Ovjust.DbXpoProvider;
using Ovjust.Pinche.Model.Orm;
using Ovjust.Pinche.Web.Infrastructure;
using Ovjust.Pinche.Web.Infrastructure.Attributes;
using Ovjust.Pinche.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ovjust.Pinche.Web.WebApi
{
    public class MyPointController : ApiController
    {
        // GET api/<controller>
        public dynamic Get()
        {
            //var query= new XPQuery<XpPoint>( XpoHelper.Sess);
            Func<IQueryable<XpPoint>> GetTestFind = () =>
         {
             var user = UserAuthority.CheckGetUser();
             var query = XpoHelper.Sess.Query<XpPoint>();
             IQueryable<XpPoint> find1 = query.Where(p => p.UserCode == user.Code);
             return find1;
         };
            IQueryable<XpPoint> find = GetTestFind();
            if (find.Count() == 0)
          {
              //AddTestData();
              find = GetTestFind();
          }
            var list =Mapper.Map<XpPointListModel>( find);
            return list;
            //return new string[] { "value1", "value2" };
        }

        //private static IQueryable<XpPoint> GetTestFind()
        //{
        //    var query = XpoHelper.Sess.Query<XpPoint>();
        //    IQueryable<XpPoint> find = query.Where(p => p.UserId == 1);
        //    return find;
        //}

        //private static void AddTestData()
        //{
        //    {
        //        var p1 = new XpPoint() { Name = "p1", UserId = 1, Address = "a1" };
        //        XpoHelper.Sess.Save(p1);
        //    }
        //    {
        //        var p1 = new XpPoint() { Name = "p2", UserId = 1, Address = "a2" };
        //        XpoHelper.Sess.Save(p1);
        //    }
        //    {
        //        var p1 = new XpPoint() { Name = "p3", UserId = 2, Address = "a3" };
        //        XpoHelper.Sess.Save(p1);
        //    }
        //}


        [MyHandleError]
        // GET api/<controller>/5
        public dynamic Get(int id)
        {
            CriteriaOperator go = new BinaryOperator("UserId", 1);
            var coll = new XPCollection<XpPoint>(XpoHelper.Sess, go, null, null);

            if (coll.Count == 0)
            {
                //AddTestData();
                coll.Reload();
            }
            return coll;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}