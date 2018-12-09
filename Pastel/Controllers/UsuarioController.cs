using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbPastel;
using Newtonsoft.Json;

namespace Pastel.Controllers
{
    public class UsuarioController : Controller
    {
        public ActionResult MantenedorUsuario()
        {
            pasteleriaEntities modelo = new pasteleriaEntities();
            ViewBag.perfil = modelo.Perfil.Where(p => p.vigente == true).OrderBy(p => p.nombre);
            return View();
        }

        public ActionResult ManteneodrUsuarioNoVigente()
        {
            return View();
        }

        public ActionResult MiPerfil()
        {
            return View();
        }

        public ActionResult MiPedido()
        {
            return View();
        }

        public String RegistrarUsuario(int idUsuario, string nombre, string apellido, string email, string pass, int idPerfil)
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                var res = usuario.RegistrarUsuario(idUsuario, nombre, apellido, email, pass, idPerfil).First();
                return res.respuesta;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ObtenerDatosUsuario(int idUsuario)
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                var idUsu = 0;
                var usu = Convert.ToInt32(Session["idUsuario"]);
                if (idUsuario == 0)
                {
                    idUsu = usu;
                }
                else {
                    idUsu = idUsuario;
                }
                var listar = usuario.ObtenerDatoUsuario(idUsu);
                return JsonConvert.SerializeObject(listar).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String BajarUsuario(int idUsuario)
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                var resp = usuario.BajarUsuario(idUsuario);
                return resp.First().respuesta;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ListarUsuario()
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                var listar = usuario.ListarUsuario();
                return JsonConvert.SerializeObject(listar).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public String ListarUsuarioNoVigente()
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                var lista = usuario.ListarUsuarioNoVigente();
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String SubirUsuario(int idUsuario)
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                var resp = usuario.SubirUsuario(idUsuario);
                return resp.First().respuesta;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ListarMisPedidos()
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                var idUsuario = Convert.ToInt32(Session["idUsuario"]);
                var lista = usuario.ListarMisPerdidos(idUsuario);
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
