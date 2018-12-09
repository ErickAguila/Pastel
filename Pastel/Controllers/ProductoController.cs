using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DbPastel;
using Newtonsoft.Json;
using System.Web.Http;

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

        public ActionResult MantenedorProductoNoVigente()
        {
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

        public ActionResult Pedidos()
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
                Cl_Producto producto = new Cl_Producto();
                var lista = producto.ListarCategoria();
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

        public String GuardarCategoria(int idCategoria, string nombreCategoria,int isVigente)
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var vigente = Convert.ToBoolean(isVigente);
                var respuesta = producto.GuardarCategoria(idCategoria, nombreCategoria,vigente);
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
                Cl_Producto producto = new Cl_Producto();
                var lista = producto.ObtenerDatoProducto(idProducto);
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
                Cl_Producto producto = new Cl_Producto();
                var lista = producto.ObtenerDatoCategoria(idCategoria);
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

        public String ListarProductoNoVigente()
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var listar = producto.ListarProductoNoVigente();
                return JsonConvert.SerializeObject(listar).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String SubirProducto(int idProducto)
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var resp = producto.SubirProducto(idProducto);
                return resp.First().respuesta;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ComprarProducto(int idProducto, int idCategoria,int cantidad, int precio)
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                int idUsuario = Convert.ToInt32(Session["idUsuario"]);
                var resp = producto.CrearBoleta(idUsuario, idProducto, idCategoria, cantidad, precio);
                return resp.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String ListarVentas()
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var lista = producto.ListarVentas();
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        public String ListarPedidos()
        {
            try
            {
                Cl_Producto producto = new Cl_Producto();
                var lista = producto.ListarPedidos();
                return JsonConvert.SerializeObject(lista).ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
