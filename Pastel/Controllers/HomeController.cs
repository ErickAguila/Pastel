using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbPastel;
using Newtonsoft.Json;

namespace Pastel.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Home()
        {
            if (Session["NombreUsuario"] != null)
            {
                ViewBag.nombreUsuario = Session["NombreUsuario"].ToString();
                ViewBag.idPerfilUsuario = Session["PerfilUsuario"].ToString();
            }
            return View();
        }

        public ActionResult Productos()
        {
            if (Session["NombreUsuario"] != null)
            {
                ViewBag.nombreUsuario = Session["NombreUsuario"].ToString();
                ViewBag.idPerfilUsuario = Session["PerfilUsuario"].ToString();
            }
            return View();
        }

        public ActionResult Resumen()
        {
            return View();
        }

        public String FinSession()
        {
            Session.Abandon();
            Session.Clear();
            return "ok";
        }

        public String Login(string user, string pass)
        {
            try
            {
                Cl_Login login = new Cl_Login();
                var respuesta = login.Login(user, pass);
                if (respuesta.First().mensaje == "Existe usuario")
                {
                    pasteleriaEntities modelo = new pasteleriaEntities();
                    var usuario = modelo.Usuario.Where(u => u.email == user && u.pass == pass);
                    Session["NombreUsuario"] = usuario.First().nombre;
                    Session["PerfilUsuario"] = usuario.First().idPerfil;
                    Session["idUsuario"] = usuario.First().idUsuario;
                    return "ok";
                }
                else {
                    return "error";
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}