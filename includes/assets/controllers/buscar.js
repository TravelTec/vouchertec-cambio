async function startBusca() {

    progress(20)
    let token = JSON.parse(await localStorage.getItem("TRAVELTEC"))

    if (token) {
        var timeLeft = moment(token.expires, 'DD/MM/YYYY HH:mm:ss').diff(moment(new Date()), 'seconds')
    }
    progress(30)

    if (timeLeft < 0 || !token) {
        await checarAutorizacao();
    }
    progress(50)

    buscar_dados_aeroportos();
    progress(60)
    sliderFiltro()
    progress(70)

    let rotaObj;


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
        //se for tipo somente ida
        if (parseInt(data["tipo_voo"]) == 1) {
            $("#idavolta").click()

            var uf_destino;
            if (data["cidade_origem"].indexOf("Brasil") === -1) {
                uf_origem = "Internacional";
            } else {
                uf_origem = "Nacional";
            }
            if (data["cidade_destino"].indexOf("Brasil") === -1) {
                uf_destino = "Internacional";
            } else {
                uf_destino = "Nacional";
            }
            if (uf_destino === "Nacional" && uf_origem === "Nacional") {
                $(".item-calendario").addClass("ocultarDisplay");
            } else {
                if (window.location.host === 'dev.sidon.com.br' || window.location.host == 'dev.traveltec.com.br' || window.location.host == 'sidon.com.br') { 
                    $(".item-calendario").removeClass("ocultarDisplay");
                }else{
                    $(".item-calendario").addClass("ocultarDisplay");
                }
            }
            $("#origem").val(replaceSpecialCharsPercent(data["cidade_origem"].replace(/%20/g, " ")));
            $("#iata_origem").val(data["origem"]);
            $("#destino").val(replaceSpecialCharsPercent(data["cidade_destino"].replace(/%20/g, " ")));
            $("#iata_destino").val(data["destino"]);
            $("#data_partida").val(data["data_partida"].replace("-", "/").replace("-", "/"));
            $("#data_partida_retorno_ida").val(data["data_partida"].replace("-", "/").replace("-", "/"));
            if (data["data_retorno"]) {
                $("#data_partida_retorno_volta").val(data["data_retorno"].replace("-", "/").replace("-", "/"));
            }

            $("#adt_count option").each(function () {
                if ($(this).text() === data["adt"]) $(this).attr("selected", "selected");
            });
            $("#chd_count option").each(function () {
                if ($(this).text() === data["inf"]) $(this).attr("selected", "selected");
            });
            $("#inf_count option").each(function () {
                if ($(this).text() === data["bb"]) $(this).attr("selected", "selected");
            });

            var origem = $("#origem").val();
            var destino = $("#destino").val();

            var div_classe = "";
            if (origem.indexOf("Brasil") !== -1 && destino.indexOf("Brasil") != -1) {
                $(".classesSelect").val("0").attr("disabled", true)
                $("form").attr('action', 'reservar.php');
            } else {
                $(".classesSelect").attr("disabled", false)
                $("form").attr('action', 'reservar.php');
            }

            $("#classe_voo_pesquisa option").each(function () {
                if ($(this).val() === data["classe"]) $(this).attr("selected", "selected");
            });

            var rota = data["origem"] + "," + data["destino"] + "," + data["data_partida"].replace(/%2F/g, "-") + "+" + data["destino"] + "," + data["origem"] + "," + data["data_retorno"].replace(/%2F/g, "-");
            rotaObj = [
                {
                    aero_embarque: data["origem"],
                    aero_desembarque: data["destino"],
                    data_embarque: data["data_partida"],
                    hora_embarque: "00:00",
                    hora_desembarque: "23:59"
                },
                {
                    aero_embarque: data["destino"],
                    aero_desembarque: data["origem"],
                    data_embarque: data["data_retorno"],
                    hora_embarque: "00:00",
                    hora_desembarque: "23:59"
                }
            ]


            $(".voos_destino_unico").removeClass("ocultarDisplay");
            $(".voos_multi_destinos").addClass("ocultarDisplay");

            //se for tipo ida e volta
        } else if (parseInt(data["tipo_voo"]) === 2) {
            $("#ida").click()
            var uf_origem;
            var uf_destino;
            if (data["cidade_origem"].indexOf("Brasil") === -1) {
                uf_origem = "Internacional";
            } else {
                uf_origem = "Nacional";
            }
            if (data["cidade_destino"].indexOf("Brasil") === -1) {
                uf_destino = "Internacional";
            } else {
                uf_destino = "Nacional";
            }
            if (uf_destino === "Nacional" && uf_origem === "Nacional") {
                $(".classesSelect").val("0").attr("disabled", true)
            } else {
                $(".classesSelect").attr("disabled", false)
                $("form").attr('action', 'reservar.php');
            }

            $("#origem").val(replaceSpecialCharsPercent(data["cidade_origem"].replace(/%20/g, " ").replace(/%2C/g, ", ").replace("+", " ").replace("+", " ")));
            $("#iata_origem").val(data["origem"]);
            $("#destino").val(replaceSpecialCharsPercent(data["cidade_destino"].replace(/%20/g, " ").replace(/%2C/g, ", ").replace("+", " ").replace("+", " ")));
            $("#iata_destino").val(data["destino"]);
            $("#data_partida").val(data["data_partida"].replace("-", "/").replace("-", "/").replace(/%2F/g, "/"));
            $("#data_partida_retorno_ida").val(data["data_partida"].replace("-", "/").replace("-", "/"));
            if (data["data_retorno"]) {
                $("#data_partida_retorno_volta").val(data["data_retorno"].replace("-", "/").replace("-", "/"));
            }

            $("#adt_count option").each(function () {
                if ($(this).text() === data["adt"]) $(this).attr("selected", "selected");
            });
            $("#chd_count option").each(function () {
                if ($(this).text() === data["inf"]) $(this).attr("selected", "selected");
            });
            $("#inf_count option").each(function () {
                if ($(this).text() === data["bb"]) $(this).attr("selected", "selected");
            });
            $("#classe_voo_pesquisa option").each(function () {
                if ($(this).val() === data["classe"]) $(this).attr("selected", "selected");
            });

            var origem = $("#origem").val();
            var destino = $("#destino").val();

            var div_classe = "";
            if (origem.indexOf("Brasil") !== -1 && destino.indexOf("Brasil") !== -1) {
                $(".classesSelect").val("0").attr("disabled", true)
                $("form").attr('action', 'reservar.php');
            } else {
                $(".classesSelect").attr("disabled", false)
                $("form").attr('action', 'reservar.php');
            }


            var rota = data["origem"] + "," + data["destino"] + "," + data["data_partida"].replace(/%2F/g, "-");
            rotaObj = [
                {
                    aero_embarque: data["origem"],
                    aero_desembarque: data["destino"],
                    data_embarque: data["data_partida"],
                    hora_embarque: "00:00",
                    hora_desembarque: "23:59"
                },
            ]

            $("#voos_destino_unico").attr("style", "");
            $("#voos_multi_destinos").attr("style", "display: none; margin-top: 6px;");

            //se for tipo multi trechos
        } else {

            $("#varios").click();
            var rota = data["rota"];
            let rotaSplitted = rota.split(",")
            rotaObj = [
                {
                    aero_embarque: rotaSplitted[0],
                    aero_desembarque: rotaSplitted[1],
                    data_embarque: rotaSplitted[2],
                    hora_embarque: "00:00",
                    hora_desembarque: "23:59"
                },
                {
                    aero_embarque: rotaSplitted[3],
                    aero_desembarque: rotaSplitted[4],
                    data_embarque: rotaSplitted[5],
                    hora_embarque: "00:00",
                    hora_desembarque: "23:59"
                }
            ]

            var cidades_origem = data["cidades_origem"].split("+");
            var cidades_destino = data["cidades_destino"].split("+");


            $(".item-calendario").addClass("ocultarDisplay");

            if (rotaSplitted.length === 9) {
                rotaObj.push({
                    aero_embarque: rotaSplitted[6],
                    aero_desembarque: rotaSplitted[7],
                    data_embarque: rotaSplitted[8],
                    hora_embarque: "00:00",
                    hora_desembarque: "23:59"
                })
                //criarLinha
                $(".plusButton").click()

                $("#iata_origem_multidestino3").val(rotaSplitted[6]);
                $("#iata_destino_multidestino3").val(rotaSplitted[7]);
                $("#dpdate_multidestino3").val(rotaSplitted[8].replace("-", "/").replace("-", "/"));
                $("#origem_multidestino3").val(replaceSpecialCharsPercent(cidades_origem[2].replace(/%20/g, " ")));
                $("#destino_multidestino3").val(replaceSpecialCharsPercent(cidades_destino[2].replace(/%20/g, " ")));
            }

            $("#iata_origem_multidestino1").val(rotaSplitted[0]);
            $("#iata_destino_multidestino1").val(rotaSplitted[1]);
            $("#dpdate_multidestino1").val(rotaSplitted[2].replace("-", "/").replace("-", "/"));
            $("#origem_multidestino1").val(replaceSpecialCharsPercent(cidades_origem[0].replace(/%20/g, " ")));
            $("#destino_multidestino1").val(replaceSpecialCharsPercent(cidades_destino[0].replace(/%20/g, " ")));

            $("#iata_origem_multidestino2").val(rotaSplitted[3]);
            $("#iata_destino_multidestino2").val(rotaSplitted[4]);
            $("#dpdate_multidestino2").val(rotaSplitted[5].replace("-", "/").replace("-", "/"));
            $("#origem_multidestino2").val(replaceSpecialCharsPercent(cidades_origem[1].replace(/%20/g, " ")));
            $("#destino_multidestino2").val(replaceSpecialCharsPercent(cidades_destino[1].replace(/%20/g, " ")));

            $("#varios").attr("checked", "true");

            $("#voos_destino_unico").attr("style", "display:none");
            $("#voos_multi_destinos").attr("style", "display: block; margin-top: 6px;");

            $("#adt_count_multi option").each(function () {
                if ($(this).text() == data["adt"]) $(this).attr("selected", "selected");
            });
            $("#chd_count_multi option").each(function () {
                if ($(this).text() == data["inf"]) $(this).attr("selected", "selected");
            });
            $("#inf_count_multi option").each(function () {
                if ($(this).text() == data["bb"]) $(this).attr("selected", "selected");
            });
            $("#class_voo_multi option").each(function () {
                if ($(this).val() == data["classe"]) $(this).attr("selected", "selected");
            });


        }

        $("#aereo").val(data["tipo_voo"]);
        $("#rota").val(rota);
        $("#rotaObj").val(JSON.stringify(rotaObj))
        $("#query_data").val(JSON.stringify(query_data))
        $("#adt").val(data["adt"]);
        $("#chd").val(data["inf"]);
        $("#inf").val(data["bb"]);
        $("#class").val(data["classe"]);
        $("#bag").val("0");
        $("#idVoo1").val("0");
        $("#idVoo2").val("0");
        $("#idVoo3").val("0");

        searchFlights(data["tipo_voo"], rotaObj, data["adt"], data["inf"], data["bb"], data["classe"], 0, query_data);
        buscarAtivadores()

    }






}

