async function exibirDetalhesVoo(tipo_trecho, id_recomendacao, id_voo, trecho) {
    $.blockUI({ message: '<h2><img src="./assets/images/loading2.svg" style="height:75px;" class="floating"></h2>' });

    let token = JSON.parse(await localStorage.getItem("TRAVELTEC"))
    var id_busca = $("#id_busca").val();
    $.ajax({
        async: true,
        crossDomain: true,
        url: `https://api.traveltec.com.br/serv/aereo/informacoes/${id_busca}/${tipo_trecho}/${id_recomendacao}/${id_voo}`, ///${id_busca}/${tipo_trecho}/${id_recomendacao}/${id_voo}
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + token.token,
        },
        processData: false,
        complete: function () {

            $.unblockUI();
        }
    }).done(function (response) {

        let content = '';
        content += itemDetalhes(response.message, trecho)
        response.message.detalhes_voo.map((item, i) => {
            content += itemDetalhesItem(item, i, response.message.detalhes_voo)
        })

        $("#detalheVoo .modal-content").html(content)



        $('#detalheVoo').modal();
        $('#detalheVoo').modal('open');
    }).fin
}

const itemDetalhes = (item, trecho) => {
    var cityEmbarqueSlitted = item.detalhes_voo[0].city_embarque.split(",")
    var cityDesembarqueSlippet = item.detalhes_voo[item.detalhes_voo.length - 1].city_desembarque.split(",")
    var dateNumber = moment(item.detalhes_voo[0].data_embarque, "DD/MM/YYYY").format("e");
    var dayOfWeek;
    switch (dateNumber) {
        case '0':
            dayOfWeek = "Domingo"
            break;
        case '1':
            dayOfWeek = "Segunda-feira"
            break;
        case '2':
            dayOfWeek = "Terça-feira"
            break;
        case '3':
            dayOfWeek = "Quarta-feira"
            break;
        case '4':
            dayOfWeek = "Quinta-feira"
            break;
        case '5':
            dayOfWeek = "Sexta-feira"
            break;
        case '6':
            dayOfWeek = "Sabado"
            break;

        default:
            break;
    }
    return (`
    <div class="item hide-on-med-and-down">
    <div class="item-icon white-text flex alignCenter justifyCenter">
        <i class="fas fa-plane"></i>
    </div>
    <div class="flex item-content-title">
        <div class="item-title">
            ${trecho}
        </div>
        <div class="item-title bold">
           ${dayOfWeek}, ${moment(item.detalhes_voo[0].data_embarque, "DD/MM/YYYY").format("ll")}
        </div>
        <div class="flex alignCenter margin_05_top empresa">
            <img src="${item.detalhes_voo[0].logo_marketing}" alt="" class="iconLeft">
            ${item.detalhes_voo[0].nome_marketing}
        </div>
    </div>
    <div class="item-points first">
        <div class="title">
            ${item.detalhes_voo[0].air_embarque}${" "}${item.detalhes_voo[0].hora_embarque}
        </div>
        <div class="description">
            ${cityEmbarqueSlitted[0]}, <br/>
            ${cityEmbarqueSlitted[1]}, <br/>
            ${cityEmbarqueSlitted[2]}
        </div>
    </div>
    <div class="item-times center-align">
        <div class="">
            ${item.duracao_voo}
        </div>
        <div>Tempo total da viagem</div>
    </div>
    <div class="item-points last">
        <div class="title">
            ${item.detalhes_voo[item.detalhes_voo.length - 1].air_desembarque}${" "}${item.detalhes_voo[item.detalhes_voo.length - 1].hora_desembarque}
        </div>
        <div class="description">
            ${cityDesembarqueSlippet[0]}, <br/>
            ${cityDesembarqueSlippet[1]}, <br/>
            ${cityDesembarqueSlippet[2]}
        </div>
    </div>
</div>
<div class="item hide-on-large-only">
    <div class="item-icon white-text flex alignCenter justifyCenter">
        <i class="fas fa-plane"></i>
    </div>
    <div>
    <div class="flex item-content-title">
        <div class="item-title">
            Ida
        </div>
        <div class="item-title bold">
            ${moment(item.detalhes_voo[0].data_embarque, "DD/MM/YYYY").format("ll")}
        </div>
        <div class="flex alignCenter margin_05_top empresa">
            <img src="${item.detalhes_voo[0].logo_marketing}" alt="" class="iconLeft">
            ${item.detalhes_voo[0].nome_marketing}
        </div>
    </div>
    <div class="flex">
    <div class="item-points first">
        <div class="title">
            ${item.detalhes_voo[0].air_embarque}${" "}${item.detalhes_voo[0].hora_embarque}
        </div>
        <div class="description">
            ${cityEmbarqueSlitted[0]}, <br/>
            ${cityEmbarqueSlitted[1]}, <br/>
            ${cityEmbarqueSlitted[2]}
        </div>
    </div>
    <div class="item-times center-align">
        <div class="">
            ${item.duracao_voo}
        </div>
        <div>Tempo total da viagem</div>
    </div>
    <div class="item-points last">
        <div class="title">
            ${item.detalhes_voo[item.detalhes_voo.length - 1].air_desembarque}${" "}${item.detalhes_voo[item.detalhes_voo.length - 1].hora_desembarque}
        </div>
        <div class="description">
            ${cityDesembarqueSlippet[0]}, <br/>
            ${cityDesembarqueSlippet[1]}, <br/>
            ${cityDesembarqueSlippet[2]}
        </div>
    </div>
    </div>
    </div>
</div>`)
}

