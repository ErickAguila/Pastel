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

        public List<pa_RegistrarUsuario_Result> RegistrarUsuario(int idUsuario, string nombre, string apellido, string email, string pass, int idPerfil)
        {
            try
            {
                var resp = modelo.pa_RegistrarUsuario(idUsuario, nombre, apellido, email, pass, idPerfil).ToList();
                return resp;
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


        public List<pa_ListarUsuarioNoVigente_Result> ListarUsuarioNoVigente()
        {
            try
            {
                var resp = modelo.pa_ListarUsuarioNoVigente().ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_SubirUsuario_Result> SubirUsuario(int idUsuario)
        {
            try
            {
                var resp = modelo.pa_SubirUsuario(idUsuario).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
