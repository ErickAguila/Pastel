using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbPastel
{
    public class Cl_Usuario
    {
        pasteleriaEntities modelo = new pasteleriaEntities();

        public void RegistrarUsuario(int idUsuario, string nombre, string apellido, string email, string pass, int idPerfil)
        {
            try
            {
                modelo.pa_RegistrarUsuario(idUsuario, nombre, apellido, email, pass, idPerfil);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_ListarUsuario_Result> ListarUsuario()
        {
            try
            {
                var resp = modelo.pa_ListarUsuario().ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_BajarUsuario_Result> BajarUsuario(int idUsuario)
        {
            try
            {
                var resp = modelo.pa_BajarUsuario(idUsuario).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
