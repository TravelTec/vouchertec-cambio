async function getRules(id_recomendacao, voos) {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/regras/" + id_recomendacao + "/" + voos,
        method: "GET",
        headers: {
            authorization: "Bearer " + token.token,
            "content-type": "application/json",
            accept: "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        if (response.status === 200) {
            $("#pre_reserva").val(response.pre_reserva)
            $("#regras-content").html(response.message.regras)
        }
    })
}