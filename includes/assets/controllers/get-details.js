async function getDetails(id_recomendacao) {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.traveltec.com.br/serv/aereo/detalhes/" + id_recomendacao,
        method: "GET",
        headers: {
            authorization: "Bearer " + token.token,
            "content-type": "application/json",
            accept: "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        if (response.status === 200) {
            localStorage.setItem("TRAVELTEC_ORDER", JSON.stringify(response.dados));
            $("#companhia_img").attr('src', response.dados.logo_companhia)
            $("#companhia_title").html(response.dados.nome_companhia)
            $(".preco_adulto").html('R$ ' + response.dados.tarifas.tarifa_por_adulto.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
            $(".qtd_adultos").html(response.dados.qtd_adultos)
            $(".preco_adultos_total").html('R$ ' + response.dados.tarifas.tarifa_adultos.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
            $(".qtd_criancas").html(response.dados.qtd_criancas)
            $(".preco_criancas_total").html('R$ ' + response.dados.tarifas.tarifa_criancas.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
            $(".qtd_bebes").html(response.dados.qtd_bebes)
            $(".preco_bebes_total").html('R$ ' + response.dados.tarifas.tarifa_bebes.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
            $(".valor_taxas").html("R$ " + response.dados.tarifas.taxas_encargos.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
            $(".valor_total").html("R$ " + response.dados.tarifas.valor_total.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
            $("#valor_total").html(response.dados.tarifas.valor_total)

            var info_bagagem;
            if (response.dados.qtd_bagagem === "0" || response.dados.qtd_bagagem === "0N") {
                info_bagagem =
                    '<i class="fas fa-check-circle icon colorPurple" ></i> É permitido ao passageiro portar 1 mala de mão de até 10kg, levada na cabine. <br><i class="fas fa-times-circle icon" style="color: red"></i> Não é permitido despacho de bagagens.';
            } else {
                info_bagagem =
                    '<i class="fas fa-check-circle icon colorPurple" ></i> É permitido ao passageiro portar 1 mala de mão de até 10kg, levada na cabine. <br><i class="fas fa-check-circle icon colorPurple" ></i> É permitido ao passageiro despachar bagagens.';
            }
            $("#info_bagagem").html(info_bagagem);

            let htmlAdt = ''
            for (let index = 1; index <= response.dados.qtd_adultos; index++) {
                htmlAdt += infoLine('fas fa-user', 'Adulto', index)
            }

            let htmlChld = ''
            for (let index = 1; index <= response.dados.qtd_criancas; index++) {
                var indexinternal = index + response.dados.qtd_adultos;
                htmlChld += infoLine('fas fa-child', 'Criança', indexinternal)
            }

            let htmlBB = ''
            for (let index = 1; index <= response.dados.qtd_bebes; index++) {
                var indexinternal = index + response.dados.qtd_adultos + response.dados.qtd_criancas;
                htmlBB += infoLine('fas fa-baby', 'Bebê', indexinternal)
            }


            $("#pax_adultos").html(htmlAdt)
            $("#pax_criancas").html(htmlChld)
            $("#pax_bebes").html(htmlBB)

            $(".nasc").on('focusout', function () {
                var value = $(this).val();
                if (value.length === 10 && !moment(value, "DD/MM/YYYY").isValid()) {
                    $(this).val('')
                    return swal.fire({
                        title: 'Ops!',
                        text: 'Data inválida',
                        icon: "error"
                    })
                }

                var timeLeft = moment(value, 'DD/MM/YYYY').diff(moment(new Date()), 'hours')
                if (timeLeft > 0) {
                    $(this).val('')
                    return swal.fire({
                        title: 'Ops!',
                        text: 'Data não pode ser posterior a hoje',
                        icon: "error"
                    })
                }
            })


            $(".nasc").mask("00/00/0000");
            $('.tooltipped').tooltip();
        } else {
            Swal.fire({
                title: response.message,
                icon: "error",
            });
            return window.history.back()
        }
    });
}




const infoLine = (icon, tipo, index) => {

    return (
        `<div class="details-line">
            <div class="person">
                <i class="${icon}"></i>
                ${tipo}
            </div>
            <div class="name">
                <label>Nome:</label> <a class="tooltipped" data-position="top" data-tooltip="Preencha esse campo com seu primeiro nome, mesmo possuindo nome composto. Por exemplo: seu nome é João Victor Souza. Então você deverá escrever Joao Victor (sem acento)."><i class="fas fa-question-circle"></i></a>
                <input type="text" autocomplete="off" id="pax_nome_${index}" name="pax_nome_${index}" required  />
                <input type="hidden" autocomplete="off" id="pax_tipo_${index}" name="pax_tipo_${index}" value="${tipo}" required  />
            </div>
            <div class="sobrenome">
                <label>Último sobrenome:</label> <a class="tooltipped" data-position="top" data-tooltip="Preencha esse campo com seu último sobrenome. Exceto se o seu último sobrenome for Filho ou Junior. Por exemplo: Seu nome é Joao Victor Souza Filho. Então você deverá escrever Souza Filho (sem acento)."><i class="fas fa-question-circle"></i></a>
                <input type="text" autocomplete="off" id="pax_sobrenome_${index}" name="pax_sobrenome_${index}" required  />
            </div>
            <div class="date">
                <label>Nascimento:</label> <a class="tooltipped" data-position="top" data-tooltip="Insira no campo sua data de nascimento, contendo dia, mês e ano (dd/mm/aaaa) seguindo esse formato."><i class="fas fa-question-circle"></i></a>
                <input type="text" autocomplete="off" class="nasc" id="pax_nasc_${index}" name="pax_nasc_${index}" required />
            </div>
            <div class="sex">
                <label>Sexo:</label> <i class="fas fa-question-circle tooltipped" data-position="top" data-tooltip="Selecione o sexo correspondente ao passageiro."></i>
                <select class="browser-default" id="pax_sex_${index}" name="pax_sex_${index}" required>
                    <option value="">Escolha</option>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                </select>
            </div>
        </div>`
    )
}