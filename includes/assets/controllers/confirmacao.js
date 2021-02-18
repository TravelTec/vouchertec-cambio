async function startConfirmacao() {
    let tokenParse = await localStorage.getItem("TRAVELTEC");
    let locParse = await localStorage.getItem("TRAVELTEC_LOC");
    let orderParse = await localStorage.getItem("TRAVELTEC_ORDER");
    token = JSON.parse(tokenParse);
    loc = JSON.parse(locParse);

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/reserva/" + loc , // loc
        method: "GET",
        headers: {
            authorization: "Bearer " + token.token, //  token.token
            "content-type": "application/json",
            accept: "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        var dados = response.message;
        var order = response.order;

        var email_reserva = dados.email;
        $("#nome").html(dados.solicitante)
        $("#localizador").html(dados.localizador)
        $("#bagagem").html(dados.bagagem === '0N' ? 'Vôo sem bagagem despachada ' : 'Vôo com bagagem despachada')
        $("#conexao").html(dados.conexao_voo)
        $("#tipo_voo").html(dados.tipo_voo)
        $("#tarifa_por_adulto").html('R$ ' + order.tarifas.tarifa_por_adulto.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
        $("#qtd_adultos").html(order.qtd_adultos)
        $("#adultos_preco").html('R$ ' + order.tarifas.tarifa_adultos.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
        $("#qtd_criancas").html(order.qtd_criancas)
        $("#criancas_preco").html('R$ ' + order.tarifas.tarifa_criancas.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
        $("#qtd_bebes").html(order.qtd_bebes)
        $("#bebes_preco").html('R$ ' + order.tarifas.tarifa_bebes.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
        $("#valor_taxas").html('R$ ' + order.tarifas.taxas_encargos.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
        $("#valor_total").html('R$ ' + order.tarifas.valor_total.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
        var paxHTML = '';
        var paxDataHtml = ''

        dados.detalhes_notas.map(item => {
            var tipo;
            switch (item.tipo) {
                case 'ADT':
                    tipo = "Adulto"
                    break;

                case 'CHD':
                    tipo = "Criança"
                    break;

                case 'INF':
                    tipo = "Bebê"
                    break;

                default:
                    tipo = "Adulto"
                    break;
            }
            paxHTML += `<li class="collection-item">${item.passageiro}</li>`
            return paxDataHtml += `<div class="passageiro-item">
                <div class="textCapitalize">${item.passageiro}</div>
                <div><span class="bold">Data de Nascimento:</span> ${item.data_nasc}</div>
                <div><span class="bold">Tipo:</span> ${tipo}</div>
            </div>`
        })

        $(".collection").append(paxHTML)
        $("#passageiros").html(paxDataHtml)
        $("#parcels").html(dados.parcelas === 0 ? '1x' : dados.parcelas + 'x')
        $("#forma").html(dados.texto_parcelas)
        $("#alteracao").html(dados.regras)
        var tableHTML = ''

        dados.detalhes_itinerarios.map(item => {
            var dayNumber = moment(item.data_embarque, "YYYY-MM-DD HH:mm:ss").day();
            var date;
            switch (dayNumber) {
                case 1:
                    date = 'Segunda-feira'
                    break;

                case 2:
                    date = 'Terça-feira'
                    break;

                case 3:
                    date = 'Quarta-feira'
                    break;

                case 4:
                    date = 'Quinta-feira'
                    break;

                case 5:
                    date = 'Sexta-feira'
                    break;

                case 6:
                    date = 'Sabado'
                    break;


                case 0:
                    date = 'Domingo'
                    break;

                default:
                    break;
            }
            return tableHTML += `<tr>
                <td>${moment(item.data_embarque, "YYYY-MM-DD HH:mm:ss").format("DD MMM")}</td>
                <td>${date}</td>
                <td class="business"><img src="${item.logo_companhia}" alt="${item.nome_companhia}" /> <div>${item.nome_companhia}</div></td>
                <td>${item.numero_voo}</td>
                <td>${item.embarque}</td>
                <td>${item.desembarque}</td>
                <td>${moment(item.data_embarque, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</td>
                <td>${moment(item.data_desembarque, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</td>
                <td>${moment(item.data_desembarque, "YYYY-MM-DD HH:mm:ss").format("DD MMM")}</td>
                </tr>
                `
        })

        $("table tbody").html(tableHTML)

        $("#card").html(dados.numero_cartao.replace(/[0-9]/g, "*"))
        $("#ccv").html(dados.numero_seg.replace(/[0-9]/g, "*"))
        $("#validade").html(dados.validade)
        $("#titular").html(dados.titular)
        $("#nomeCard").html(dados.titular)
        $("#enderecoCard").html(dados.endereco)



        $(".skeletons").addClass("ocultarDisplay")
        $(".content").removeClass("ocultarDisplay")

        var settings = {
            async: true,
            crossDomain: true,
            url: "https://api.traveltec.com.br/serv/aereo/send/" + loc , // loc
            method: "GET",
            headers: {
                authorization: "Bearer " + token.token, //  token.token
                "content-type": "application/json",
                accept: "application/json",
            },
        };

        $.ajax(settings).done(function (response) {

            var access_token = token.token;
            $.ajax({
                url: "/enviar_voucher.php",
                type: "POST",
                data: {response:response, access_token:access_token, email_reserva:email_reserva},
                success: function (resposta) {
                    console.log(resposta);
                }
            }); 
        });

    });

}