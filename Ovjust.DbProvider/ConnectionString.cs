using DevExpress.Xpo.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ovjust.DbXpoProvider
{
    public class ConnectionString
    {
        string dbServer;

        public string DbServer
        {
            get {
                if (dbServer == null)
                {
                    dbServer= Environment.GetEnvironmentVariable("OPENSHIFT_MYSQL_DB_HOST");
                
                }
                return dbServer; }
        }
        string dbUser;

        public string DbUser
        {
            get { return dbUser; }
        }
        string dbPwd;

        public string DbPwd
        {
            get { return dbPwd; }
        }

        string dbName;

        public string DbName
        {
            get { return dbName; }
        }

        string mysqlPort;
        public string MysqlPort
        {
            get {
                if(mysqlPort==null)
                    mysqlPort = Environment.GetEnvironmentVariable("OPENSHIFT_MYSQL_DB_PORT"); 
                return mysqlPort; }
        }
        EDbType eDbType = EDbType.MySql;

        public EDbType EDbType
        {
            get { return eDbType; }
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
                    str += string.Format("port={0};", connObj.MysqlPort);
                    break;
            }
            return str;
        }
    }

    public enum EDbType { MsSql, MySql, Access }
}
