async function startHome() {
    await homeMultiplas(); 
    progress(140)    
    
    let token = JSON.parse(await localStorage.getItem("TRAVELTEC"))

    if (token) {
        var timeLeft = moment(token.expires, 'DD/MM/YYYY HH:mm:ss').diff(moment(new Date()), 'seconds')
    }
    progress(30)
 
        await checarAutorizacao(); 
    progress(50) 
    buscar_dados_aeroportos();
    progress(90)
    homeAtivadores()  
    progress(120)  
    getDestaques();
    progress(140)    
    setTimeout(function(){
        $("#body_loading").attr("style", "display: none"); 
        $("#body_content").attr("style", "display: block"); 
        $(".progress").attr("style", "display: none"); 
    }, 1650);
}



$("#btn1").on("click", function () {
    progress(20, $('#progressBar'));
});

$('#ida').click(function () {
    $(".search img").removeClass("expand_multi")
    $(".voos_destino_unico").removeClass("ocultarDisplay");
    $(".voos_multi_destinos").addClass("ocultarDisplay");
    $("#partidaretorno").addClass("ocultarDisplay");
    $("#partida").removeClass("ocultarDisplay");
});
$("#idavolta").click(function () {
    $(".search img").removeClass("expand_multi")
    $("#partida").addClass("ocultarDisplay");
    $(".voos_multi_destinos").addClass("ocultarDisplay");
    $("#partidaretorno").removeClass("ocultarDisplay");
    $(".voos_destino_unico").removeClass("ocultarDisplay");
});
$("#varios").click(function () {
    $(".search img").addClass("expand_multi")
    $(".voos_destino_unico").addClass("ocultarDisplay");
    $(".voos_multi_destinos").removeClass("ocultarDisplay");
});
$("#plusButton").click(function () {
    $(".multi-line-three").removeClass("ocultarDisplay");
    $("#plusButton").addClass("ocultarDisplay");
});
$(".multi-item-close").click(function () {
    $(".multi-line-three").addClass("ocultarDisplay");
    $("#plusButton").removeClass("ocultarDisplay");
});
$('form#submit').submit(function (e) {
    e.preventDefault()
    submitSearch();
    return true;
});