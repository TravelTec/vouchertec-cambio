function buscarAtivadores() {


    // DATEPPICKER PARTIDA - DESTINO UNICO - SO IDA
    $("#datetimepickerPartida input").datepicker({
        language: 'pt-BR',
        autoClose: true,
        minDate: new Date(),
    });

    if ($("#datetimepickerPartida input").val() !== "") {
        var date = moment($("#datetimepickerPartida input").val(), "DD/MM/YYYY").toDate()
        $('#datetimepickerPartida input').datepicker().data('datepicker').selectDate(date)
    }

    // DATEPPICKER PARTIDA - DESTINO UNICO - SO IDA E VOLTA
    var dateR = '';
    if ($("#datetimepickerPartidaR input").val() !== "") {
        dateR = moment($("#datetimepickerPartidaR input").val(), "DD/MM/YYYY").toDate()
    }
    $("#datetimepickerPartidaR input")
        .datepicker({
            language: 'pt-BR',
            autoClose: true,
            minDate: new Date(),
            startDate: dateR !== "" ? dateR : '',
            onSelect: function (fd, d, picker) {
                var retorno = $("#datetimepickerRetorno input").val()
                $('#datetimepickerRetorno input').datepicker().data('datepicker').update('minDate', d)
                if (retorno !== "") {
                    var timeLeft = moment(retorno, 'DD/MM/YYYY').diff(moment(fd, 'DD/MM/YYYY'), 'days')
                    if (timeLeft < 0) {
                        $('#datetimepickerRetorno input').val('')
                    }
                }

            }
        });

    var dateRR = ''
    if ($("#datetimepickerRetorno input").val() !== "") {
        dateRR = moment($("#datetimepickerRetorno input").val(), "DD/MM/YYYY").toDate()
    }


    $("#datetimepickerRetorno input")
        .datepicker({
            language: 'pt-BR',
            minDate: new Date(),
            autoClose: true,
            startDate: dateRR !== "" ? dateRR : '',
        });

    var date1 = ''
    if ($("#datetimepickerPartida1 input").val() !== "") {
        date1 = moment($("#datetimepickerPartida1 input").val(), "DD/MM/YYYY").toDate()
    }

    // DATEPPICKER PARTIDA 1 - VARIOS DESTINOS
    $("#datetimepickerPartida1 input")
        .datepicker({
            language: 'pt-BR',
            minDate: new Date(),
            autoClose: true,
            startDate: date1 !== "" ? date1 : '',
            onSelect: function (fd, d, picker) {
                var retorno = $("#datetimepickerPartida2 input").val()
                $('#datetimepickerPartida2 input').datepicker().data('datepicker').update('minDate', d)
                if (retorno !== "") {
                    var timeLeft = moment(retorno, 'DD/MM/YYYY').diff(moment(fd, 'DD/MM/YYYY'), 'days')
                    if (timeLeft < 0) {
                        $('#datetimepickerPartida2 input').val('')
                    }
                }
            }
        });




    var date2 = ''
    if ($("#datetimepickerPartida2 input").val() !== "") {
        date2 = moment($("#datetimepickerPartida2 input").val(), "DD/MM/YYYY").toDate()
    }

    $("#datetimepickerPartida2 input")
        .datepicker({
            language: 'pt-BR',
            autoClose: true,
            minDate: new Date(),
            startDate: date2 !== "" ? date2 : '',
            onSelect: function (fd, d, picker) {
                var retorno = $("#datetimepickerPartida3 input").val()
                $('#datetimepickerPartida3 input').datepicker().data('datepicker').update('minDate', d)
                if (retorno !== "") {
                    var timeLeft = moment(retorno, 'DD/MM/YYYY').diff(moment(fd, 'DD/MM/YYYY'), 'days')
                    if (timeLeft < 0) {
                        $('#datetimepickerPartida3 input').val('')
                    }
                }
            }
        });


    var date3 = ''
    if ($("#datetimepickerPartida3 input").val() !== "") {
        date3 = moment($("#datetimepickerPartida3 input").val(), "DD/MM/YYYY").toDate()
    }


    $("#datetimepickerPartida3 input")
        .datepicker({
            language: 'pt-BR',
            minDate: new Date(),
            autoClose: true,
            startDate: date3 !== "" ? date3 : '',
        });



    $('.collapsible').collapsible();


}