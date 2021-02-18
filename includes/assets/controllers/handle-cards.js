function bandeiraCartao(tipo) {
    var bandeira_cartao = $("#bandeira_cartao").val();
    var result = $('#numero_do_cartao').validateCreditCard()
    if (!result.valid) {
        Swal.fire({
            title: "Ops!",
            text: "Cartão inválido",
            icon: "error",
        });

        $("#numero_do_cartao").val("");
    } else {

        if (!$("#bandeiras_permitidas").val().includes(result.card_type.name)) {
            $("#numero_do_cartao").val("");
            return Swal.fire({
                title: "Ops!",
                text: "Cartão não aceito pela operadora",
                icon: "error",
            });
        }
        $("#parcelamento").attr('disabled', false)
        alterarParcela(true)
        switch (result.card_type.name) {
            case 'mastercard':
                $(".iconeCards").each(function () {
                    $(this).addClass("ocultarDisplay")
                })
                $("#iconeMaster").removeClass("ocultarDisplay").addClass("exibe");
                $("#numeroSeg").mask("000").attr('maxlength', 3);
                $("#bandeira_cartao").val("CA");
                break;
            case 'visa':
                $(".iconeCards").each(function () {
                    $(this).addClass("ocultarDisplay")
                })
                $("#iconeVisa").removeClass("ocultarDisplay");
                $("#numeroSeg").mask("000").attr('maxlength', 3);
                $("#bandeira_cartao").val("VI");
                break;
            case 'amex':
                $(".iconeCards").each(function () {
                    $(this).addClass("ocultarDisplay")
                })
                $("#iconeAmex").removeClass("ocultarDisplay");
                $("#numeroSeg").mask("0000").attr('maxlength', 4);

                $("#bandeira_cartao").val("AX");
                break;

            default:
                break;
        }
    }
}



function ValidarDadoValidadeCartao() {
    var validade = $("#validadeCartao").val();
    var validar = validade.split("/");

    var d = new Date();

    var anoVal = "20" + validar[1];
    var anoAtual = d.getFullYear();

    var mesVal = validar[0];
    var mesAtual = d.getMonth();

    if (anoVal == anoAtual && mesVal < mesAtual) {
        Swal.fire({
            text: "Confira a validade do cartão. A validade informada apresenta um cartão expirado."
        });
    } else if (anoVal < anoAtual) {
        Swal.fire({
            text: "Confira a validade do cartão. A validade informada apresenta um cartão expirado."
        });
    } else {

    }
}