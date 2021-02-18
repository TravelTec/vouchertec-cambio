moment.locale('pt')

async function searchFlights(tipo_voo, rota, adt, inf, bb, classe, bagagem, query_data, dontSearch) {
    $("#conteudo_voos").html(`<pre id="json">
    <div class="skeleton-box skeleton-item"></div>
    <div class="skeleton-box skeleton-item"></div>
    <div class="skeleton-box skeleton-item"></div>
    <div class="skeleton-box skeleton-item"></div>
    <div class="skeleton-box skeleton-item"></div>
    <div class="skeleton-box skeleton-item"></div>
    </pre>`)

    tipo_voo = parseInt(tipo_voo)
    // RECUPERA TOKEN
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    let rotas = []
    rota.map(item => {
        if (item.aero_embarque) {
            rotas.push(item)
        }
    })
    var response;

    if (!dontSearch) {

        var data = {
            adt: parseInt(adt),
            chd: parseInt(inf),
            inf: parseInt(bb),
            classe: parseInt(classe),
            bagagem: parseInt(bagagem),
            companhia: "ALL",
            conexoes: rota.length > 3 ? rota.length / 3 : rota.length++,
            trechos: rotas
        } 

        response = await $.ajax({
            async: true,
            crossDomain: true,
            url: "https://api.traveltec.com.br/serv/aereo/busca",
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token.token
            },
            processData: false,
            data: JSON.stringify(data)
        }).done(function (response) {

            if (response.errors === true) {
                $("#conteudo_voos").html("<p style='color:#000'></p>");
                $("#pill-precos").html("Preços por companhia aérea");
                $("#pill-dias").html("Preços +/- 3 dias");
                $("#titulo_pesquisa").html("0 vôos encontrados - Não há voos para as datas e/ou a rota solicitada.");
                // APARECER FILTROS
                $("#filters").removeClass("ocultarDisplay")
                $("#filters-skeleton").addClass("ocultarDisplay")
                $("#json").addClass("ocultarDisplay")
                $("#tabs-skeleton").addClass("ocultarDisplay")
                $("#tabs").removeClass("ocultarDisplay")
                return progress(100)

            } else {
                // BUSCAR POR COMPANHIAS
                searchGetCompanies(token.token, response["id_busca"], tipo_voo)
                $("#id_busca").val(response["id_busca"])
                // TABELA DE PREÇOS POR COMPANHIA
                searchCreateCarousel(token.token, response["id_busca"], tipo_voo)
                if (!response.isNacional && (tipo_voo === 1 || tipo_voo === 2)) {
                    // INSERIR TABELA DOS 3 DIAS
                    getCalendar(tipo_voo, $("#rota").val(), adt, inf, bb, classe, 0);
                } else {
                    $(".tabs .tab").css({ width: "100%" })
                    $(".item-calendario").addClass("ocultarDisplay")
                }
                $('.tabs').tabs();
            }

        })

    } else {
        response = { id_busca: $("#id_busca").val() }
    }


    // RECUPERAR FILTROS
    var pageActual = $("#page").val()
    var company = $("#company").val()
    var bagagem = $("#bagagem").val()
    var paradas = $("#paradas").val()
    var preco = $("#preco").val()
    var horario1 = $("#slider-partida-ida").val() + '|' + $("#slider-retorno-ida").val()
    var horario2 = $("#slider-partida-volta").val() + '|' + $("#slider-retorno-volta").val()
    var horario3 = $("#slider-partida-destino3").val() + '|' + $("#slider-retorno-destino3").val()

    var horario = `&horario1=${horario1}`;
    if (tipo_voo === 1) {
        horario += `&horario2=${horario2}`
    } else if (tipo_voo === 3) {
        horario += `&horario2=${horario2}&horario3=${horario3}`
    }

    if (preco !== "") {
        $(".filtersPrice").removeClass("ocultarDisplay")
        $(".priceFilter .content").html("&nbsp;R$ " + parseFloat(preco).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + "&nbsp;")
    } else {
        $(".filtersPrice").addClass("ocultarDisplay")

    }

    progress(80)
    // REQUISIÇÃO DE LISTAGEM DE PASSAGENS

    if (response.status !== 400) {


        $.ajax({
            async: true,
            crossDomain: true,
            url: `https://api.traveltec.com.br/serv/aereo/listar/${response.id_busca}?page=${pageActual}&company=${company}&bagagem=${bagagem}&paradas=${paradas}${horario}&preco=${preco}`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + token.token
            },
            processData: false,
        }).done(function (res) {
            // APARECER FILTROS
            $("#filters").removeClass("ocultarDisplay")
            $("#filters-skeleton").addClass("ocultarDisplay")
            $("#json").addClass("ocultarDisplay")
            $("#tabs-skeleton").addClass("ocultarDisplay")
            $("#tabs").removeClass("ocultarDisplay")

            if (res.errors === true) {
                $("#conteudo_voos").html('')

                // PLOTAR OS RESULTADOS NA TELA
                $("#titulo_pesquisa").html(res.message);
                $(".pagination").html('')
            } else {
                var data = res.items.dados;
                var content = '';

                if (tipo_voo === 3 && res.items.dados[0].voos) {
                    query_data.tipo_voo = 1
                }

                localStorage.setItem("TRAVELTEC_DATA", JSON.stringify(data))

                res.items.dados.map((item, i) => {
                    // CRIA HTML DOS COMPONENTES
                    content += itemRender(i, item, query_data.data_partida, query_data.data_retorno ? query_data.data_retorno : '', parseInt(query_data.tipo_voo), adt, bb, inf, response.id_busca)
                }).join('')

                // INJETA NO HTML
                $("#conteudo_voos").html(content)

                // PLOTAR OS RESULTADOS NA TELA
                $("#titulo_pesquisa").html(res.items.totalFlights + " vôos encontrados " + returnClass(classe));
                $("#contador_voos_total").val(res.items.totalFlights);

                createPagination(res.items.pagination.totalPages)
                setTimeout(function () {
                    $(".passagem-choices").each(function () {
                        $(this).find('.passagem-choice-item:first-child input').click();
                    })
                }, 1000);
            }

            progress(100)
        })
    }
}


