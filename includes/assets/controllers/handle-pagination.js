function createPagination(totalPages) {
    var actual = parseInt($("#page").val());
    var paginationHTML = '';
    
    // CRIA PAGINADOR ANTERIOR
    paginationHTML += `<li class="waves-effect ${actual === 1 ? 'disabled' : ''}"><a href="#!"><i class="material-icons">chevron_left</i></a></li>`
    // CRIA ITEMS DE PAGINAÇÃO
    for (let index = 1; index <= totalPages; index++) {
        paginationHTML += `<li onclick="setPagination(${index})" class="waves-effect ${index === actual ? 'active' : ''}"><a href="#!">${index}</a></li>`
    }
    // CRIA PAGINAÇÃO POSTERIOR
    paginationHTML += `<li class="waves-effect ${actual === totalPages ? 'disabled' : ''}"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`;
    // INJETA NO HTML
    $("ul.pagination").html(paginationHTML)


}

function setPagination(pageRequired) {
    // RECUPERA VALOR DA PAGINA ATUAL
    var pageActual = $("#page").val()
    // VERIFICA SE ATUAL !== PAGINA SOLICITADA
    if (pageActual !== pageRequired) {
        refreshFilter();
        $("#page").val(pageRequired);
        window.scrollTo(0,0)
    }
}



    
    