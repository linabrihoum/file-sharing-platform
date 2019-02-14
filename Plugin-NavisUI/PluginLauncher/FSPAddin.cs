using Autodesk.Navisworks.Api;
using Autodesk.Navisworks.Api.Plugins;
using System.Windows.Forms;
using System.Diagnostics;

namespace PluginLauncher
{
    [PluginAttribute("FSP", "FSPD", DisplayName = "FSP")]
    public class FSPAddin : AddInPlugin
    {
        public override int Execute(params string[] parameters)
        {
            string filePath = "C:\\Users\\madsc\\Desktop\\plugin-app\\release-builds\\electron-tutorial-app-win32-ia32\\electron-tutorial-app.exe";
            Process.Start(filePath);
            MessageBox.Show("heya");

            return 0;
        }
    }
}
