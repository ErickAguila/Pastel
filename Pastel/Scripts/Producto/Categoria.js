var tablaCategoria
$(document).ready(function () {
    CargarDatosTablaCategoria();
    $.fn.dataTable.ext.errMode = 'throw'
    tablaCategoria = $('#TbListarCategoria').dataTable({
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
            { "data": "vigente", "sClass": "text-left" },
            {
                "data": "idCategoria", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<center><button class='btn btn-warning btn-md' onclick='EditarCategoria(" + oData.idCategoria + ")' style='cursor:pointer;' data-toggle='modal' data-target='#openModalCategoria'><i class='fa fa-edit' style='color:#ffffff;'></i></button></center>");
                }
            }
        ]
    });
});


function CargarDatosTablaCategoria() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ListarCategoria",
        async: true,
        success: function (result) {
            console.log(result)
            LlenarDatosTablaCategoria(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Por favor vuelva a intentarlo", "error");
        }
    });
}

function LlenarDatosTablaCategoria(respuesta) {
    tablaCategoria.fnClearTable();
    tablaCategoria.fnAddData(respuesta);
}

function GuardarCategoria() {
    swal("Ingrese el nombre de la nueva Categoria:", {
        content: "input"
    }).then(function (value) {
        if (value == "" || value == null) {
            swal("Error", "No se permiten valores nulos", "error");
        } else {
            $.ajax({
                type: "POST",
                url: "/Producto/GuardarCategoria",
                data: {
                    idCategoria:0,
                    nombreCategoria: value
                },
                success: function (respuesta) {
                    if (respuesta == "Categoria creada") {
                        swal({
                            title: 'Excelente!',
                            text: 'Categoria guardado con éxito!',
                            icon: 'success'
                        }).then(function () {
                            CargarDatosTablaCategoria();
                        });
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    swal("Error detectado!", "Error al cargar las categorias", "error");
                }
            });
        }
    });
}

function ActualizarCategoria() {
    var idCategoria = $("#txtIdCategoria").val();
    var nombreCategoria = $("#txtNombreCategoria").val();
    $.ajax({
        type: "POST",
        url: "/Producto/GuardarCategoria",
        data: {
            idCategoria: idCategoria,
            nombreCategoria: nombreCategoria
        },
        success: function (respuesta) {
            if (respuesta == "Categoria actualizada") {
                swal({
                    title: 'Excelente!',
                    text: 'Categoria guardado con éxito!',
                    icon: 'success'
                }).then(function () {
                    CargarDatosTablaCategoria();
                    $("#closeModalCategoria").click();
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar las categorias", "error");
        }
    });
}

function EditarCategoria(codigo) {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ObtenerDatosCategoria",
        data: { idCategoria: codigo },
        success: function (respuesta) {
            $.each(respuesta, function (i, item) {
                $("#txtIdCategoria").val(item.idCategoria);
                $("#txtNombreCategoria").val(item.nombre);
            })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Error al cargar las categorias", "error");
        }
    });
}