using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;

namespace Ovjust.DbXpoProvider
{
    public class XpoLogWriterTextFile : TraceListener
    {
        string fileName = "log.txt";
        FileStream fs;
        public XpoLogWriterTextFile()
        {
             fs=  File.Open(fileName, FileMode.OpenOrCreate,FileAccess.ReadWrite);
            File
        }
        public override void Write(string message)
        {
           fs.w
        }
        public override void WriteLine(string message)
        {
            outputWindow.AppendText(message + "\r\n");
        }
    }
}
