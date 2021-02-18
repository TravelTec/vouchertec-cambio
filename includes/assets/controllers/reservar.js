// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];
var span3 = document.getElementsByClassName("close3")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    modal3.style.display = "none";
    modal2.style.display = "none";
}
btn2.onclick = function() {
    modal.style.display = "none";
    modal3.style.display = "none";
    modal2.style.display = "block";
}
btn3.onclick = function() {
    modal.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function close_modal1(){
  modal.style.display = "none"; 
}
function close_modal2(){
  modal2.style.display = "none"; 
}
function close_modal3(){
  modal3.style.display = "none"; 
}
 
async function startReservar() {

    progress(20)

    let token = JSON.parse(await localStorage.getItem("TRAVELTEC"))

    if (token) {
        var timeLeft = moment(token.expires, 'DD/MM/YYYY HH:mm:ss').diff(moment(new Date()), 'seconds')
    }

    progress(40)

    progress(50)
    var query = location.search.slice(1);
    var query_data = {};
    if (query != "") {
        var partes = query.split("&");
        var data = {};
        partes.forEach(function (parte) {
            var chaveValor = parte.split("=");
            var chave = chaveValor[0];
            var valor = chaveValor[1];
            data[chave] = valor;
            query_data[chave] = valor
        });
    }

    var voos = data.id_voo_regra1;
    if (data.id_voo_regra2) {
        voos += '+' + data.id_voo_regra2;
    }
    if (data.id_voo_regra3) {
        voos += '+' + data.id_voo_regra3;
    }

    maskReservar()
    await getDetails(data.id_recomendacao)
    progress(60)
    await getFlights(data.id_recomendacao, voos)
    progress(70)
    await getRules(data.id_recomendacao, voos)
    progress(80)
    await getParcels(data.id_recomendacao, voos)
    startTimer(data.id_recomendacao);
    progress(100)
}

$("#numero_do_cartao").on('focusout', function (e) {
    if (e.type == 'focusout') {
        bandeiraCartao()
    }
})

$("#validadeCartao").focusout(function () {
    ValidarDadoValidadeCartao()
})

$("#cpf_cnpj_cartao").focusout(function () {
    validar_numero_cpf_cnpj()
})

$(".nasc").focusout(function () {
    valDataAdulto()
})

$("#cpf_cnpj_cartao").keydown(function () {
    try {
        $("#cpf_cnpj_cartao").unmask();
    } catch (e) { }

    var tamanho = $("#cpf_cnpj_cartao").val().length;
    if (tamanho < 12) {
        $("#cpf_cnpj_cartao").mask("999.999.999-99");
    } else {
        $("#cpf_cnpj_cartao").mask("99.999.999/9999-99");
    }

    // ajustando foco
    var elem = this;
    setTimeout(function () {
        // mudo a posição do seletor
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});
$(".date").focusout(function () {
    var value = $(this).val();
    if (value.length === 10 && !moment(value, "DD/MM/YYYY").isValid()) {
        $(this).val('')
        return swal.fire({
            title: 'Ops!',
            text: 'Data inválida',
            icon: "error"
        })
    }

    var timeLeft = moment(value, 'DD/MM/YYYY').diff(moment(new Date()), 'days')
    if (timeLeft < 0) {
        $(this).val('')
        return swal.fire({
            title: 'Ops!',
            text: 'Data não pode ser anterior a hoje',
            icon: "error"
        })
    }

    if ($(this).attr('id') === 'data_partida_retorno_volta') {
        var value = $("#data_partida_retorno_ida").val()
        if (!moment(value, "DD/MM/YYYY").isValid()) {
            return swal.fire({
                title: 'Ops!',
                text: 'Data de partida inválida',
                icon: "error"
            })
        }
        var diff = moment($(this).val(), 'DD/MM/YYYY').diff(moment(value, 'DD/MM/YYYY'), 'days')
        if (diff < 0) {
            $(this).val('')
            return swal.fire({
                title: 'Ops!',
                text: 'Data de retorno não pode ser menor que data de partida',
                icon: "error"
            })

        }
    }



    if ($(this).attr('id') === 'dpdate_multidestino2') {
        var value = $("#dpdate_multidestino1").val()
        if (!moment(value, "DD/MM/YYYY").isValid()) {
            return swal.fire({
                title: 'Ops!',
                text: 'Data de partida inválida',
                icon: "error"
            })
        }
        var diff = moment($(this).val(), 'DD/MM/YYYY').diff(moment(value, 'DD/MM/YYYY'), 'days')
        if (diff < 0) {
            $(this).val('')
            return swal.fire({
                title: 'Ops!',
                text: 'Data de partida 2 não pode ser menor que data de partida 1',
                icon: "error"
            })

        }
    }

    if ($(this).attr('id') === 'dpdate_multidestino3') {
        var value = $("#dpdate_multidestino2").val()
        if (!moment(value, "DD/MM/YYYY").isValid()) {
            return swal.fire({
                title: 'Ops!',
                text: 'Data de partida inválida',
                icon: "error"
            })
        }
        var diff = moment($(this).val(), 'DD/MM/YYYY').diff(moment(value, 'DD/MM/YYYY'), 'days')
        if (diff < 0) {
            $(this).val('')
            return swal.fire({
                title: 'Ops!',
                text: 'Data de partida 3 não pode ser menor que data de partida 2',
                icon: "error"
            })

        }
    }

})

$("#contato_confirmar_email").focusout(function () {
    if ($("#contato_confirmar_email").val() !== $("#contato_email").val()) {
        $("#contato_confirmar_email").val('')
        $("#contato_email").val('')
        return swal.fire({
            title: 'Ops!',
            text: 'Email não confere',
            icon: "error"
        })
    }
})

$("#botaoFinalizar").click(function () {
    $('form#finalizar').submit();
})
$('form#finalizar').submit(async function (e) {
    e.preventDefault();
    var disabled = $("#botaoFinalizar").is(":disabled")
    if (disabled !== true) {
        // $("#botaoFinalizar").attr('disabled', true)
        if (!$("#aceite_de_termos").is(":checked")) {
            $("#botaoFinalizar").removeAttr("disabled");
            return swal.fire({
                title: 'Ops!',
                text: 'Você precisa aceitar os termos',
                icon: "error"
            })
        }
        if ($("form#finalizar").valid()) {
            await submitReserva();
            $("#botaoFinalizar").attr('disabled', true)
            setTimeout(() => {
                // $("#botaoFinalizar").removeAttr("disabled");
            }, 2000);
        }
    }

    return true
});



jQuery.extend(jQuery.validator.messages, {
    required: "Este campo &eacute; requerido.",
    remote: "Por favor, corrija este campo.",
    email: "Por favor, forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.",
    url: "Por favor, forne&ccedil;a uma URL v&aacute;lida.",
    date: "Por favor, forne&ccedil;a uma data v&aacute;lida.",
    dateISO: "Por favor, forne&ccedil;a uma data v&aacute;lida (ISO).",
    number: "Por favor, forne&ccedil;a um n&uacute;mero v&aacute;lido.",
    digits: "Por favor, forne&ccedil;a somente d&iacute;gitos.",
    creditcard: "Por favor, forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.",
    equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente.",
    accept: "Por favor, forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.",
    maxlength: jQuery.validator.format("Por favor, forne&ccedil;a n&atilde;o mais que {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, forne&ccedil;a ao menos {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1} caracteres de comprimento."),
    range: jQuery.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1}."),
    max: jQuery.validator.format("Por favor, forne&ccedil;a um valor menor ou igual a {0}."),
    min: jQuery.validator.format("Por favor, forne&ccedil;a um valor maior ou igual a {0}.")
});