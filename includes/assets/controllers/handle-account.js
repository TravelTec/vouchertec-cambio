function mask_tel(){
    $("#telefone_cadastro").mask("(00) 00000-0000");
    $("#telefone_cadastro_confirmar").mask("(00) 00000-0000");
}

async function handleAccount() {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)
    var emailAddress = $("#email_login").val();
    var pattern = new RegExp(
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
    );
    if (!pattern.test(emailAddress)) {
        $("#email_login").val("")
        return swal.fire({
            title: 'Ops!',
            text: "E-mail inválido!",
            icon: "error"
        })
    } 

    $.ajax({
        type: "POST",
        data: JSON.stringify({ email: emailAddress, senha: $("#senha_login").val() }),
        url: "https://api.traveltec.com.br/admin/login",
        headers: {
            authorization: "Bearer " + token.token,
            "content-type": "application/json",
            accept: "application/json",
        }
    }).done(function (response) {
        if (response.status !== 400) { 
            $("#botaoFinalizar").removeAttr("disabled");
            $("#contato_nome").val(response.message[0].name)
            $("#telefone").val(response.message[0].telefone)
            $("#contato_email").val(response.message[0].email)
            $("#contato_confirmar_email").val(response.message[0].email)
            $("#senha_cadastro").val(response.message[0].senha)
            $("#confirmar_senha_cadastro").val(response.message[0].senha)
            $(".modal").attr("style", "display:none");
            return swal.fire({
                title: 'Login efetuado com sucesso', 
                icon: "success"
            })
        } else {
            $("#botaoFinalizar").attr("disabled", "disabled");
            return swal.fire({
                title: 'Ops!',
                text: response.message,
                icon: "error"
            })
        }

    });
    $("#inner_email_cadastro").val(emailAddress)
    $("#botaoFinalizar").removeAttr("disabled");
    $("#inner_senha_cadastro").val($("#senha_cadastro").val())
}

