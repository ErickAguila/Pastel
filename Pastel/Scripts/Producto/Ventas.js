var tablaVentas
$(document).ready(function () {
    CargarDatosTablaVentas();
    $.fn.dataTable.ext.errMode = 'throw'
    tablaVentas = $('#TbListarVentas').dataTable({
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
            { "data": "idBoleta", "sClass": "text-left" },
            { "data": "nombreUsuario", "sClass": "text-left" },
            { "data": "nombreProducto", "sClass": "text-left" },
            { "data": "fechaCompra", "sClass": "text-left" },
            { "data": "cantidad", "sClass": "text-left" },
            { "data": "precio", "sClass": "text-left" },
            { "data": "total", "sClass": "text-left" }
        ]
    });
});


function CargarDatosTablaVentas() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Producto/ListarVentas",
        async: true,
        success: function (result) {
            LlenarDatosTablaVenta(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Por favor vuelva a intentarlo", "error");
        }
    });
}

function LlenarDatosTablaVenta(respuesta) {
    tablaVentas.fnClearTable();
    tablaVentas.fnAddData(respuesta);
}