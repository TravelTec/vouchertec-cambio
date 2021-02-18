// https://dev.traveltec.com.br/efetuar-checkout.html?aereo=2&rota=SAO%2CMIA%2C24-09-2020&adt=1&chd=0&inf=0&class=0&bag=1N&companhia=AA&id_busca=75&idRec=0&idRec2=&idVoo1=0&idVoo2=0&idVoo3=0&id_voo_regra1=1&id_voo_regra2=&id_voo_regra3=&bagagem_regras=1


var timer2 = "10:01";
var ? = setInterval(function () {
    var timer = timer2.split(":");
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = seconds < 0 ? --minutes : minutes;
    if (minutes < 0) clearInterval(interval);
    seconds = seconds < 0 ? 59 : seconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    $("#clock").html(minutes + "m " + seconds + "s");
    timer2 = minutes + ":" + seconds;
}, 1000);




function valid_form_reserva() {
    var query = location.search.slice(1);
    var partes = query.split("&");
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split("=");
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });

    var qtd_pax = parseInt(data["adt"]) + parseInt(data["chd"]) + parseInt(data["inf"]);

    if ($("#nome_completo").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o nome do solicitante.");
    } else if ($("#email_validar").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o e-mail do solicitante.");
    } else if (!isValidEmailAddress($("#email_validar").val())) {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o campo e-mail com um e-mail válido.");
    } else if ($("#email_validar").val() !== $("#emailContatoConfirmar").val()) {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("O campo e-mail não confere com o campo de validação.");
    } else if ($("#telefone").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o telefone do solicitante.");

        return false;
    } else if ($("#numeroCartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o número do cartão.");

        return false;
    } else if ($("#numeroSeg").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o número de segurança do cartão.");
    } else if ($("#validadeCartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher a validade do cartão.");
    } else if ($("#cpf_cnpj_cartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o CPF/CNPJ do titular.");
    } else if ($("#nomeCartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o Nome do titular.");
    } else if ($("#sobrenomeCartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o Sobrenome do titular.");
    } else if ($("#cep_cartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o CEP.");
    } else if ($("#rua_cartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o Endereço.");
    } else if ($("#num_end_cartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher o Número.");
    } else if ($("#cidade_cartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher a Cidade.");
    } else if ($("#uf_cartao").val() == "") {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário preencher a UF.");
    } else if (!$("#termos_contrato").is(":checked")) {
        $("#formulario_reserva_multiplo").submit(function () {
            return false;
        });

        bootbox.alert("É necessário confirmar que leu e aceita as Condições de Uso e Políticas de privacidade.");
    } else {
        var detalhes_pax = [];
        for (var i = 1; i <= qtd_pax; i++) {
            json_pax = {
                nome: $("#pax_nome_" + i).val(),
                sobrenome: $("#pax_sobrenome_" + i).val(),
                data_nasc: $("#pax_nasc_" + i).val(),
                genero: $("#pax_sex_" + i).val(),
            };
            detalhes_pax.push(json_pax);
        }

        $("#botaoFinalizar").html("<img src='https://dev.montenegrodigital.com.br/img/loading.gif' style='height:30px;margin: 0px 50px;'/>");

        var dados_info_reserva = JSON.stringify(
            {
                cadastro: {
                    email: $("#email_cadastro").val(),
                    senha: $("#senha_cadastro").val(),
                },
                nome_solicitante: $("#nome_completo").val(),
                email_solicitante: $("#email_validar").val(),
                telefone_solicitante: $("#telefone").val(),
                pax: detalhes_pax,
                numero_cartao: $("#numeroCartao").val(),
                numero_seguranca_cartao: $("#numeroSeg").val(),
                validade_cartao: $("#validadeCartao").val(),
                cpf_cnpj_cartao: $("#cpf_cnpj_cartao").val(),
                nome_cartao: $("#nomeCartao").val(),
                sobrenome_cartao: $("#sobrenomeCartao").val(),
                valor_total_reserva: $("#valor_total_reserva").val(),
                parcelas: $("#qtd_parcelas_cartao").val(),
                dado_parcelamento: $("#dado_parcelamento").val(),
                cep: $("#cep_cartao").val(),
                rua: $("#rua_cartao").val(),
                numero: $("#num_end_cartao").val(),
                cidade: $("#cidade_cartao").val(),
                bairro: $("#bairro_cartao").val(),
                uf: $("#uf_cartao").val(),
                termos_contrato: "sim",
            },
            undefined,
            2
        );
        localStorage.setItem("dados_info_reserva", dados_info_reserva);

        window.location.href = "confirmacao.html?" + query;
    }
}




