$(document).ready(function () {
    ListarHomeProducto();
    $("#txtCantidad").change(function () {
        var precio = $("#txtPrecioProducto").text();
        $("#txtTotal").html(precio * $("#txtCantidad").val());
    })
})

function ListarHomeProducto() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ListarProducto",
        success: function (respuesta) {
            $.each(respuesta, function (i, item) {
                $("#list-producto").append('<div id="product_' + item.idProducto + '" class="caviar-portfolio clearfix"><div class="single_menu_item breakfast wow fadeInUp"><div class="d-sm-flex align-items-center"><div class="dish-thumb"><img src="/Content/Template/img/donas.png" alt=""></div><div class="dish-description"><h3>' + item.nombreProducto + '</h3><p>' + item.descripcion + '</p></div><div class="dish-value"><h3>$' + item.precio + '</h3><button class="btn btn-success"  data-toggle="modal" data-target="#ModalBuyProduct" onclick="OpenModalCompra(' + item.idProducto + ')">Comprar <i class="fa fa-shopping-cart"></i></button></div></div></div></div>');
            })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar los producto", "error");
        }
    })
}

function OpenModalCompra(idProducto) {
    $("#txtIdProducto").val(idProducto);
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ObtenerDatoProducto",
        data: { idProducto: idProducto },
        success: function (respuesta) {
            $.each(respuesta, function (i, item) {
                $("#txtNombreProcuto").html(item.nombre);
                $("#txtDescProducto").html(item.descripcion);
                $("#txtPrecioProducto").html(item.precion)
            })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar los datos del producto", "error");
        }
    })
}

function ComprarProducto() {
    var idProducto = $("#txtIdProducto").val();
    var cantidad = $("#txtCantidad").val();
    var precio = $("#txtPrecioProducto").text();
    $.ajax({
        type: "POST",
        url: "/Producto/ComprarProducto",
        data: {
            idProducto: idProducto,
            idCategoria: 1,
            cantidad: cantidad,
            precio:precio
        },
        success: function (respuesta) {
            swal({
                title: 'Excelente!',
                text: 'Compra realizada con éxito!',
                icon: 'success'
            }).then(function () {
                window.location.reload();
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar los datos del producto", "error");
        }
    })
}
