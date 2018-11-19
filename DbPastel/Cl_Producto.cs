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

        public List<pa_GuardarCategoria_Result> GuardarCategoria(int idCategoria, string nombreCategoria)
        {
            try
            {
                var resp = modelo.pa_GuardarCategoria(idCategoria,nombreCategoria).ToList();
                return resp;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
