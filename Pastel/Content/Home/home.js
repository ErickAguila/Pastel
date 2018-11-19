$(document).ready(function () {
    var $wrap = $('#main');
    var $signUpBtn = $wrap.find('#signUpBtn');
    var $loginBtn = $wrap.find("#loginBtn");

    $signUpBtn.on('click', function () {
        $wrap.addClass('singUpActive');
        $wrap.removeClass('loginActive');
    });

    $loginBtn.on('click', function () {
        $wrap.addClass('loginActive');
        $wrap.removeClass('singUpActive');
    });
});

function Login() {
    var usuario = $("#user").val();
    var password = $("#pass").val();
    $.ajax({
        //dataType: "json",
        type: "POST",
        url: "/Home/Login",
        data: {
            user: usuario,
            pass:password
        },
        success: function (respuesta) {
            if (respuesta == "ok") {
                window.location.href = "/Home/Home"
            } else {
                swal("Oops!", "Usuario o contraseña incorrectas", "error");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
         swal("Error detectado!", "Error en el metodo de login", "error");
        }
    })
}

function Logout() {
    $.ajax({
        type: "POST",
        url: "/Home/FinSession",
        success: function (respuesta) {
            window.location.href = "/Home/Home";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cerrar sesión", "error");
        }
    })
}
