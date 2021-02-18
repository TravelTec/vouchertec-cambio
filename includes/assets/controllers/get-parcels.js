async function getParcels(id_recomendacao, voos) {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/parcelas/" + id_recomendacao + "/" + voos,
        method: "GET",
        headers: {
            authorization: "Bearer " + token.token,
            "content-type": "application/json",
            accept: "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        if (response.status === 200) {
            alterarParcela()
            localStorage.setItem("TRAVELTEC_VALORES", JSON.stringify(response.dados.valores));
        }
    })
}

async function alterarParcela(first, parcels, index) {
    let values = await localStorage.getItem("TRAVELTEC_VALORES")
    let valuesParsed = JSON.parse(values)
    let flagCard = $("#bandeira_cartao").val();
    let parcelSelected = $("#parcelamento").val();
    let valuesDetected;
    Object.entries(valuesParsed).find(part => {
        if (part[0] === flagCard) {
            valuesDetected = part[1]
        }
    });
    if (first) {
        var htmlSelect = '';
        valuesDetected.map((parcela, i) => {
            return htmlSelect += `<div class="parcels-item">
            <input name="parcelamento" type="radio" onclick="alterarParcela(null, ${parcela.parcela}, ${i})" id="parcela${i}" value="${i + 1}" ${i === 0 ? 'checked' : ''} />
            <label for="parcela${i}">
                <span>${parcela.parcela}x -  ${parcela.descricao}</span>
            </label>
        </div>`
        })

        $("#parcelamento").html(htmlSelect)

    } else if (parcels) {
        $("#installment").val(valuesDetected[index].parcela)
        $("#firstInstallment").val(valuesDetected[index].firstInstallment)
        $("#installments").val(valuesDetected[index].installments)
    }

}