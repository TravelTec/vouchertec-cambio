function homeAtivadores() {

  $(".date").mask("00/00/0000")

  // DATEPPICKER PARTIDA - DESTINO UNICO - SO IDA
  $("#datetimepickerPartida input").datepicker({
    language: 'pt-BR',
    autoClose: true,
    minDate: new Date(),
  });


  // DATEPPICKER PARTIDA - DESTINO UNICO - SO IDA E VOLTA
  $("#datetimepickerPartidaR input")
    .datepicker({
      language: 'pt-BR',
      autoClose: true,
      minDate: new Date(),
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

  $("#datetimepickerRetorno input")
    .datepicker({
      language: 'pt-BR',
      minDate: new Date(),
      autoClose: true,
    });


  // DATEPPICKER PARTIDA 1 - VARIOS DESTINOS
  $("#datetimepickerPartida1 input")
    .datepicker({
      language: 'pt-BR',
      minDate: new Date(),
      autoClose: true,
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

  $("#datetimepickerPartida2 input")
    .datepicker({
      language: 'pt-BR',
      autoClose: true,
      minDate: new Date(),
      onSelect: function (fd, d, picker) {
        var retorno = $("#datetimepickerPartida3 input").val()
        $('#datetimepickerPartida3 input').datepicker().data('datepicker').update('minDate', d)
        if (retorno !== "") {
          var timeLeft = moment(retorno, 'DD/MM/YYYY').diff(moment(fd, 'DD/MM/YYYY'), 'days')
          if (timeLeft < 0) {
            $('#datetimepickerPartida3 input').val('')
          }
        }
      },
      setValue: function (valueThree) {
        // Insere o valor no campo #datetimepickerPartida3
        $("#datetimepickerPartida3 input").val(valueThree)
      },
    })

  $("#datetimepickerPartida3 input")
    .datepicker({
      language: 'pt-BR',
      minDate: new Date(),
      autoClose: true,
    });
}