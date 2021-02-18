async function getDestaques() {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.traveltec.com.br/serv/aereo/destaques`,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": `Bearer ${token.token}`,
        },
        "processData": false,
    }
    $.ajax(settings).done(function (response) {
        itens = response.message;
        var retorno = '';
        $(itens).each(function (i, item) {
            var valor = item.valor;
            var data_trecho1, data_trecho2, data_trecho3, nome_tipo_trecho1, nome_tipo_trecho2, nome_tipo_trecho3, url, url_fornecedor, data1, data2, data3;

            url_fornecedor = 'buscar.php'

            if (item.tipo_voo === "Multi trechos") {
                if (item.data_trecho3 !== "") {
                    data1 = item.data_trecho1;
                    data2 = item.data_trecho2;
                    data3 = item.data_trecho3
                    url = url_fornecedor + "?tipo_voo=3&rota=" + item.origem_destino1 + "," + item.destino_destino1 + "," + data1.replace("/", "-").replace("/", "-") + "+" + item.origem_destino2 + "," + item.destino_destino2 + "," + data2.replace("/", "-").replace("/", "-") + "+" + item.origem_destino3 + "," + item.destino_destino3 + "," + data3.replace("/", "-").replace("/", "-") + "&cidades_origem=" + item.origem_destino1 + "+" + item.origem_destino2 + "+" + item.origem_destino3 + "&cidades_destino=" + item.destino_destino1 + "+" + item.destino_destino2 + "+" + item.destino_destino3 + "&adt=" + item.pax_adt + "&inf=" + item.pax_chd + "&bb=" + item.pax_inf + "&classe=" + item.classe + "&bagagem=0";
                } else {
                    data1 = item.data_trecho1;
                    data2 = item.data_trecho2;
                    url = url_fornecedor + "?tipo_voo=3&rota=" + item.origem_destino1 + "," + item.destino_destino1 + "," + data1.replace("/", "-").replace("/", "-") + "+" + item.origem_destino2 + "," + item.destino_destino2 + "," + data2.replace("/", "-").replace("/", "-") + "&cidades_origem=" + item.origem_destino1 + "+" + item.origem_destino2 + "&cidades_destino=" + item.destino_destino1 + "+" + item.destino_destino2 + "&adt=" + item.pax_adt + "&inf=" + item.pax_chd + "&bb=" + item.pax_inf + "&classe=" + item.classe + "&bagagem=0";
                }
            } else if (item.tipo_voo === "Ida e Volta") {
                data1 = item.data_trecho1;
                data2 = item.data_trecho2;
                url = url_fornecedor + "?tipo_voo=1&origem=" + item.origem_destino1 + "&destino=" + item.destino_destino1 + "&cidade_origem=São%20Paulo,%20Brasil%20,%20Todos%20aeroportos(SAO)&cidade_destino=" + item.destino + "&data_partida=" + data1.replace("/", "-").replace("/", "-") + "&data_retorno=" + data2.replace("/", "-").replace("/", "-") + "&adt=" + item.pax_adt + "&inf=" + item.pax_chd + "&bb=" + item.pax_inf + "&classe=" + item.classe + "&bagagem=0";
            } else {
                data1 = item.data_trecho1;
                url = url_fornecedor + "?tipo_voo=2&origem=" + item.origem_destino1 + "&destino=" + item.destino_destino1 + "&cidade_origem=São%20Paulo,%20Brasil%20,%20Todos%20aeroportos(SAO)&cidade_destino=" + item.destino + "&data_partida=" + data1.replace("/", "-").replace("/", "-") + "&adt=" + item.pax_adt + "&inf=" + item.pax_chd + "&bb=" + item.pax_inf + "&classe=" + item.classe + "&bagagem=0";
            }

            if (item.tipo_voo === "Multi trechos") {
                nome_tipo_trecho1 = "Trecho 1";
                nome_tipo_trecho2 = "Trecho 2";
                nome_tipo_trecho3 = "Trecho 3";
            } else {
                nome_tipo_trecho1 = "Ida";
                nome_tipo_trecho2 = "Volta";
                nome_tipo_trecho3 = "";
            }

            if (item.data_trecho2 !== "") {
                data_trecho2 = '' + nome_tipo_trecho2 + ": " + item.data_trecho2;
            }
            if (item.data_trecho3 !== "") {
                data_trecho3 = '<br/><i class="fa fa-check" style="color:#F5C138"></i> Trecho 3: ' + item.data_trecho3;
            }

            retorno += `<div class="draft-item">
            <div class="draft-title textUpper bgPurple">
                passagem
            </div>
            <h5 class="margin_1_top bold colorPurple">
                ${item.destino}
            </h5>
            <div class="draft-infos margin_1_top">
                <div class="draft-info flex alignCenter">
                    <i class="fa fa-check iconLeft"></i>
                    ${item.tipo_voo}
                </div>
                <div class="draft-info flex alignCenter">
                    <i class="fa fa-check iconLeft"></i>
                    ${nome_tipo_trecho1}: ${item.data_trecho1}
                </div>
                ${item.data_trecho2 !== "" ?
                `<div class="draft-info flex alignCenter">
                    <i class="fa fa-check iconLeft"></i>
                    ${data_trecho2}<br />
                </div>` : ''
                }
                ${item.data_trecho3 !== "" ?
                `<div class="draft-info flex alignCenter">
                    <i class="fa fa-check iconLeft"></i>
                    ${data_trecho3}<br />
                </div>` : ''
                }
            </div>
            <div class="margin_2_top">
                <div class="draft-view colorPurple">
                    a partir de
                </div>
                <div class="draft-price">
                    <span class="colorPurple">R$</span>&nbsp;&nbsp;<span class="money">${valor}</span>
                </div>
                <div class="margin_1_top">
                    <a href="${url}" class="draft-button white-text textUpper">
                        RESERVAR    
                    </a>
                </div>
            </div>
        </div>`
        })

        $("#draftContainer").removeClass('nogrid')
        $("#draftContainer").html(retorno)

    })
}