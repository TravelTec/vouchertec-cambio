async function checarAutorizacao() {

    validacao = $("#API_KEY").val();
    var settings = {
        "crossDomain": true,
        "url": "https://api.traveltec.com.br/serv/aereo/autenticacao",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-api-key": validacao,
        },
    }

    await $.ajax(settings).done(function (response) {
        $("#token").val(response.access_token)
        localStorage.setItem("TRAVELTEC", JSON.stringify({token: response.access_token, expires: response.expires_at}))
    })
}

async function homeMultiplas() {
    var host;
    if (window.location.host == 'localhost') {
        host = 'dev.sidon.com.br';
    }else{
        host = window.location.host;
    }
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.traveltec.com.br/serv/aereo/verificacao",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "dominio": host
        }
    }

    await $.ajax(settings).done(function (response) { 
        var dados = response["message"]; 
        var endereco = dados["endereco"]; 
        $("#API_KEY").val(dados.api_key); 
        $("#link_css").attr("href", 'assets/css/cores.php?cor='+dados.cor); 
        $("#titulo").html(dados.fantasia); 
        $(".logo").html('<img src="'+dados.logotipo+'" id="logo" alt="'+dados.fantasia+'">'); 
        $("#telefone").html('<a href="https://wa.me/'+dados.telefone.replace("() ", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "")+'" class="flex alignCenter"> <i class="fab fa-whatsapp"></i> '+dados.telefone.replace("() ", "")+' </a>'); 
        $("#titulo_footer").html(dados.fantasia); 
        $("#titulo_agencia").html(dados.fantasia); 
        $("#endereco_footer").html(endereco.logradouro+', '+endereco.numero+' - '+endereco.cep+' - '+endereco.cidade+' - '+endereco.estado); 
        $(".empresa").html('<div><span class="bold">'+dados.fantasia+'</span> <br />'+endereco.logradouro+', '+endereco.numero+' - '+endereco.cep+' - '+endereco.cidade+' - '+endereco.estado+' <br />Tel: '+dados.telefone.replace("() ", "")+'</div><div>CNPJ: '+dados.cpf_cnpj+'</div>'); 
        $("#telefone_footer").html('Tel: '+dados.telefone.replace("() ", "")); 
        $("#cnpj_footer").html('CNPJ: '+dados.cpf_cnpj);  
    });
}
