function submitSearch() {
    //parâmetros recebidos do motor
    //todos os parâmetros são necessários para a busca
    var tipo_voo = parseInt($("input[name='tipo_voo']:checked").val());
    var url_redirect = $("#url_redirect").val()+'/buscar.php';
    var params = ''

    if (tipo_voo === 1 || tipo_voo === 2) {

        var origem = $("#origem").val();
        var iata_origem = $("#iata_origem").val();
        var destino = $("#destino").val();
        var iata_destino = $("#iata_destino").val();
        var departure_date = $("#data_partida").val();
        var return_date, rtdate1, dpdate1;

        // VALIDAÇÃO DE CAMPOS
        if (origem.length === 0) {
            return Swal.fire({
                title: "Selecione a origem!",
                icon: "error",
            });
        } else if (iata_origem.length === 0) {
            return Swal.fire({
                title: "Origem desconhecido!",
                text: "Por favor, selecione a origem novamente",
                icon: "warning",
            });
        } else if (destino.length === 0) {
            return Swal.fire({
                title: "Selecione a destino!",
                icon: "error",
            });
        }
        if (tipo_voo === 1) {
            var datePartida = $("#datetimepickerPartidaR input").val()
            var dateRetorno = $("#datetimepickerRetorno input").val()
            if (datePartida.length === 0) {
                return Swal.fire({
                    title: "Selecione a data de partida!",
                    icon: "error",
                });
            } else if (datePartida.length !== 10) {
                return Swal.fire({
                    title: "Data de partida inválida!",
                    icon: "error",
                });
            }
            if (dateRetorno.length === 0) {
                return Swal.fire({
                    title: "Selecione a data de retorno!",
                    icon: "error",
                });
            } else if (dateRetorno.length !== 10) {
                return Swal.fire({
                    title: "Data de retorno inválida!",
                    icon: "error",
                });
            }
            departure_date = datePartida;
            return_date = dateRetorno;
            rtdate1 = return_date.replace(/\//g, "-");
        } else {
            if (departure_date.length === 0) {
                return Swal.fire({
                    title: "Selecione a data de partida!",
                    icon: "error",
                });
            } else if (departure_date.length !== 10) {
                return Swal.fire({
                    title: "Data de partida inválida!",
                    icon: "error",
                });
            }
        }

        dpdate1 = departure_date.replace(/\//g, "-");
        var qtd_adultos = $("#adt_count").val();
        var qtd_criancas = $("#chd_count").val();
        var qtd_bebes = $("#inf_count").val();

        if (qtd_adultos < qtd_bebes) {
            return Swal.fire({
                title: "Precisa de 1 adulto para cada bebê",
                icon: "error",
            });
        }

        var classe = $("#classe_voo_pesquisa").val();



        params = url_redirect +
            "?tipo_voo=" +
            tipo_voo +
            "&origem=" +
            iata_origem +
            "&destino=" +
            iata_destino +
            "&cidade_origem=" +
            origem +
            "&cidade_destino=" +
            destino +
            "&data_partida=" +
            dpdate1 +
            (tipo_voo === 1 ? "&data_retorno=" +
                rtdate1 : "") +
            "&adt=" +
            qtd_adultos +
            "&inf=" +
            qtd_criancas +
            "&bb=" +
            qtd_bebes +
            "&classe=" +
            classe +
            "&bagagem=0";

    } else {
        var iata_origem_multidestino1 = $("#iata_origem_multidestino1").val();
        var origem_multidestino1 = $("#origem_multidestino1").val();
        var iata_destino_multidestino1 = $("#iata_destino_multidestino1").val();
        var destino_multidestino1 = $("#destino_multidestino1").val();
        var departure_date_multidestinos1 = $("#dpdate_multidestino1").val();
        var dpdate1_multidestinos1 = departure_date_multidestinos1.replace(/\//g, "-");

        // Validações de campos
        if (origem_multidestino1.length === 0) {
            return Swal.fire({
                title: "Origem inválida!",
                text: "Selecione a origem no trecho 1",
                icon: "error",
            });
        } else if (iata_origem_multidestino1.length === 0) {
            return Swal.fire({
                title: "Origem desconhecido 1!",
                text: "Por favor, selecione a origem do trecho 1 novamente",
                icon: "warning",
            });
        } else if (destino_multidestino1.length === 0) {
            return Swal.fire({
                title: "Destino inválido!",
                text: "Selecione a origem no trecho 1",
                icon: "error",
            });
        } else if (iata_destino_multidestino1.length === 0) {
            return Swal.fire({
                title: "Destino desconhecido 1!",
                text: "Por favor, selecione o destino trecho 1 novamente",
                icon: "warning",
            });
        } else if (departure_date_multidestinos1.length === 0) {
            return Swal.fire({
                title: "Data inválida!",
                text: "Por favor, seleciona uma data de partida para o trecho 1",
                icon: "warning",
            });
        }

        var iata_origem_multidestino2,
            iata_destino_multidestino2,
            departure_date_multidestinos2,
            origem_multidestino2,
            iata_origem_multidestino3,
            iata_destino_multidestino3,
            destino_multidestino3,
            departure_date_multidestinos3;

        var destino_multidestino2 = $("#destino_multidestino2").val();
        var destino_multidestino3 = $("#destino_multidestino3").val();

        var rota = iata_origem_multidestino1 + "," + iata_destino_multidestino1 + "," + dpdate1_multidestinos1;
        var cidades_origem = origem_multidestino1;
        var cidades_destino = destino_multidestino1;

        var qtd_adultos = $("#adt_count_multi").val();
        var qtd_criancas = $("#chd_count_multi").val();
        var qtd_bebes = $("#inf_count_multi").val();
        var classe = $("#class_voo_multi").val();


        if (qtd_adultos < qtd_bebes) {
            return Swal.fire({
                title: "Precisa de 1 adulto para cada bebê",
                icon: "error",
            });
        }

        if (destino_multidestino2.length !== 0) {
            origem_multidestino2 = $("#origem_multidestino2").val();
            iata_origem_multidestino2 = $("#iata_origem_multidestino2").val();
            iata_destino_multidestino2 = $("#iata_destino_multidestino2").val();
            departure_date_multidestinos2 = $("#dpdate_multidestino2").val();
            dpdate1_multidestinos2 = departure_date_multidestinos2.replace(/\//g, "-");
            if (departure_date_multidestinos2.length === 0) {
                return Swal.fire({
                    title: "Data inválida!",
                    text: "Por favor, seleciona uma data de partida para o trecho 2",
                    icon: "warning",
                });
            } else if (origem_multidestino1.indexOf("Brasil") !== -1 && destino_multidestino1.indexOf("Brasil") !== -1) {
                return Swal.fire({
                    title: "Multi trecho inválido!",
                    text: "Vôo Nacional não permite mais de uma rota",
                    icon: "error",
                });
            }
            rota = iata_origem_multidestino1 + "," + iata_destino_multidestino1 + "," + dpdate1_multidestinos1 + "," + iata_origem_multidestino2 + "," + iata_destino_multidestino2 + "," + dpdate1_multidestinos2;
            cidades_origem = origem_multidestino1 + "+" + origem_multidestino2;
            cidades_destino = destino_multidestino1 + "+" + destino_multidestino2;
        }

        if (destino_multidestino3.length !== 0) {
            var destino_multidestino3 = $("#destino_multidestino3").val();
            origem_multidestino3 = $("#origem_multidestino3").val();
            iata_origem_multidestino3 = $("#iata_origem_multidestino3").val();
            iata_destino_multidestino3 = $("#iata_destino_multidestino3").val();
            departure_date_multidestinos3 = $("#dpdate_multidestino3").val();
            dpdate1_multidestinos3 = departure_date_multidestinos3.replace(/\//g, "-");
            if (departure_date_multidestinos3.length === 0) {
                return Swal.fire({
                    title: "Data inválida!",
                    text: "Por favor, seleciona uma data de partida para o trecho 3",
                    icon: "warning",
                });
            } else if (origem_multidestino1.indexOf("Brasil") !== -1 && destino_multidestino1.indexOf("Brasil") !== -1) {
                return Swal.fire({
                    title: "Multi trecho inválido!",
                    text: "Vôo Nacional não permite mais de uma rota",
                    icon: "error",
                });
            }
            rota = iata_origem_multidestino1 +
                "," +
                iata_destino_multidestino1 +
                "," +
                dpdate1_multidestinos1 +
                "," +
                iata_origem_multidestino2 +
                "," +
                iata_destino_multidestino2 +
                "," +
                dpdate1_multidestinos2 +
                "," +
                iata_origem_multidestino3 +
                "," +
                iata_destino_multidestino3 +
                "," +
                dpdate1_multidestinos3;
            cidades_origem = origem_multidestino1 + "+" + origem_multidestino2 + "+" + origem_multidestino3;
            cidades_destino = destino_multidestino1 + "+" + destino_multidestino2 + "+" + destino_multidestino3;
        }



        params =
            url_redirect +
            "?tipo_voo=" +
            tipo_voo +
            "&rota=" +
            rota +
            "&cidades_origem=" +
            cidades_origem +
            "&cidades_destino=" +
            cidades_destino +
            "&adt=" +
            qtd_adultos +
            "&inf=" +
            qtd_criancas +
            "&bb=" +
            qtd_bebes +
            "&classe=" +
            classe +
            "&bagagem=0";
    }

    window.location.href = params
}