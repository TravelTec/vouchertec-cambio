function startTimer(id_recomendacao) {
    var timeParsed, timerStoraged;
    timeParsed = localStorage.getItem("TRAVELTEC_ORDER_IN")
    timerStoraged = JSON.parse(timeParsed)

    if (timerStoraged && timerStoraged.id_recomendacao !== id_recomendacao) {
        timerStoraged = localStorage.removeItem("TRAVELTEC_ORDER_IN")
    }

    if (!timerStoraged) {
        var timer = moment(new Date()).add(600, 'seconds').format("DD/MM/YYYY HH:mm:ss")
        var timeLeft = moment(timer, 'DD/MM/YYYY HH:mm:ss').diff(moment(new Date()), 'seconds')
        timerStoraged = localStorage.setItem("TRAVELTEC_ORDER_IN", JSON.stringify({ timer: timer, id_recomendacao: id_recomendacao }))
        startInterval(timeLeft)
    } else {
        var timeLeft = moment(timerStoraged.timer, 'DD/MM/YYYY HH:mm:ss').diff(moment(new Date()), 'seconds')

        /** Exist timer, and same recommendation */
        if (timeLeft < 0) {
            timerStoraged = localStorage.removeItem("TRAVELTEC_ORDER_IN")
            var timer = moment(new Date()).add(600, 'seconds').format("DD/MM/YYYY HH:mm:ss")
            var timeLeft = moment(timer, 'DD/MM/YYYY HH:mm:ss').diff(moment(new Date()), 'seconds')
            timerStoraged = localStorage.setItem("TRAVELTEC_ORDER_IN", JSON.stringify({ timer: timer, id_recomendacao: id_recomendacao }))
        }        

        startInterval(timeLeft)
    }
}

function startInterval(value) {
    

    var interval = setInterval(() => {
        if (value > 0) {
            value--
            $("#clock").html(moment().startOf('day')
                .seconds(value)
                .format('mm:ss'))
        } else {
            clearInterval(interval)
            timerStoraged = localStorage.removeItem("TRAVELTEC_ORDER_IN")
            swal.fire({
                icon: 'error',
                title: 'Tempo esgotado!',
                text: "Essa oferta expirou"
            })
            setTimeout(() => {
                window.location.href = '/'
            }, 1000);
        }
    }, 1000);
}