$('#ida').click(function () {
    $(".search img").removeClass("expand_multi")
    $(".voos_destino_unico").removeClass("ocultarDisplay");
    $(".voos_multi_destinos").addClass("ocultarDisplay");
    $("#partidaretorno").addClass("ocultarDisplay");
    $("#partida").removeClass("ocultarDisplay");

    $(".trecho_ida").removeClass("ocultarDisplay")
    $("#p_voo_ida").html("Vôo de ida")
    $(".trecho_volta").addClass("ocultarDisplay")
    $(".trecho_destino3").addClass("ocultarDisplay")
});
$("#idavolta").click(function () {
    $(".search img").removeClass("expand_multi")
    $("#partida").addClass("ocultarDisplay");
    $(".voos_multi_destinos").addClass("ocultarDisplay");
    $("#partidaretorno").removeClass("ocultarDisplay");
    $(".voos_destino_unico").removeClass("ocultarDisplay");

    $(".trecho_ida").removeClass("ocultarDisplay")
    $("#p_voo_ida").html("Vôo de ida")
    $(".trecho_volta").removeClass("ocultarDisplay")
    $("#p_voo_volta").html("Vôo de volta")
    $(".trecho_destino3").addClass("ocultarDisplay")
    $("#p_voo_destino3").html("Trecho 3")
});
$("#varios").click(function () {
    $(".search img").addClass("expand_multi")
    $(".voos_destino_unico").addClass("ocultarDisplay");
    $(".voos_multi_destinos").removeClass("ocultarDisplay");

    $(".trecho_ida").removeClass("ocultarDisplay")
    $("#p_voo_ida").html("Trecho 1")
    $(".trecho_volta").removeClass("ocultarDisplay")
    $("#p_voo_volta").html("Trecho 2")
    $(".trecho_destino3").removeClass("ocultarDisplay")
    $("#p_voo_destino3").html("Trecho 3")
});
$("#plusButton").click(function () {
    $(".multi-line-three").removeClass("ocultarDisplay");
    $("#plusButton").addClass("ocultarDisplay");
});
$(".multi-item-close").click(function () {
    $(".multi-line-three").addClass("ocultarDisplay");
    $("#plusButton").removeClass("ocultarDisplay");
});
$(".filtrar-open").click(function () {
    $(".buscar-filter").toggleClass("hide-on-med-and-down")
    if ($(".buscar-filter").hasClass("hide-on-med-and-down")) {
        $(".filtrar-open i").removeClass("fa-chevron-up").addClass("fa-chevron-down")
    } else {
        $(".filtrar-open i").addClass("fa-chevron-up").removeClass("fa-chevron-down")
    }
})
$(".buscar-open").click(function () {
    $(".buscar-form").toggleClass("hide-on-med-and-down")
    if ($(".buscar-form").hasClass("hide-on-med-and-down")) {
        $(".buscar-open i").removeClass("fa-chevron-up").addClass("fa-chevron-down")
    } else {
        $(".buscar-open i").addClass("fa-chevron-up").removeClass("fa-chevron-down")
    }
})

$('form#filter').submit(function (e) {
    e.preventDefault()
    submitSearch();
    return true;
});