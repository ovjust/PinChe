using DevExpress.Xpo;
using DevExpress.Xpo.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ovjust.DbXpoProvider
{
    public class SessionInit
    {
        public static void Init()
        {
            XpoDefault.DataLayer = XpoDefault.GetDataLayer(ConnectionString.GetString(), AutoCreateOption.DatabaseAndSchema);
            //
        }
          
    }
}
