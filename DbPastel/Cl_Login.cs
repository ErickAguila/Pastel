using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbPastel
{
    public class Cl_Login
    {
        pasteleriaEntities modelo = new pasteleriaEntities();

        public List<pa_Login_Result> Login(string user, string pass)
        {
            try
            {
                var resp = modelo.pa_Login(user, pass).ToList();
                return resp;           }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
