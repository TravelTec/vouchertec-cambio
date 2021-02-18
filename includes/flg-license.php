<div class="wrap"> 
    <h1>Voucher Tec - Passagens Aéreas</h1>
    <p>O plugin Voucher Tec - Passagens aéreas precisa ser ativado. <br><br>Abaixo, adicione/edite sua chave de licença para utilização do serviço. </p>

    <?php

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://api.traveltec.com.br/serv/validar/listar_chave",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache", 
        "postman-token: 9b31fa62-8e9f-0d0a-a20c-2d23a77ad979",
        "url-iugu: ".$_SERVER['HTTP_HOST']
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
      echo "cURL Error #:" . $err;
    } else {
        $resposta = json_decode($response, true);
        $dados = $resposta["message"]; 
        $chave = $dados["chave"];

    }
?>
 
        <h3>Ativação da licença</h3>
        <table class="form-table">
            <tr valign="top" class="flg_flights-smtp">
                <th scope="row">
                    Chave da licença
                </th>
                <td>
                    <input type="text" class="regular-text" name="flg_flights[tag-name]" id="tag-name" value="<?=$chave?>" placeholder="postmaster" />
                    <p class="description">Insira a API Key única para o cliente.</p>
                </td>
            </tr> 
        </table> 
        <p class="submit">
            <a onclick="validar_chave_api('<?=$_SERVER['HTTP_HOST']?>')" id="button_save<?=$i?>" title="" value="Salvar dados" class="button button-primary">Salvar dados</a> 
                                    <span class="spinner"></span>
        </p> 
</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<script type="text/javascript">
    function validar_chave_api(host){
        jQuery("form").submit(function(e){
        e.preventDefault();
    });

        jQuery("#button_save").html('Aguarde... <img src="<?=plugin_dir_url( __FILE__ )?>assets/images/loader.gif" style="height: 22px;width: 24px;">');
        var id_iugu = jQuery("#tag-name").val(); 

    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.traveltec.com.br/serv/validar/checar_dados",
  "method": "GET",
  "headers": {
    "id-iugu": id_iugu,
    "url-iugu": host,
    "cache-control": "no-cache",
    "postman-token": "243c1a55-93ec-ae0b-8d77-9e4fa92fe346"
  }
}

jQuery.ajax(settings).done(function (response) {
    if (response.errors) {

        jQuery("#button_save").html('Salvar dados');

                return Swal.fire({

                    title: "Erro encontrado",

                    text: response.message,

                    icon: "error",

                }); 

            }else{  
  return Swal.fire({

                    title: "Validação efetuada",

                    text: response.message,

                    icon: "success",

                }).then((result) => {

  // Reload the Page

  location.reload();

});

}
});
}
</script>