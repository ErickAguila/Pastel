﻿using System;
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

        public String RegistrarUsuario(int idUsuario, string nombre, string apellido, string email, string pass, int idPerfil)
        {
            try
            {
                Cl_Usuario usuario = new Cl_Usuario();
                usuario.RegistrarUsuario(idUsuario, nombre, apellido, email, pass, idPerfil);
                return "ok";
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
                pasteleriaEntities modelo = new pasteleriaEntities();
                var listar = modelo.Usuario.Where(u => u.idUsuario == idUsuario);
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
        
    }
}
