var tablaUsuarioNoVigente
$(document).ready(function () {
    CargarDatosTablaUsuarioNoVigente();
    $.fn.dataTable.ext.errMode = 'throw'
    tablaUsuarioNoVigente = $('#TbListarUsuarioNoVigente').dataTable({
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
            { "data": "apellido", "sClass": "text-left" },
            { "data": "email", "sClass": "text-left" },
            { "data": "nombrePerfil", "sClass": "text-left" },
            {
                "data": "idUsuario", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<center><button class='btn btn-primary btn-md' onclick='SubirUsuario(" + oData.idUsuario + ")' style='cursor:pointer;'><i class='fa fa-arrow-up' style='color:#ffffff;'></i></button></center>");
                }
            }
        ]
    });
});


function CargarDatosTablaUsuarioNoVigente() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Usuario/ListarUsuarioNoVigente",
        async: true,
        success: function (result) {
            LlenarDatosTablaUsuarioNoVigente(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar los usuario no vigente", "error");
        }
    });
}

function LlenarDatosTablaUsuarioNoVigente(respuesta) {
    tablaUsuarioNoVigente.fnClearTable();
    tablaUsuarioNoVigente.fnAddData(respuesta);
}

function SubirUsuario(codigo) {
    swal({
        title: "¿Está seguro?",
        text: "Se subirá el Usuario!",
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
                url: "/Usuario/SubirUsuario",
                data: { idUsuario: codigo },
                success: function (resultado) {
                    if (resultado == 'ok') {
                        swal({
                            title: 'Excelente!',
                            text: 'Usuario se subio con éxito!',
                            icon: 'success'
                        }).then(function () {
                            CargarDatosTablaUsuarioNoVigente
                        });
                    }

                    if (resultado == 'no existe') {
                        swal("Error detectado!", "Error al subir el usuario", "error");
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