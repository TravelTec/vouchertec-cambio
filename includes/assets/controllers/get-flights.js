async function getFlights(id_recomendacao, voos) {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/detalhes_trecho/" + id_recomendacao + "/" + voos,
        method: "GET",
        headers: {
            authorization: "Bearer " + token.token,
            "content-type": "application/json",
            accept: "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        if (response.status === 200) {
            var htmlResponse = '';

            response.dados.map(item => {
                return htmlResponse += DetalhesVoo(item);
            })

            $("#firstDate").val(response.ultimo_embarque)

            $("#detalhes_voo").html(htmlResponse)
        } 
    });
}

const DetalhesVoo = (item) => {
    
    return (
        `<div class="detalhes-item">
            <div class="title flex alignCenter">
                <span class="tag iconLeft">${item.tipo}</span>
                ${item.data_extenso}
            </div>
            <div>
                ${item.companhia}: Vôo ${item.voo}
            </div>
            <div>
                Saída: ${item.saida}
            </div>
            <div>
                Chegada: ${item.chegada}
            </div>
            <div class="bold">
                ${item.conexao}
            </div>
        </div`
    )
}