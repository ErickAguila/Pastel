var tablaProducto
$(document).ready(function () {
    CargarDatosTablaProducto();
    $.fn.dataTable.ext.errMode = 'throw'
    tablaProducto = $('#TbListarProducto').dataTable({
        'bJQueryUI': true,
        'bLengthChange': true,
        'scrollCollapse': true,
        'bPaginate': true,
        'bFilter': true,
        "paging": true,
        "ordering": true,
        "info": true,
        'iDisplayLength': 10, //Paginacion
        'oLanguage': {
            'sZeroRecords': "No hay recursos que mostrar.",
            'sInfo': "Registros _START_ al _END_ de _TOTAL_",
            'sInfoEmpty': "Registros 0 a 0 de 0",
            'sInfoFiltered': "(encontrados en _MAX_ registros totales)",
            'sProcessing': "Procesando...",
            'sInfoThousands': ".",
            "sSearch": "Buscar:",
            'oPaginate': {
                'sPrevious': "Anterior",
                'sNext': "Siguiente"
            }
        },

        "columns": [
            { "data": "nombreProducto", "sClass": "text-left" },
            { "data": "precio", "sClass": "text-left" },
            { "data": "nombreCategoria", "sClass": "text-left" },
            { "data": "descripcion", "sClass": "text-left" },
            {
                "data": "idProducto", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<center><button class='btn btn-warning btn-md' onclick='EditarProducto(" + oData.idProducto + ")' style='cursor:pointer;'><i class='fa fa-edit' style='color:#ffffff;'></i></button></center>");
                }
            }, {
                "data": "idProducto", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<center><button class='btn btn-danger btn-md' onclick='BajarProducto(" + oData.idProducto + ")' style='cursor:pointer;'><i class='fa fa-arrow-down'></i></button></center>");
                }
            }
        ]
    });
});


function CargarDatosTablaProducto() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ListarProducto",
        async: true,
        success: function (result) {
            LlenarDatosTablaProducto(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Por favor vuelva a intentarlo", "error");
        }
    });
}

function LlenarDatosTablaProducto(respuesta) {
    tablaProducto.fnClearTable();
    tablaProducto.fnAddData(respuesta);
}

function GuardarProducto() {
    var idProducto = $("#idProducto").val();
    var nombreProducto = $("#txtNombreProducto").val();
    var precioProducto = $("#txtPrecio").val();
    var idCategoria = $("#cboCategoria").val();
    var descripcionProducto = $("#txtDescProducto").val();

    $.ajax({
        type: "POST",
        url: "/Producto/GuardarProducto",
        data: {
            idProducto:idProducto,
            idCategoria:idCategoria,
            nombreProducto:nombreProducto,
            precioProducto:precioProducto,
            descripcion: descripcionProducto
        },
        success: function (resultado) {
            swal({
                title: 'Excelente!',
                text: 'Producto guardado con éxito!',
                icon: 'success'
            }).then(function () {
                CargarDatosTablaProducto();
                $("#closeModalProducto").click();
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al Guardar Producto", "error");
        }
    });
}

function EditarProducto(codigo) {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ObtenerDatoProducto",
        data: {idProducto:codigo},
        success: function (respuesta) {
            $.each(respuesta, function (i, item) {
                $("#idProducto").val(item.idProducto);
                $("#txtNombreProducto").val(item.nombre);
                $("#txtPrecio").val(item.precion);
                $("#cboCategoria").val(item.idCategoria);
                $("#txtDescProducto").val(item.descripcion);
            })
            $("#btnGuardarProducto").click();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar los datos del producto", "error");
        }
    })
}

function BajarProducto(codigo) {
    swal({
        title: "¿Está seguro?",
        text: "Se dará de baja el Producto!",
        icon: "warning",
        buttons: [
          'No, cancelar!',
          'Si, Estoy seguro!'
        ],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                url: "/Producto/BajarProducto",
                data: { idProducto: codigo },
                success: function (respuesta) {
                    if (respuesta == "ok") {
                        swal({
                            title: 'Excelente!',
                            text: 'Producto dado de baja!',
                            icon: 'success'
                        }).then(function () {
                            CargarDatosTablaProducto();
                        });
                    }
                    if (respuesta == "no existe producto") {
                        swal("Error detectado!", "Error, el producto no existe", "error");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    swal("Error detectado!", "Error al dar de baja al producto", "error");
                }
            })
        } else {
            swal("Cancelado", "Operación cancelada", "error");
        }
    })
}

function LimpiarCampoProducto(){
    $("#idProducto").val(0);
    $("#txtNombreProducto").val('');
    $("#txtPrecio").val('');
    $("#cboCategoria").val(0);
    $("#txtDescProducto").val('');
}