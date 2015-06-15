using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Ovjust.DbXpoProvider
{
    public class XpoLogWriterTextBox : TraceListener
    {
        TextBox outputWindow;
        public XpoLogWriterTextBox(TextBox outputWindow)
        {
            this.outputWindow = outputWindow;
        }
        public override void Write(string message)
        {
            outputWindow.AppendText(message);
        }
        public override void WriteLine(string message)
        {
            outputWindow.AppendText(message + "\r\n");
        }
    }
}
