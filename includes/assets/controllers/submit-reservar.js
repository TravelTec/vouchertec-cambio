async function submitReserva() {
    // $("#botaoFinalizar").attr('disabled', true)
    let tokenParse = await window.localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    if ($("#contato_email").val() !== $("#contato_confirmar_email").val()) {
        return swal.fire({
            icon: "info",
            title: "Ops!",
            text: "O campo e-mail não confere com o campo de validação."
        })
    }  else if ($("#validadeCartao").val() === "") {
        return swal.fire({
            icon: "info",
            title: "Ops!",
            text: "É necessário preencher a validade do cartão."
        })
    } else if ($("#cpf_cnpj_cartao").val() === "") {
        return swal.fire({
            icon: "info",
            title: "Ops!",
            text: "É necessário preencher o CPF/CNPJ do titular."
        })
    } else if ($("#nome").val() === "") {
        return swal.fire({
            icon: "info",
            title: "Ops!",
            text: "É necessário preencher o Nome do titular."
        })
    } else if ($("#sobrenome").val() === "") {
        return swal.fire({
            icon: "info",
            title: "Ops!",
            text: "É necessário preencher o Sobrenome do titular."
        })
    } else if ($("#cep").val() === "") {
        return swal.fire({
            icon: "info",
            title: "Ops!",
            text: "É necessário preencher o CEP."
        })
    } else {
        $("#botaoFinalizar").removeAttr("disabled");
        $.blockUI({ message: '<h2><img src="./assets/images/loading2.svg" style="height:75px;" class="floating"></h2>' });
        var localStorage = window.localStorage.getItem("TRAVELTEC_ORDER")
        var order = JSON.parse(localStorage);
        var detalhes_pax = [];
        var qtd_paxs = order.qtd_adultos + order.qtd_bebes + order.qtd_criancas;

        for (let i = 1; i <= qtd_paxs; i++) {
            var tipo = $("#pax_tipo_" + i).val();
            var tipoSubmit;

            if (tipo === 'Adulto') {
                tipoSubmit = 'ADT'
            } else if (tipo === 'Criança') {
                tipoSubmit = 'CHD'
            } else {
                tipoSubmit = 'INF'
            }
            json_pax = {
                name: $("#pax_nome_" + i).val(),
                lastname: $("#pax_sobrenome_" + i).val(),
                dateBirth: $("#pax_nasc_" + i).val(),
                type: tipoSubmit,
                doc: "02585632025",
                gender: $("#pax_sex_" + i).val(),
            };
            detalhes_pax.push(json_pax);
        }

        var segments, origem, destino, tipo_voo, detalhes_tarifas, logo_companhia, tarifa_por_adulto, valor_adultos, valor_criancas, valor_bebes, valor_taxas, valor_total;

        tarifa_por_adulto = order.tarifa_por_adulto;
        valor_adultos = order.tarifa_adulto;
        valor_criancas = order.tarifa_criancas;
        valor_bebes = order.tarifa_bebes;
        valor_taxas = order.taxas_encargos;
        valor_total = order.valor_total;
    }
    var dado_reserva = JSON.stringify({
        cadastro: {
            email: $("#contato_email").val(),
            senha: $("#senha_cadastro").val(),
        },
        itineraries: {
            pre_reserva: $("#pre_reserva").val()
        },
        pax: detalhes_pax,
        contact: {
            email: $("#contato_email").val(),
            phone: $("#telefone").val().replace("-", "").replace("(", "").replace(")", ""),
            address: [
                {
                    street: $("#endereco").val(),
                    complement: $("#complemento").val(),
                    number: $("#numero").val(),
                    county: "0",
                    city: $("#cidade").val(),
                    state: $("#estado").val(),
                    zipCode: $("#cep").val().replace("-", ""),
                },
            ],
        },
        payment: {
            doc: $("#nome").val(),
            type: "credit_card",
            installments: $("#installment").val(),
            firstInstallment: $("#firstInstallment").val(),
            installment: $("#installments").val(),
            value: $("#valor_total").val(),
            credit_card: {
                number: $("#numero_do_cartao").val(),
                security_code: window.innerWidth < 800 ? $("#numeroSeg2").val() : $("#numeroSeg").val(),
                date: $("#validadeCartao").val(),
                name: $("#nome").val() + ' ' + $("#sobrenome").val(),
            },
        },
    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.traveltec.com.br/serv/aereo/reserva",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer " + token.token
        },
        "processData": false,
        "data": dado_reserva
    }

    $.ajax(settings).done(function (response) {
        if (response.errors) {
            $("#botaoFinalizar").removeAttr("disabled");
            return Swal.fire({
                title: "Ops",
                text: response.message,
                icon: "error",
            });
        } else {
            $("#botaoFinalizar").removeAttr("disabled");
            window.localStorage.setItem("TRAVELTEC_DADOS", dado_reserva);
            window.localStorage.setItem("TRAVELTEC_LOC", response.message);
            if (response.message.length <= '8') {
                window.location.href = 'confirmacao.php';
            }
        }
    });

    // $("#botaoFinalizar").attr('disabled', false)
    $.unblockUI();
} 