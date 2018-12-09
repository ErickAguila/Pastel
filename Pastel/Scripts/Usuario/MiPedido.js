var tablaMiPedido
$(document).ready(function () {
    CargarDatosTablaMiPedido();
    $.fn.dataTable.ext.errMode = 'throw'
    tablaMiPedido = $('#TbListarMiPedido').dataTable({
        'bJQueryUI': true,
        'bLengthChange': true,
        'scrollCollapse': true,
        'bPaginate': true,
        'bFilter': true,
        "paging": true,
        "ordering": true,
        "info": true,
        'iDisplayLength': 10,
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
            { "data": "nombreProducto", "sClass": "text-left" },
            { "data": "nombreCategoria", "sClass": "text-left" },
            { "data": "fechaCompra", "sClass": "text-left" },
            { "data": "cantidad", "sClass": "text-center" },
            { "data": "precio", "sClass": "text-left" },
            { "data": "total", "sClass": "text-left" },
            {
                "data": "idProductoEstado", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    switch (oData.idProductoEstado) {
                        case 1://Pendiente
                            $(nTd).html("<center><button class='btn btn-warning' style='color:#fff;'>Pendiente</button></center>");
                            break;
                        case 2://Enviado
                            $(nTd).html("<center><button class='btn btn-primary' style='color:#fff;'>Enviado</button></center>");
                            break;
                        case 3://Entregado
                            $(nTd).html("<center><button class='btn btn-success' style='color:#fff;'>Entregado</button></center>");
                            break;
                    }
                    
                }
            }
        ]
    });
});


function CargarDatosTablaMiPedido() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Usuario/ListarMisPedidos",
        async: true,
        success: function (result) {
            LlenarDatosTablaMiPedido(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Error detectado!", "Por favor vuelva a intentarlo", "error");
        }
    });
}

function LlenarDatosTablaMiPedido(respuesta) {
    tablaMiPedido.fnClearTable();
    tablaMiPedido.fnAddData(respuesta);
}