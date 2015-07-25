//using Snap;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Reflection;
//using Castle.DynamicProxy;
//using log4net;
//using System.Data.Entity.Validation;
//using CAH.MDM.Infrastructure;

//namespace CAH.MDM.Web.Infrastructure.Interceptors
//{
//    public class HandleExceptionInterceptor : MethodInterceptor
//    {
//        public override void InterceptMethod(IInvocation invocation, MethodBase method, Attribute attribute)
//        {
//            try
//            {
//                invocation.Proceed();
//            }
//            catch (Exception ex)
//            {
//                var originEx = ex.GetOriginalException();
//                LogManager.GetLogger(invocation.InvocationTarget.GetType())
//                    .Error(string.Format("Message:{0}\r\nStackTrace:{1}\r\n", originEx.Message, originEx.StackTrace));
//            }
//        }
//    }
//}