function selecionarVoo(id, id_voo_regra) {
    $('#' + id).val(id_voo_regra)
}

let destinos = [];

const itemRender = (index, passagem, dataPartida, dataRetorno, tipo_voo, adt, bb, inf, id_busca) => {
    destinos = [];
    const returnConnections = (connect) => {
        switch (connect) {
            case 1:
                return "Direto"

            case 2:
                return "1 conexão"

            case 3:
                return "2 conexões"

            default:
                return ""
        }
    }
    if (tipo_voo === 3) {
        Object.values(passagem.destinos).forEach((obj, chave) => destinos.push(obj));
    }
    return (
        `<div class="passagem-item">
            <form action="reservar.php">
                <input type="hidden" name="id_busca" value="${id_busca}" />
                <input type="hidden" name="id_recomendacao" id="id_recomendacao${index}" value="${passagem.recomendacao.id_recomendacao}" />
                ${passagem.trechos.map((trecho, i) => {
            var value;
            if (tipo_voo === 3) {
                value = destinos[i].id_voo_regra;
            }
            if (tipo_voo === 2) {
                value = passagem.voos.voos_ida[0].id_voo_regra
            }
            if (tipo_voo === 1 && i === 0) {
                value = passagem.voos.voos_ida[0].id_voo_regra
            } else if (tipo_voo === 1 && i === 1) {
                value = passagem.voos.voos_volta[0].id_voo_regra
            }
            return (
                `<input type="hidden" name="id_voo_regra${i + 1}" id="id_voo_regra${index}${i + 1}" value="${value}" />`
            )
        }).join('')}
                    <div class="row">
                        <div class="col s12 m12 l9 nopadding passagem-item-esquerdo">
                        ${tipo_voo !== 3 ? (`
                            <div class="row internal item-title">
                                <div class="title-one col s12 m12 l3">
                                    <div class="bold">
                                        <i class="fas fa-plane iconLeft"></i> IDA
                                    </div>
                                    <div>
                                        ${moment(dataPartida, "DD-MM-YYYY").format("ll")}
                                    </div>
                                </div>
                                <div class="title-two col s6 l4">
                                    <div class="bold">
                                        ${passagem.recomendacao.air_embarque}
                                    </div>
                                    <div>
                                        ${passagem.recomendacao.city_embarque}
                                    </div>
                                </div>
                                <div class="title-three col s6 l5">
                                    <div class="bold">
                                        ${passagem.recomendacao.air_desembarque}
                                    </div>
                                    <div>
                                        ${passagem.recomendacao.city_desembarque}
                                    </div>
                                </div>
                            </div>
                            <div class="passagem-choices">
                                ${passagem.voos.voos_ida.map((item, i) => {

            if (item !== undefined) return (
                `<div class="passagem-choice-item">
                                        <div class="radio">
                                        <input  name="ida${index}" type="radio" id="ida${index}${i}${item.id_voo_regra}${item.companhia}" onclick="selecionarVoo('id_voo_regra${index}1', '${item.id_voo_regra}')" />
                                            <label  for="ida${index}${i}${item.id_voo_regra}${item.companhia}" class="white-text"></label>
                                        </div>
                                        <div class="business">
                                            <div class="flex alignCenter justifyCenter flexColumn">
                                                <img src="${item.logo_companhia}">
                                                ${item.nome_companhia}
                                            </div>
                                        </div>
                                        <div class="time time-one">
                                            ${moment(item.embarque, "DD/MM/YYYY HH:mm").format("HH:mm")}
                                        </div>
                                        <div class="stops">
                                            ${returnConnections(item.qtd_conexoes)}
                                        </div>
                                        <div class="time time-two">
                                            ${moment(item.desembarque, "DD/MM/YYYY HH:mm").format("HH:mm")}
                                        </div>\
                                        <div class="duration">
                                            <div class="flex alignCenter justifyCenter flexColumn">
                                                <div class="small">Duração do vôo</div>
                                                <div class="bold">${item.duracao_voo}</div>
                                            </div>
                                        </div>
                                        <div class="info">
                                            <i class="fas fa-info-circle colorPurple" onclick="exibirDetalhesVoo('trecho1', ${passagem.recomendacao.id_recomendacao},${item.id_voo_regra}, 'Ida')"></i>
                                        </div>
                                    </div>`
            )
        }).join('')}
                                
                            </div>
                            ${tipo_voo === 1 ? (
                `<div class="row internal item-title item-volta">
                                    <div class="title-one title-volta col s12 m12 l3">
                                        <div class="bold">
                                            <i class="fas fa-plane iconLeft"></i> VOLTA
                                        </div>
                                        <div>
                                            ${moment(dataRetorno, "DD-MM-YYYY").format("ll")}
                                        </div>
                                    </div>
                                    <div class="title-two col s6 l4">
                                        <div class="bold">
                                            ${passagem.recomendacao.air_desembarque}
                                        </div>
                                        <div>
                                            ${passagem.recomendacao.city_desembarque}
                                        </div>
                                    </div>
                                    <div class="title-three col s6 l5">
                                        <div class="bold">
                                            ${passagem.recomendacao.air_embarque}
                                        </div>
                                        <div>
                                            ${passagem.recomendacao.city_embarque}
                                        </div>
                                    </div>
                                </div>
                                <div class="passagem-choices">
                                    ${passagem.voos.voos_volta.map((item, i) => {
                    return (
                        `<div class="passagem-choice-item">
                                            <div class="radio">
                                                <input name="volta${index}" type="radio" id="volta${index}${i}${item.id_voo_regra}${item.companhia}" value="${i}" checked="${i === 0 && true}" onclick="selecionarVoo('id_voo_regra${index}2', '${item.id_voo_regra}')"  />
                                                <label for="volta${index}${i}${item.id_voo_regra}${item.companhia}" class="white-text"></label>
                                            </div>
                                            <div class="business">
                                                <div class="flex alignCenter justifyCenter flexColumn">
                                                    <img src="${item.logo_companhia}">
                                                    ${item.nome_companhia}
                                                </div>
                                            </div>
                                            <div class="time time-one">
                                                ${moment(item.embarque, "DD/MM/YYYY HH:mm").format("HH:mm")}
                                            </div>
                                            <div class="stops">
                                            ${returnConnections(item.qtd_conexoes)}
                                            </div>
                                            <div class="time time-two">
                                                ${moment(item.desembarque, "DD/MM/YYYY HH:mm").format("HH:mm")}
                                            </div>
                                            <div class="duration">
                                                <div class="flex alignCenter justifyCenter flexColumn">
                                                    <div class="small">Duração do vôo</div>
                                                    <div class="bold">${item.duracao_voo}</div>
                                                </div>
                                            </div>
                                            <div class="info">
                                                <i class="fas fa-info-circle colorPurple cursor" onclick="exibirDetalhesVoo('trecho2', ${passagem.recomendacao.id_recomendacao},${item.id_voo_regra}, 'Retorno')"></i>
                                            </div>
                                        </div>`
                    )
                }).join('')}
                                </div>`
            ) : ''
            }
        `) : destinos.map((obj, chave) => {
                return (`
            <div class="row internal item-title ${chave !== 0 ? 'item-volta' : ''}">
                                <div class="title-one col s12 m12 l3">
                                    <div class="bold">
                                        <i class="fas fa-plane iconLeft"></i> TRECHO ${chave + 1}
                                    </div>
                                    <div>
                                        ${moment(obj.embarque, "DD-MM-YYYY HH:mm").format("ll")}
                                    </div>
                                </div>
                                <div class="title-two col s6 l4">
                                    <div class="bold">
                                        ${passagem.trechos[chave].origem}
                                    </div>
                                    <div>
                                        ${passagem.trechos[chave].cidade_origem}
                                    </div>
                                </div>
                                <div class="title-three col s6 l5">
                                    <div class="bold">
                                        ${passagem.trechos[chave].destino}
                                    </div>
                                    <div>
                                        ${passagem.trechos[chave].cidade_destino}
                                    </div>
                                </div>
                            </div>
                            <div class="passagem-choices">
                                <div class="passagem-choice-item">
                                        <div class="radio">
                                        </div>
                                        <div class="business">
                                            <div class="flex alignCenter justifyCenter flexColumn">
                                                <img src="${obj.logo_companhia}">
                                                ${obj.nome_companhia}
                                            </div>
                                        </div>
                                        <div class="time time-one">
                                            ${moment(obj.embarque, "DD/MM/YYYY HH:mm").format("HH:mm")}
                                        </div>
                                        <div class="stops">
                                            ${returnConnections(obj.qtd_conexoes)}
                                        </div>
                                        <div class="time time-two">
                                            ${moment(obj.desembarque, "DD/MM/YYYY HH:mm").format("HH:mm")}
                                        </div>
                                        <div class="duration">
                                            <div class="flex alignCenter justifyCenter flexColumn">
                                                <div class="small">Duração do vôo</div>
                                                <div class="bold">${obj.duracao_voo}</div>
                                            </div>
                                        </div>
                                        <div class="info">
                                            <i class="fas fa-info-circle colorPurple" onclick="exibirDetalhesVoo('trecho${chave + 1}', ${passagem.recomendacao.id_recomendacao},${obj.id_voo_regra}, 'trecho${chave + 1}')"></i>
                                        </div>
                                    </div>
                            </div>
                            `)
            }).join('')

        }
                            
                        </div>
                        <div class="col s12 m12 l3 passagem-panel">
                            <h5 class="price colorPurple bold">
                                R$ ${passagem.recomendacao.tarifa_por_adulto
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                            </h5>
                            <div class="subprice">(Preço por adulto)</div>
                            <div class="margin_2_top">
                                <div class="passagem-item-price flex alignCenter justifyBetween">
                                    <div>
                                        ${parseInt(adt) + parseInt(bb) + parseInt(inf)} pessoa${(parseInt(adt) + parseInt(bb) + parseInt(inf)) > 1 ? "s" : ""}
                                    </div>
                                    <div>
                                        R$ ${passagem.recomendacao.total_tarifas
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                    </div>
                                </div>
                                <div class="passagem-item-price flex alignCenter justifyBetween">
                                    <div>
                                        Taxas e encargos
                                    </div>
                                    <div>
                                        R$ ${passagem.recomendacao.taxas_encargos
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                    </div>
                                </div>
                                <hr />
                                <div class="passagem-item-price-total flex alignCenter justifyBetween">
                                    <div class="semiBold">
                                        Total
                                    </div>
                                    <div class="bold">
                                    R$ ${passagem.recomendacao.valor_total
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                    </div>
                                </div>
                            </div>
                            ${(passagem.recomendacao.qtd_bagagem === "0N" || passagem.recomendacao.qtd_bagagem === "0") ? (
            `<div class="margin_2_top flex alignCenter justifyCenter flexColumn colorPurple bagagem bold">
                                    <img src="assets/images/nobag.png" alt="">
                                    Inclui apenas uma mala de mão
                                </div>`
        )
            : (`<div class="margin_2_top flex alignCenter justifyCenter flexColumn colorPurple bagagem bold">
                             <img src="assets/images/sibag.png" alt="">
                             Inclui despacho de bagagem
                         </div>`)}
                            
                            <div class="margin_1_top">
                                <button type="submit" class="textUpper white-text bgPurple bold" onclick="selecionarVooReserva()">
                                    reservar
                                </button>
                            </div>
                            <div class="margin_1_top colorPurple bold">
                                ATÉ ${passagem.recomendacao.parcelamento}x SEM JUROS
                            </div>
                        </div>
                    </div>
                    </form>
                </div>`
    )
}

function returnClass(classe) {
    switch (parseInt(classe)) {
        case 0:
            return "na classe econômica"

        case 1:
            return "na classe econômica premium"

        case 2:
            return "na classe executiva"

        case 3:
            return "na primeira classe"

        default:
            return ""
    }

}