function searchAgain(data) {

    var dataParsed = {};
    data.forEach(function (parte) {
        var chave = parte.name;
        var valor = parte.value;
        dataParsed = {
            ...dataParsed,
            [chave]: valor
        }
    });

}


function refreshFilter() {
    searchFlights(
        $("#aereo").val(),
        JSON.parse($("#rotaObj").val()),
        $("#adt").val(),
        $("#chd").val(),
        $("#inf").val(),
        $("#class").val(),
        $("#bag").val(),
        JSON.parse($("#query_data").val()),
        true);
}

function searchForPrice(price) {
    $("#preco").val(price.toString())
    searchFlights(
        $("#aereo").val(),
        JSON.parse($("#rotaObj").val()),
        $("#adt").val(),
        $("#chd").val(),
        $("#inf").val(),
        $("#class").val(),
        $("#bag").val(),
        JSON.parse($("#query_data").val()),
        true);
}

function searchForPriceandCompany(price, company) {
    $("#preco").val(price.toString())
    $("#company").val(company)
    searchFlights(
        $("#aereo").val(),
        JSON.parse($("#rotaObj").val()),
        $("#adt").val(),
        $("#chd").val(),
        $("#inf").val(),
        $("#class").val(),
        $("#bag").val(),
        JSON.parse($("#query_data").val()),
        true);
}