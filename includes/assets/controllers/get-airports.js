function autocompleteAirports(id_campo, lista, classe) {
    var getskills = localStorage.getItem("TRAVELTEC_AIRPORTS");
    var json = JSON.parse(getskills);

    if (
        $("#" + id_campo)
            .val()
            .trim().length === 3
    ) {
        var valor_pesquisado = $("#" + id_campo).val();

        $("." + lista).removeClass('ocultarDisplay');
        $("." + lista).html(" ");
        $("." + lista).addClass(classe);

        //each pesquisando cada item do json armazenado no localStorage do navegador
        $(json).each(function (i, item) {
            var codigo_pesquisar = replaceSpecialChars(item.codigo);

            valor_pesquisado = replaceSpecialChars(valor_pesquisado.toUpperCase());

            if (codigo_pesquisar === valor_pesquisado) {

                $("." + lista).append(
                    "<li class='li_dados registro" + item.codigo + "' onclick=\"selectAirport('" +
                    id_campo +
                    "', '" +
                    item.cidade +
                    "','" +
                    item.codigo +
                    "','" +
                    lista +
                    "')\"  id='sigla' value='" +
                    item.codigo +
                    "'>" +
                    item.cidade +
                    " (" +
                    item.codigo +
                    ")</li>"
                );
            }
        });
    } else if (
        $("#" + id_campo)
            .val()
            .trim().length > 3
    ) {
        var valor_pesquisado = $("#" + id_campo).val();

        $("." + lista).removeClass('ocultarDisplay');
        $("." + lista).addClass(classe);
        $("." + lista).html("");

        //each pesquisando cada item do json armazenado no localStorage do navegador
        var counts = 0;
        $(json).each(function (i, item) {
            var cidade_pesquisar = replaceSpecialChars(item.cidade.toUpperCase());
            var codigo_pesquisar = item.codigo;

            valor_pesquisado = replaceSpecialChars(valor_pesquisado.toUpperCase());

            if (cidade_pesquisar.includes(valor_pesquisado)) {
                if (!$("." + lista).html().includes('registro' + item.codigo)) {
                    $("." + lista).append(
                        "<li class='li_dados registro" + item.codigo + "' onclick=\"selectAirport('" +
                        id_campo +
                        "', '" +
                        item.cidade +
                        "','" +
                        item.codigo +
                        "','" +
                        lista +
                        "')\" id='sigla' value='" +
                        item.codigo +
                        "'>" +
                        item.cidade +
                        " (" +
                        item.codigo +
                        ")</li>"
                    );
                    counts++
                }
            }
        });
        if (counts === 0) {
            if (!$("." + lista).html().includes('Nenhum registro encontrado')) {
                $("." + lista).append(
                    "<li class='li_dados registro' id='sigla'>Nenhum registro encontrado</li>"
                );
            }
        }
    } else if (
        $("#" + id_campo)
            .val()
            .trim() === ""
    ) {
        $("." + lista).addClass('ocultarDisplay');
    } else {
        if (!$("." + lista).html().includes('Nenhum registro encontrado')) {
            $("." + lista).append(
                "<li class='li_dados registro' id='sigla'>Nenhum registro encontrado</li>"
            );
        }
    }
}
