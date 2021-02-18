function searchCreateCarousel(token, id_busca, tipo_voo) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.traveltec.com.br/serv/aereo/calendario_precos/" + id_busca,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer " + token
        },
        "processData": false
    }


    $.ajax(settings).done(function (response) {

        var resposta = response.dados;
        $("#pill-precos").html("Preços por companhia aérea");
        $("#calendario_precos").html(resposta);

        let htmlReturn = '';

        resposta.map(item => {
            htmlReturn = htmlReturn + `<div class="swiper-slide">
            <div class="tab-one-line center-align">
                <div class="flex alignCenter justifyCenter">
                    <img src="${item.logo}" class="logo-image iconLeft" width="20px" />
                    ${"  "}${item.nome_companhia}
                </div>
            </div>
            <div class="tab-one-line flex alignCenter justifyCenter center-align pointer" onclick="searchForPrice(${item.conexaoDireto})">
                ${item.conexaoDireto !== "0.00" ? 'R$ ' + item.conexaoDireto.replace('.', ',')
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : ""}
            </div>
            <div class="tab-one-line flex alignCenter justifyCenter center-align pointer" onclick="searchForPrice(${item.conexoesUm})">
                ${item.conexoesUm !== "0.00" ? 'R$ ' + item.conexoesUm.replace('.', ',')
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : ""}
            </div>
            <div class="tab-one-line flex alignCenter justifyCenter center-align pointer" onclick="searchForPrice(${item.conexoesDois})">
                ${item.conexoesDois !== "0.00" ? 'R$ ' + item.conexoesDois.replace('.', ',')
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : ""}
            </div>
        </div>`
        })
        $(".swiper-companies .swiper-wrapper").html(htmlReturn)
        setTimeout(() => {
            
        var swiper = new Swiper('.swiper-companies', {
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                  },
                640: {
                  slidesPerView: 1
                },
                768: {
                  slidesPerView: 1
                },
                1024: {
                  slidesPerView: 'auto',
                },
              }
        });
        swiper.update()
        }, 1000);

    });
}