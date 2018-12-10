using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbPastel
{
    public class Cl_Producto
    {
        pasteleriaEntities modelo = new pasteleriaEntities();

        public List<pa_ListarProducto_Result> ListarProducto()
        {
            try
            {
                var resp = modelo.pa_ListarProducto().ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_GuardarProducto_Result> GuardarProducto(int idProducto, int idCategoria, string nombreProducto,string  precioProducto, string descripcion)
        {
            try
            {
                var resp = modelo.pa_GuardarProducto(idProducto, idCategoria, nombreProducto, precioProducto, descripcion).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_BajarProducto_Result> BajarProducto(int idProducto)
        {
            try
            {
                var resp = modelo.pa_BajarProducto(idProducto).ToList();
                return resp; 
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_GuardarCategoria_Result> GuardarCategoria(int idCategoria, string nombreCategoria,bool vigente)
        {
            try
            {
                var resp = modelo.pa_GuardarCategoria(idCategoria,nombreCategoria,vigente).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<pa_ListarProductoNoVigente_Result> ListarProductoNoVigente()
        {
            try
            {
                var resp = modelo.pa_ListarProductoNoVigente().ToList();
                return resp;
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_SubirProducto_Result> SubirProducto(int idProducto)
        {
            try
            {
                var resp = modelo.pa_SubirProducto(idProducto).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<pa_ObtenerDatoProducto_Result> ObtenerDatoProducto(int idProducto)
        {
            try
            {
                var resp = modelo.pa_ObtenerDatoProducto(idProducto).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_ListarCategoria_Result> ListarCategoria()
        {
            try
            {
                var resp = modelo.pa_ListarCategoria().ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_ObtenerDatoCategoria_Result> ObtenerDatoCategoria(int idCategoria)
        {
            try
            {
                var resp = modelo.pa_ObtenerDatoCategoria(idCategoria).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public String CrearBoleta(int idUsuario, int idProducto, int idCategoria,int cantidad, int precio)
        {
            try
            {
                var resp = modelo.pa_CrearBoleta(idUsuario, idProducto, idCategoria, cantidad, precio);
                return resp.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_ListarVentas_Result> ListarVentas()
        {
            try
            {
                var resp = modelo.pa_ListarVentas().ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_ListarPedidos_Result> ListarPedidos()
        {
            try
            {
                var resp = modelo.pa_ListarPedidos().ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<pa_ObtenerCantidadProductosVendidos_Result> ObtenesCantidadProductosVendidos()
        {
            try
            {
                var resp = modelo.pa_ObtenerCantidadProductosVendidos().ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
