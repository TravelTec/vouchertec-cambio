function selectAirport(campo, cidade, sigla, lista) {
    $("#" + campo).val(cidade + "(" + sigla + ")");
    $("#iata_" + campo).val(sigla);
    $("." + lista).addClass('ocultarDisplay');

    var origem = $("#origem").val();
    var destino = $("#destino").val();

    if (campo == "destino_multidestino1") {
        $("#origem_multidestino2").val(cidade);
        $("#iata_origem_multidestino2").val(sigla);
    }
    if (campo == "destino_multidestino2") {
        $("#origem_multidestino3").val(cidade);
        $("#iata_origem_multidestino3").val(sigla);
    }

    var src_form = "";

    var tipo_voo = $("input[name='rota']:checked").val();
    if (parseInt(tipo_voo) === 3) {
    } else {
        if (origem.indexOf("Brasil") !== -1 && destino.indexOf("Brasil") !== -1) {
            $(".classesSelect").val("0").attr("disabled", true)
        } else {
            $(".classesSelect").attr("disabled", false)
        }
    }

}