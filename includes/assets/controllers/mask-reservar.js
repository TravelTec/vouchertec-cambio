
var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
}
var spOptions = {
  onKeyPress: function (val, e, field, options) {
    field.mask(SPMaskBehavior.apply({}, arguments), options);
  }
};

function maskReservar() {
  setTimeout(() => {
    $('input.telefone').mask("(00) 0000-00009").focusout(function (event) {
      if ($(this).val().length > 14) {
        $(this).mask("(00) 00000-0000");
      } else {
        $(this).mask("(00) 0000-0000");
      }
    });
    $("#validadeCartao").mask("00/00")
    $("#cep").mask("00000-000");
    $("#cep_bol").mask("00000-000");
    $("#cep_cartao").mask("00000-000");
    $("#nasc").mask("00/00/0000");
    $(".cardNumber").mask("0000 0000 0000 0000")
    $("#rg").mask("00.000.000-0");
    $("#numeroSeg, #numeroSeg2").mask("0000");
  }, 2000);


};