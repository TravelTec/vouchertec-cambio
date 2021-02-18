function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
    str = str.replace(/[àáâãäå]/, "a");
    str = str.replace(/[ÈÉÊË]/, "E");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "c");

    // o resto

    return str.replace(/[^a-z0-9]/gi, "");
}

function numberToReal(numero) {
    var numero = numero.toFixed(2).split(".");
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join(".");
    return numero.join(",");
}

function replaceSpecialCharsPercent(str) {
    str = str.replace(/%C3%A1/g, "á");
    str = str.replace(/%C3%A2/g, "â");
    str = str.replace(/%C3%A3/g, "ã");
    str = str.replace(/%C3%A9/g, "é");
    str = str.replace(/%C3%AA/g, "ê");
    str = str.replace(/%C3%AD/g, "í");
    str = str.replace(/%C3%B3/g, "ó");
    str = str.replace(/%C3%B5/g, "õ");
    str = str.replace(/%C3%B4/g, "ô");
    str = str.replace(/%C3%BA/g, "ú");

    str = str.replace(/%C3%81/g, "Á");
    str = str.replace(/%C3%82/g, "Â");
    str = str.replace(/%C3%83/g, "Ã");
    str = str.replace(/%C3%89/g, "É");
    str = str.replace(/%C3%8A/g, "Ê");
    str = str.replace(/%C3%8D/g, "Í");
    str = str.replace(/%C3%93/g, "Ó");
    str = str.replace(/%C3%95/g, "Õ");
    str = str.replace(/%C3%94/g, "Ô");
    str = str.replace(/%C3%9A/g, "Ú");
    str = str.replace(/%C2%A0/g, " ");

    str = str.replace(/%C3%A7/g, "ç");

    // o resto

    return str;
}

function timeDiffA(d1, d2) {
    var d1 = new Date(d1).getTime();
    var d2 = d2 || new Date().getTime();
    var df = Math.abs(d1 - d2);
    var td = {
        d: Math.round(df / (24 * 60 * 60 * 1000)), //dias
        h: Math.round(df / (60 * 60 * 1000)), //horas
        m: Math.abs(Math.round(df / (60 * 1000)) - 60 * 1000), //minutos
        s: Math.abs(Math.round(df / 1000) - 1000),
    };
    var result = "";
    td.h > 0 ? (result += ("0" + td.h).slice(-2) + ":") : "00:";
    td.m > 0 ? (result += ("0" + td.m).slice(-2) + ":") : "00";
    return result;
}

function timeDiff(dtPartida, dtChegada) {
    var antes = moment(dtPartida, "DD/MM/YYYY HH:mm:ss");
    var depois = moment(dtChegada, "DD/MM/YYYY HH:mm:ss");

    var diff = moment.utc(moment(depois, "DD/MM/YYYY HH:mm:ss").diff(moment(antes, "DD/MM/YYYY HH:mm:ss"))).format("kk:mm");

    return diff;
}

function validar_numero_cpf_cnpj() {
    var strCPF = $("#cpf_cnpj_cartao").val();
    var cpf = strCPF.replace(/[^\d]+/g, "");

    // Elimina CPFs invalidos conhecidos
    if (
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        swal.fire({
            title: "Ops... Temos um erro.",
            text: "CPF inválido.",
            type: "warning",
        });
        $("#cpf_cnpj_cartao").val('')
        return false;
    }
    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) {
        swal.fire({
            title: "Ops... Temos um erro.",
            text: "CPF inválido.",
            type: "warning",
        });
        $("#cpf_cnpj_cartao").val('')
        return false;
    }
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) {
        swal.fire({
            title: "Ops... Temos um erro.",
            text: "CPF inválido.",
            type: "warning",
        });
        $("#cpf_cnpj_cartao").val('')
        return false;
    }
}

