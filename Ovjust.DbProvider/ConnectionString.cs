using DevExpress.Xpo.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;

namespace Ovjust.DbXpoProvider
{
    public class ConnectionString
    {
        string dbServer;

        public string DbServer
        {
            get
            {
                if (dbServer == null)
                {
                    dbServer = Environment.GetEnvironmentVariable("OPENSHIFT_MYSQL_DB_HOST");
                    if (dbServer == null)
                        dbServer = ConfigurationManager.AppSettings["dbServer"];
                }
                return dbServer;
            }
        }
        string dbUser;

        public string DbUser
        {
            get
            {
                if (dbUser == null)
                    dbUser = ConfigurationManager.AppSettings["dbUser"];
                return dbUser;
            }
        }
        string dbPwd;

        public string DbPwd
        {
            get
            {
                if (dbPwd == null)
                    dbPwd = ConfigurationManager.AppSettings["dbPwd"];
                return dbPwd;
            }
        }

        string dbName;

        public string DbName
        {
            get
            {
                if (dbName == null)
                    dbName = ConfigurationManager.AppSettings["dbName"];
                return dbName;
            }
        }

        string mysqlPort;
        public string MysqlPort
        {
            get
            {
                if (mysqlPort == null)
                {
                    mysqlPort = Environment.GetEnvironmentVariable("OPENSHIFT_MYSQL_DB_PORT");
                    if (mysqlPort == null)
                        mysqlPort = ConfigurationManager.AppSettings["dbServer"];
                }
                return mysqlPort;
            }
        }
        EDbType eDbType = EDbType.None;

        public EDbType EDbType
        {
            get
            {
                if (eDbType == EDbType.None)
                {
                    var sType = ConfigurationManager.AppSettings["dbServer"];
                    eDbType = (EDbType)Enum.Parse(typeof(EDbType), sType, true);
                }
                return eDbType;
            }
        }
        public static string GetString()
        {
            string str = null;
            var connObj = new ConnectionString();

            switch (connObj.EDbType)
            {
                case EDbType.MySql:
                    str = MySqlConnectionProvider.GetConnectionString(connObj.dbServer, connObj.dbUser, connObj.dbPwd, connObj.dbName);
                    if (!string.IsNullOrEmpty(connObj.MysqlPort) && connObj.MysqlPort != "3306")
                        str += string.Format("port={0};", connObj.MysqlPort);
                    break;

                case EDbType.MsSql:
                    str = MSSqlConnectionProvider.GetConnectionString(connObj.dbServer, connObj.dbUser, connObj.dbPwd, connObj.dbName);
                    break;
            }
            return str;
        }
    }

    
}
