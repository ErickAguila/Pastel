using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbPastel;
using Newtonsoft.Json;

namespace Pastel.Controllers
{
    public class ProductoController : Controller
    {
        public ActionResult Productos()
        {
            if (Session["NombreUsuario"] != null)
            {
                ViewBag.nombreUsuario = Session["NombreUsuario"].ToString();
            }
            return View();
        }

        public ActionResult MantenedorProducto()
        {
            pasteleriaEntities modelo = new pasteleriaEntities();
            ViewBag.categoria = modelo.Categoria.Where(c => c.vigente == true).OrderBy(c => c.nombre);
            return View();
        }

        public ActionResult Ventas()
        {
            return View();
        }

        public ActionResult MantenedorCategoria()
        {
            return View();
        }

        public String ListarProducto()
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var lista = producto.ListarProducto();
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ListarCategoria()
        {
            try
            {
                pasteleriaEntities modelo = new pasteleriaEntities();
                var lista = modelo.Categoria.OrderBy(c => c.nombre);
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String GuardarProducto(int idProducto, int idCategoria, string nombreProducto, string precioProducto, string descripcion)
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var respuesta = producto.GuardarProducto(idProducto, idCategoria, nombreProducto, precioProducto, descripcion);
                return respuesta.First().mensaje;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String GuardarCategoria(int idCategoria, string nombreCategoria)
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var respuesta = producto.GuardarCategoria(idCategoria, nombreCategoria);
                return respuesta.First().mensaje;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ObtenerDatoProducto(int idProducto)
        {
            try
            {
                pasteleriaEntities modelo = new pasteleriaEntities();
                var lista = modelo.Producto.Where(p => p.idProducto == idProducto);
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ObtenerDatosCategoria(int idCategoria)
        {
            try
            {
                pasteleriaEntities modelo = new pasteleriaEntities();
                var lista = modelo.Categoria.Where(c => c.idCategoria == idCategoria);
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String BajarProducto(int idProducto)
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var respuesta = producto.BajarProducto(idProducto).First();
                return respuesta.respuesta;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