function valDataNasc(id, tipo) {
    var dateReference = $("#firstDate").val();
    if (tipo === 'Adulto') {
        var data = $("#pax_nasc_" + id).val();
        if (data !== undefined && data !== "") {
            var valordata = data.split("/");
            day = valordata[0];
            month = valordata[1];
            year = valordata[2];

            var valorDataVal = moment(dateReference, 'DD/MM/YYYY').format("DD/MM/YYYY").split("/");
            var dayVal = valorDataVal[0];
            var monthVal = valorDataVal[1];
            var yearVal = valorDataVal[2];

            var dataCalculoI = month + "/" + day + "/" + year;
            var dataCalculoF = monthVal + "/" + dayVal + "/" + yearVal;

            var date1 = new Date(dataCalculoI);
            var date2 = new Date(dataCalculoF);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (moment(dateReference, 'DD/MM/YYYY').diff(moment(data, 'DD/MM/YYYY'), 'seconds') < 0) {
                return swal.fire({ icon: "warning", text: "Data de nascimento inválida." });

            }

            if (month == monthVal) {
                if (diffDays < 4384) {
                    $("#pax_nasc_" + id).val('');
                    swal.fire({ icon: "warning", text: "Data de nascimento inválida para o passageiro do tipo adulto. Para ser considerado adulto, o passageiro deve ter idade superior ou igual a 12 anos na ida e no retorno." });
                } else {
                }
            } else {
                if (diffDays < 4384) {
                    $("#pax_nasc_" + id).val('');
                    swal.fire({ icon: "warning", text: "Data de nascimento inválida para o passageiro do tipo adulto. Para ser considerado adulto, o passageiro deve ter idade superior ou igual a 12 anos na ida e no retorno." });
                } else if (year < 1925) {
                    swal.fire({ icon: "warning", text: "Data inválida!" });
                } else {
                    if (month == 01 || month == 03 || month == 05 || month == 07 || month == 08 || month == 10 || month == 12) {
                        //mes com 31 dias
                        if (day < 01 || day > 31) {
                            bswal.fire({ icon: "warning", text: "Data inválida!" });
                        } else {
                        }
                    } else if (month == 04 || month == 06 || month == 09 || month == 11) {
                        //mes com 30 dias
                        if (day < 01 || day > 30) {
                            swal.fire({ icon: "warning", text: "Data inválida!" });
                        } else {
                        }
                    } else if (month == 02) {
                        //February and leap year
                        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
                            if (day < 01 || day > 29) {
                                swal.fire({ icon: "warning", text: "Data inválida!" });
                            }
                        } else {
                            if (day < 01 || day > 28) {
                                swal.fire({ icon: "warning", text: "Data inválida!" });
                            } else {
                            }
                        }
                    } else if (month > 12) {
                        swal.fire({ icon: "warning", text: "Data inválida!" });
                    } else {
                    }
                }
            }
        }
    } else if (tipo === 'Criança') {
        var data_crianca = $("#pax_nasc_" + id).val();

        var valordata = data_crianca.split("/");
        day = valordata[0];
        month = valordata[1];
        year = valordata[2];

        var valorDataVal = moment(dateReference, 'DD/MM/YYYY').format("DD/MM/YYYY").split("/");
        var dayVal = valorDataVal[0];
        var monthVal = valorDataVal[1];
        var yearVal = valorDataVal[2];

        var dataCalculoI = month + "/" + day + "/" + year;
        var dataCalculoF = monthVal + "/" + dayVal + "/" + yearVal;

        var date1 = new Date(dataCalculoI);
        var date2 = new Date(dataCalculoF);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (moment(dateReference, 'DD/MM/YYYY').diff(moment(data_crianca, 'DD/MM/YYYY'), 'seconds') < 0) {
            return swal.fire({ icon: "warning", text: "Data de nascimento inválida." });

        }
        if (month == monthVal) {
            if (diffDays >= 4384) {
                swal.fire({ icon: "warning", text: "Data de nascimento inválida para o passageiro do tipo criança. Para ser considerado criança, o passageiro deve ter idade inferior a 12 anos na ida e no retorno." });
            } else {
            }
        } else {
            if (diffDays >= 4384) {
                swal.fire({ icon: "warning", text: "Data de nascimento inválida para o passageiro do tipo criança. Para ser considerado criança, o passageiro deve ter idade inferior a 12 anos na ida e no retorno." });
            } else if (year < 1925) {
                swal.fire({ icon: "warning", text: "Data inválida!" });
            } else {
                if (month == 01 || month == 03 || month == 05 || month == 07 || month == 08 || month == 10 || month == 12) {
                    //mes com 31 dias
                    if (day < 01 || day > 31) {
                        swal.fire({ icon: "warning", text: "Data inválida!" });
                    } else {
                    }
                } else if (month == 04 || month == 06 || month == 09 || month == 11) {
                    //mes com 30 dias
                    if (day < 01 || day > 30) {
                        swal.fire({ icon: "warning", text: "Data inválida!" });
                    } else {
                    }
                } else if (month == 02) {
                    //February and leap year
                    if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
                        if (day < 01 || day > 29) {
                            swal.fire({ icon: "warning", text: "Data inválida!" });
                        }
                    } else {
                        if (day < 01 || day > 28) {
                            swal.fire({ icon: "warning", text: "Data inválida!" });
                        } else {
                        }
                    }
                } else if (month > 12) {
                    swal.fire({ icon: "warning", text: "Data inválida!" });
                } else {
                }
            }
        }
    } else {
        var data_crianca = $("#pax_nasc_" + id).val();


        var valordata = data_crianca.split("/");
        day = valordata[0];
        month = valordata[1];
        year = valordata[2];

        var valorDataVal = moment(dateReference, 'DD/MM/YYYY').format("DD/MM/YYYY").split("/");
        var dayVal = valorDataVal[0];
        var monthVal = valorDataVal[1];
        var yearVal = valorDataVal[2];

        var dataCalculoI = month + "/" + day + "/" + year;
        var dataCalculoF = monthVal + "/" + dayVal + "/" + yearVal;

        var date1 = new Date(dataCalculoI);
        var date2 = new Date(dataCalculoF);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (moment(dateReference, 'DD/MM/YYYY').diff(moment(data_crianca, 'DD/MM/YYYY'), 'seconds') < 0) {
            return swal.fire({ icon: "warning", text: "Data de nascimento inválida." });

        }

        if (month == monthVal) {
            if (diffDays >= 732) {
                swal.fire({ icon: "warning", text: "Data de nascimento inválida para o passageiro do tipo bebê. Para ser considerado bebê, o passageiro deve ter idade inferior a 24 meses na ida e no retorno." });
            } else {
            }
        } else {
            if (diffDays >= 732) {
                swal.fire({ icon: "warning", text: "Data de nascimento inválida para o passageiro do tipo bebê. Para ser considerado bebê, o passageiro deve ter idade inferior a 24 meses na ida e no retorno." });
            } else if (year < 1925) {
                swal.fire({ icon: "warning", text: "Data inválida!" });
            } else {
                if (month == 01 || month == 03 || month == 05 || month == 07 || month == 08 || month == 10 || month == 12) {
                    //mes com 31 dias
                    if (day < 01 || day > 31) {
                        swal.fire({ icon: "warning", text: "Data inválida!" });
                    } else {
                    }
                } else if (month == 04 || month == 06 || month == 09 || month == 11) {
                    //mes com 30 dias
                    if (day < 01 || day > 30) {
                        swal.fire({ icon: "warning", text: "Data inválida!" });
                    } else {
                    }
                } else if (month == 02) {
                    //February and leap year
                    if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
                        if (day < 01 || day > 29) {
                            swal.fire({ icon: "warning", text: "Data inválida!" });
                        }
                    } else {
                        if (day < 01 || day > 28) {
                            swal.fire({ icon: "warning", text: "Data inválida!" });
                        } else {
                        }
                    }
                } else if (month > 12) {
                    swal.fire({ icon: "warning", text: "Data inválida!" });
                } else {
                }
            }
        }
    }
}

function progress(width) {
    $(".determinate").css({ 'width': width + '%' })
    if (width === 100) {
        setTimeout(() => {
            $(".progress").addClass("ocultarDisplay")
        }, 500);
    }
}