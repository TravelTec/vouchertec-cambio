function searchGetCompanies(token, id_busca, tipo_voo) {
    var dados_companhia
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.traveltec.com.br/serv/aereo/companhia/" + id_busca,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        },
        "processData": false
    }

    $.ajax(settings).done(function (response) {
        dados_companhia = response.dados;
        var companhias = "";
        $(dados_companhia).each(function (i, item) {
            companhias +=
                `<div class="input-item flex alignCenter">
                    <input name="companhia" type="radio" id="${item.iata}" value="${item.iata}" />
                    <label for="${item.iata}" class="flex alignCenter" onclick="handleFilter('company', $('#${item.iata}').val())">
                        <img src="${item.logo}" width="20px" class="logo-radio" />
                        <span style="margin-left: 5px">${item.nome}</span>
                    </label>
                </div>`
        });
        $("#companhias_filtros").append(companhias);
    })
}