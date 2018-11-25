var tablaProductoNoVigente
$(document).ready(function () {
    CargarDatosTablaProductoNoVigente();
    $.fn.dataTable.ext.errMode = 'throw'
    tablaProductoNoVigente = $('#TbListarProductoNoVigente').dataTable({
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
            { "data": "nombre", "sClass": "text-left" },
            { "data": "precion", "sClass": "text-left" },
            { "data": "nombreCategoria", "sClass": "text-left" },
            { "data": "descripcion", "sClass": "text-left" },
            {
                "data": "idProducto", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<center><button class='btn btn-primary btn-md' onclick='SubirProducto(" + oData.idProducto + ")' style='cursor:pointer;'><i class='fa fa-arrow-up'></i></button></center>");
                }
            }
        ]
    });
});


function CargarDatosTablaProductoNoVigente() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ListarProductoNoVigente",
        async: true,
        success: function (result) {
            LlenarDatosTablaProductoNoVigente(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Por favor vuelva a intentarlo", "error");
        }
    });
}

function LlenarDatosTablaProductoNoVigente(respuesta) {
    tablaProductoNoVigente.fnClearTable();
    tablaProductoNoVigente.fnAddData(respuesta);
}

function SubirProducto(codigo) {
    swal({
        title: "¿Está seguro?",
        text: "Se subirá el Producto!",
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
                url: "/Producto/SubirProducto",
                data: { idProducto: codigo },
                success: function (resultado) {
                    if (resultado == 'ok') {
                        swal({
                            title: 'Excelente!',
                            text: 'El Producto se subio con éxito!',
                            icon: 'success'
                        }).then(function () {
                            CargarDatosTablaProductoNoVigente();
                        });
                    }

                    if (resultado == 'no existe') {
                        swal("Error detectado!", "Error al subir el Producto", "error");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    swal("Error detectado!", "Error al cargar los usuario no vigente", "error");
                }
            });
        } else {
            swal("Cancelado", "Operación cancelada", "error");
        }
    })
}