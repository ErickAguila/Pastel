$(document).ready(function () {
    CargarDatos();
});

function CargarDatos() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Usuario/ObtenerDatosUsuario",
        data: { idUsuario: 0 },
        success: function (respuesta) {
            $.each(respuesta, function (i, item) {
                $("#txtIdUsuario").val(item.idUsuario);
                $("#txtNombre").val(item.nombre);
                $("#txtApellido").val(item.apellido);
                $("#txtEmail").val(item.email);
                if (item.idPerfil == 2) {
                    $("#txtTipoUsuario").val("Cliente");
                }
            })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar los datos del usuario", "error");
        }
    });
}

function GuardarDatos() {
    var idUsuario = $("#txtIdUsuario").val();
    var nombre = $("#txtNombre").val();
    var apellido = $("#txtApellido").val();
    var email = $("#txtEmail").val();

    $.ajax({
        type: "POST",
        url: "/Usuario/RegistrarUsuario",
        data: {
            idUsuario: idUsuario,
            nombre: nombre,
            apellido: apellido,
            email: email,
            pass: '',
            idPerfil: 2
        },
        success: function (respuesta) {
            swal({
                title: 'Excelente!',
                text: 'Datos guardado con éxito!',
                icon: 'success'
            }).then(function () {
                window.location.reload();
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al guardar el usuario", "error");
        }
    })
}