const itemDetalhesItem = (item, i, map) => {
    if (i !== 0) {

        var dateBefore = map[i - 1].data_desembarque + ' ' + map[i - 1].hora_desembarque;
        var dateAfter = item.data_embarque + ' ' + item.hora_embarque;
        var diff = moment(dateAfter, 'dd/MM/yyyy HH:mm').diff(moment(dateBefore, 'dd/MM/yyyy HH:mm'), 'seconds')
        var diffConverted = moment.utc(diff * 1000).format('HH:mm')
    }
    return (`
    ${i !== 0 ? item.numero_voo !== map[i - 1].numero_voo ? (`
    <div class="item-change hide-on-med-and-down">
        <div class="display"></div>
        <div class="airplane bold">
            <i class="fas fa-plane iconLeft"></i>
            Haver&aacute; troca de aeronave ${i !== 0 ? item.air_embarque !== map[i - 1].air_desembarque ? 'e de aeroporto' : '' : ''}
        </div>
        <div class="hours">
            <i class="fas fa-clock"></i>${" "}${diffConverted}
            <div class="minimizer">Tempo de espera</div>
        </div>
    </div><div class="item-change hide-on-large-only">
    <div class="display"></div>
    <div>
    <div class="airplane bold">
        <i class="fas fa-plane iconLeft"></i>
        Haver&aacute; troca de aeronave ${i !== 0 ? item.air_embarque !== map[i - 1].air_desembarque ? 'e de aeroporto' : '' : ''}
    </div>
    <div class="hours">
        <i class="fas fa-clock"></i>${" "}${diffConverted}
        <div class="minimizer">Tempo de espera</div>
    </div>
    </div>
</div> `) : '' : ''}
    <div class="item hide-on-med-and-down">
    <div class="item-icon white-text flex alignCenter justifyCenter">
        <span>${i + 1}</span>
    </div>
    <div class="flex item-content-title">
        <div class="item-title bold">
            VOO ${item.numero_voo}
        </div>
        <div class="flex alignCenter margin_05_top empresa">
            <img src="${item.logo_marketing}" alt="" class="iconLeft">
            ${item.nome_marketing}
        </div>
        ${item.nome_marketing !== item.nome_operadora ? (`
        <div class="flex alignCenter margin_05_top empresa">
            <img src="${item.logo_operadora}" alt="" class="iconLeft">
            Operado por: ${item.nome_operadora}
        </div>
        `) : ''}
    </div>
    <div class="item-points first">
        <div class="title">
            ${item.air_embarque}
        </div>
        <div class="description">
            ${item.city_embarque}<br />
            Partida: ${item.hora_embarque}<br />
            Data: ${item.data_embarque}
        </div>
    </div>
    <div class="item-times center-align">
        <div class="">
            ${item.tempo_conexao}
        </div>
        <div>Tempo de vôo</div>
    </div>
    <div class="item-points last">
        <div class="title">
        ${item.air_desembarque}
        </div>
        <div class="description">
            ${item.city_desembarque}<br />
            Partida: ${item.hora_desembarque}<br />
            Data: ${item.data_desembarque}
        </div>
    </div>
</div>
<div class="item hide-on-large-only">
    <div class="item-icon white-text flex alignCenter justifyCenter">
        <span>${i + 1}</span>
    </div>
    <div>
    <div class="flex item-content-title">
        <div class="item-title bold">
            VOO ${item.numero_voo}
        </div>
        <div class="flex alignCenter margin_05_top empresa">
            <img src="${item.logo_marketing}" alt="" class="iconLeft">
            ${item.nome_marketing}
        </div>
        ${item.nome_marketing !== item.nome_operadora ? (`
        <div class="flex alignCenter margin_05_top empresa">
            <img src="${item.logo_operadora}" alt="" class="iconLeft">
            Operado por: ${item.nome_operadora}
        </div>
        `) : ''}
    </div>
    <div class="flex">
    <div class="item-points first">
        <div class="title">
            ${item.air_embarque}
        </div>
        <div class="description">
            ${item.city_embarque}<br />
            Partida: ${item.hora_embarque}<br />
            Data: ${item.data_embarque}
        </div>
    </div>
    <div class="item-times center-align">
        <div class="">
            ${item.tempo_conexao}
        </div>
        <div>Tempo de vôo</div>
    </div>
    <div class="item-points last">
        <div class="title">
        ${item.air_desembarque}
        </div>
        <div class="description">
            ${item.city_desembarque}<br />
            Partida: ${item.hora_desembarque}<br />
            Data: ${item.data_desembarque}
        </div>
    </div>
    </div>
    </div>
</div>`)
}