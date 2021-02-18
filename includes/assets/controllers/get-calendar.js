async function getCalendar(tipo_voo, rota, adt, inf, bb, classe, bagagem) {
    let token = JSON.parse(await localStorage.getItem("TRAVELTEC"))
    var data = {
        tipo: tipo_voo,
        rota: rota,
        adt: adt,
        chd: inf,
        inf: bb,
        classe: classe,
        bagagem: bagagem,
        companhia: "ALL",
        horarios: [
            {
                embarque: "00:00",
                desembarque: "23:59"
            },
            {
                embarque: "00:00",
                desembarque: "23:59"
            },
            {
                embarque: "00:00",
                desembarque: "23:59"
            }
        ],
        conexoes: 3
    }


    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/dados_calendario/" + $("#id_busca").val(),
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token.token
        },
        // data: JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
        var data = response.dados[0];

        if (data.dados.length !== 0) {
            let htmlHead;
            if (tipo_voo !== 2) {
            htmlHead = '<tr><th>Datas</th>';
            }
            data.data_superior.map((item, i) => {
                return htmlHead += `<th class="center-align">${item.dia_semana}<br />${item.data_extenso}</th>`
            }).join('')
            htmlHead += '</tr>'

            let htmlBody = '';
            data.dados.map((item, i) => {
                htmlBody += '<tr>'
                if (tipo_voo !== 2) {
                    htmlBody += `<td>${data.data_lateral[i].dia_semana}<br />${data.data_lateral[i].data_extenso}</td>`;
                }
                item.map((itemInternal, i2) => {
                    if (itemInternal.valor === "") {
                        return htmlBody += `<td><a class="flex alignCenter justifyCenter center-align" href="buscar.php${itemInternal.url}"><i class="fas fa-search colorPurple"></i></a></td>`
                    } else {
                        return htmlBody += `<td><a class="flex alignCenter justifyCenter flexColumn center-align" href="buscar.php${itemInternal.url}"><img src="${itemInternal.logo}" alt="${itemInternal}" /><span class="${parseFloat(itemInternal.valor) < parseFloat(response.min) ? "tag" : ""}">R$ ${itemInternal.valor.replace(".", ",")
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</span></a></td>`
                    }
                })
                return htmlBody += '</tr>'
            })
            $('.cenarios .loading').addClass("ocultarDisplay")
            $('.cenarios thead').html(htmlHead);
            $('.cenarios tbody').html(htmlBody);
        } else {
            $('.cenarios .loading').html("Nenhum registro encontrado")
            $('.cenarios table').addClass('ocultarDisplay')
        }

    });
}