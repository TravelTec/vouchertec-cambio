async function getCompanies() {
    
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)


    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/companhias",
        method: "GET",
        headers: {
            authorization: "Bearer " + token.token,
            "content-type": "application/json",
            accept: "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        //converte a resposta da requisição para uma string válida do javascript
        //em seguida, chama a função parse que converte em um array possível de manipulação
        var resposta = JSON.parse(JSON.stringify({ response }));
        //se o status da resposta for OK a resposta retorna: lista de companhias
        //se não, a resposta retorna: token inválido, cliente não autorizado
        if (resposta.response.status === 200) {
            //armazena no navegador - localStorage - a listagem de companhias
            localStorage.setItem("TRAVELTEC_COMPANIES", JSON.stringify(resposta["response"]["message"]));
        } else {
            //printa na tela - TESTE - a resposta de não autorizado
            $("#mensagem_api").html(resposta.response.message);
        }
    });
}