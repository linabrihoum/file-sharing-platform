using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NavisConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            if(args.Length > 0)
            {
                for(int i = 0; i < args.Length; i++)
                {
                    Console.WriteLine(args[i]);
                }
            }
        }
    }
}
