var tablaUsuario
$(document).ready(function () {
    CargarDatosTablaUsuario();
    tablaUsuario = $('#TbListarUsuario').dataTable({
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
                    $(nTd).html("<center><button class='btn btn-danger btn-md' onclick='BajarUsuario(" + oData.idUsuario + ")' style='cursor:pointer;'><i class='fa fa-trash'></i></button></center>");
                }
            }, {
                "data": "idUsuario", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<center><button class='btn btn-warning btn-md' onclick='EditarUsuario(" + oData.idUsuario + ")' style='cursor:pointer;'><i class='fa fa-edit' style='color:#ffffff;'></i></button></center>");
                }
            }
        ]
    });
});


function CargarDatosTablaUsuario() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Usuario/ListarUsuario",
        async: true,
        success: function (result) {
            LlenarDatosTablaUsuario(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Por favor vuelva a intentarlo", "error");
        }
    });
}

function LlenarDatosTablaUsuario(respuesta) {
    tablaUsuario.fnClearTable();
    tablaUsuario.fnAddData(respuesta);
}

function GuardarUsuario() {
    var idUsuario = $("#idUsuario").val()
    var nombre = $("#txtNombre").val();
    var apellido = $("#txtApellido").val();
    var email = $("#txtEmail").val();
    var pass = $("#txtPass").val();
    var idPerfil = $("#cboPerfil").val();

    $.ajax({
        type: "POST",
        url: "/Usuario/RegistrarUsuario",
        data: {
            idUsuario: idUsuario,
            nombre: nombre,
            apellido: apellido,
            email: email,
            pass: pass,
            idPerfil: idPerfil
        },
        success: function (respuesta) {
            swal({
                title: 'Excelente!',
                text: 'Usuario guardado con éxito!',
                icon: 'success'
            }).then(function () {
                CargarDatosTablaUsuario();
                $("#closeModalUsuario").click();
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al guardar el usuario", "error");
        }
    })
}

function EditarUsuario(codigo) {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Usuario/ObtenerDatosUsuario",
        data: {idUsuario:codigo},
        success: function (respuesta) {
            $.each(respuesta, function (i, item) {
                $("#idUsuario").val(item.idUsuario);
                $("#txtNombre").val(item.nombre);
                $("#txtApellido").val(item.apellido);
                $("#txtEmail").val(item.email);
                $("#txtPass").val(item.pass);
                $("#cboPerfil").val(item.idPerfil);
            })
            $("#btnModalUsuario").click();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar los datos del usuario", "error");
        }
    })
}

function BajarUsuario(codigo) {
    swal({
        title: "¿Está seguro?",
        text: "Se dará de baja el usuario!",
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
                url: "/Usuario/BajarUsuario",
                data: {idUsuario:codigo},
                success: function (respuesta) {
                    if (respuesta == "ok") {
                        swal({
                            title: 'Excelente!',
                            text: 'Usuario dado de baja!',
                            icon: 'success'
                        }).then(function () {
                            CargarDatosTablaUsuario();
                        });
                    }
                    if (respuesta == "usuario no existe") {
                        swal("Error detectado!", "Error, el usuario no existe", "error");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    swal("Error detectado!", "Error al dar de baja al usuario", "error");
                }
            })
        } else {
            swal("Cancelado", "Operación cancelada", "error");
        }
    })
}

function LimpiarCamposUsuarios() {
    $("#idUsuario").val(0);
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEmail").val("");
    $("#txtPass").val("");
    $("#cboPerfil").val(0);
}