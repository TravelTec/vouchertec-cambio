function buscarCEP() {
    var cep = $("#cep")
        .val()
        .replace(/[^\d]+/g, "");
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            $("#endereco").val("...");
            $("#cidade").val("...");
            $("#bairro").val("...");
            $("#estado").val("...");

            //Consulta o webservice viacep.com.br/
            var settings = {
                async: true,
                crossDomain: true,
                url: "https://apps.widenet.com.br/busca-cep/api/cep.json?code=" + cep,
                method: "GET",
                headers: {
                    "cache-control": "no-cache",
                    "postman-token": "fb12c81c-5382-030a-8fde-f9955168d2d2",
                },
            };

            $.ajax(settings).done(function (response) {
                var resposta = JSON.parse(JSON.stringify({ response }));

                if (resposta["response"]["status"] == 200) {
                    //Atualiza os campos com os valores da consulta.
                    $("#endereco").val(resposta["response"]["address"]);
                    $("#endereco").focus();
                    $("#bairro").val(resposta["response"]["district"]);
                    $("#bairro").focus();
                    $("#cidade").val(resposta["response"]["city"]);
                    $("#cidade").focus();
                    $("#estado").val(resposta["response"]["state"]);
                    $("#estado").focus();
                    $("#numero").focus()
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    Swal.fire({text: "CEP não encontrado.", icon: "warning"});
                }
            });
        }
    } //end if.
}