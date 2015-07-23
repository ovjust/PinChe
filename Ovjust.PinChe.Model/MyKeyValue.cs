using DevExpress.Xpo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ovjust.Pinche.Model
{
    public class MyKeyValue : XPBaseObject
    {
        public MyKeyValue():base()
        { }
        public MyKeyValue(Session se)
            : base(se)
        { }
        [Key(true)]
        public int Id { set; get; }
        public string Key { set; get; }
        public object Value { set; get; }
    }
}
