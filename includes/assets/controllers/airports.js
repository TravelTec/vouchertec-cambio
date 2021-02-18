/* function buscar_dados_aeroportos
* não recebe parâmetros
* verifica o campo API_KEY presente no html
* faz uma requisição ao servidor trazendo a listagem dos aeroportos
* condicional:
*   se o token enviado for válido: retorna a listagem de aeroportos
*   se não: exibe a mensagem padrão de não autorizado
*/
async function buscar_dados_aeroportos() {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/aeroportos",
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

        //se o status da resposta for OK a resposta retorna: lista de aeroportos
        //se não, a resposta retorna: token inválido, cliente não autorizado
        if (resposta.response.status === 200) {
            //armazena no navegador - localStorage - a listagem de aeroportos
            localStorage.setItem("TRAVELTEC_AIRPORTS", JSON.stringify(resposta["response"]["message"]));
        } else {
            //printa na tela - TESTE - a resposta de não autorizado
            $("#mensagem_api").html(resposta.response.message);
        }
    });
}