async function createAccount() {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)

    var nome_cadastro = $("#nome_cadastro").val();
    var sobrenome_cadastro = $("#sobrenome_cadastro").val();
    var telefone_cadastro = $("#telefone_cadastro").val();
    var telefone_cadastro_confirmar = $("#telefone_cadastro_confirmar").val();
    var email_cadastro_box = $("#email_cadastro_box").val();
    var email_cadastro_box_confirmar = $("#email_cadastro_box_confirmar").val();
    var senha_cadastro_box = $("#senha_cadastro_box").val();
    var senha_cadastro_box_confirmar = $("#senha_cadastro_box_confirmar").val();
    var pattern = new RegExp(
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
    );
    if (nome_cadastro == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo Nome",
            icon: "error"
        });
        return false;
    }else if (sobrenome_cadastro == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo Sobrenome",
            icon: "error"
        });
        return false;
    }else if (telefone_cadastro == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo Telefone",
            icon: "error"
        });
        return false;
    }else if (telefone_cadastro_confirmar == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo confirmação de telefone",
            icon: "error"
        });
        return false;
    }else if (telefone_cadastro !== telefone_cadastro_confirmar) { 
        return swal.fire({
            title: 'Ops!',
            text: "Os campos de telefone não conferem",
            icon: "error"
        });
        return false;
    }else if (email_cadastro_box == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo E-mail",
            icon: "error"
        });
        return false;
    }else if (email_cadastro_box_confirmar == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo confirmação de E-mail",
            icon: "error"
        });
        return false;
    }else if (email_cadastro_box !== email_cadastro_box_confirmar) { 
        return swal.fire({
            title: 'Ops!',
            text: "Os campos de E-mail não conferem",
            icon: "error"
        });
        return false;
    }else if (senha_cadastro_box == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo senha",
            icon: "error"
        });
        return false;
    }else if (senha_cadastro_box.length < 8) { 
        return swal.fire({
            title: 'Ops!',
            text: "Senha deve conter no mínimo 8 caracteres",
            icon: "error"
        });
        return false;
    }else if (senha_cadastro_box_confirmar == "") { 
        return swal.fire({
            title: 'Ops!',
            text: "Preencha o campo confirmação de senha",
            icon: "error"
        });
        return false;
    }else if (senha_cadastro_box !== senha_cadastro_box_confirmar) { 
        return swal.fire({
            title: 'Ops!',
            text: "Os campos de senha não conferem",
            icon: "error"
        });
        return false;
    }else{ 
        var nome = nome_cadastro+' '+sobrenome_cadastro;

        $.ajax({
            type: "POST",
            data: JSON.stringify({ tipo: '1', name: nome, celular:telefone_cadastro, email:email_cadastro_box, password:senha_cadastro_box }),
            url: "https://api.traveltec.com.br/admin/new",
            headers: {
                authorization: "Bearer " + token.token,
                "content-type": "application/json",
                accept: "application/json",
            }
        }).done(function (response) {
            if (response.status !== 400) { 
                console.log(response.message[0].telefone)
                $("#nome_cadastro").val("")
                $("#sobrenome_cadastro").val("")
                $("#telefone_cadastro").val("")
                $("#telefone_cadastro_confirmar").val("")
                $("#email_cadastro_box").val("")
                $("#email_cadastro_box_confirmar").val("")
                $("#senha_cadastro_box").val("")
                $("#senha_cadastro_box_confirmar").val("")

                $("#botaoFinalizar").removeAttr("disabled");
                $("#contato_nome").val(response.message[0].name)
                $(".telefone").val(response.message[0].telefone)
                $("#contato_email").val(response.message[0].email)
                $("#contato_confirmar_email").val(response.message[0].email)
                $("#senha_cadastro").val(response.message[0].senha)
                $("#confirmar_senha_cadastro").val(response.message[0].senha)
                $(".modal2").attr("style", "display:none"); 

                var access_token = token.token;
                var senha = response.message[0].senha;
                var name = response.message[0].name;
                $.ajax({
                    url: "/enviar_cadastro.php",
                    type: "POST",
                    data: {name:name, senha:senha, access_token:access_token, senha_cadastro_box:senha_cadastro_box, email_reserva:email_cadastro_box},
                    success: function (resposta) {
                        console.log(resposta);
                        return swal.fire({
                            title: 'Cadastro efetuado com sucesso', 
                            icon: "success"
                        })
                        $(".modal3").attr("style", "display:none"); 
                    }
                });   
            } else {
                $("#botaoFinalizar").attr("disabled", "disabled");
                return swal.fire({
                    title: 'Ops!',
                    text: response.message,
                    icon: "error"
                })
            }

        });
        $("#inner_email_cadastro").val(email_cadastro_box)
        $("#botaoFinalizar").removeAttr("disabled");
        $("#inner_senha_cadastro").val($("#senha_cadastro_box").val())

    }
}

async function sendAccount() {
    let tokenParse = await localStorage.getItem("TRAVELTEC")
    token = JSON.parse(tokenParse)
    var emailAddress = $("#email_recuperar").val();
    var pattern = new RegExp(
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
    );
    if (!pattern.test(emailAddress)) {
        $("#email_recuperar").val("")
        return swal.fire({
            title: 'Ops!',
            text: "E-mail inválido!",
            icon: "error"
        });
        return false;
    } 

    $.ajax({
        type: "POST",
        data: JSON.stringify({ email: emailAddress }),
        url: "https://api.traveltec.com.br/admin/retrieve",
        headers: {
            authorization: "Bearer " + token.token,
            "content-type": "application/json",
            accept: "application/json",
        }
    }).done(function (response) {
        if (response.status !== 400) {  
            var access_token = token.token;
            var senha = response.message[0].senha;
            var name = response.message[0].name;
            $.ajax({
                url: "/enviar_senha.php",
                type: "POST",
                data: {name:name, senha:senha, access_token:access_token, email_reserva:emailAddress},
                success: function (resposta) {
                    $(".modal3").attr("style", "display:none");
                    if (resposta == 1) {    
                        return swal.fire({
                            title: 'Senha enviada com sucesso', 
                            icon: "success"
                        })
                    }else{
                        return swal.fire({
                            title: 'Senha não enviada', 
                            icon: "error"
                        })
                    }
                }
            });  
        } else {
            $("#botaoFinalizar").attr("disabled", "disabled");
            return swal.fire({
                title: 'Ops!',
                text: response.message,
                icon: "error"
            })
        }

    });
    $("#inner_email_cadastro").val(emailAddress)
    $("#botaoFinalizar").removeAttr("disabled");
    $("#inner_senha_cadastro").val($("#senha_cadastro").val())
}