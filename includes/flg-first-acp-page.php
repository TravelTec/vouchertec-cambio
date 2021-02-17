<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/ui-lightness/jquery-ui.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" type="text/css" href="<?=plugin_dir_url( __FILE__ )?>plugins/colorpicker/jquery.colorpicker.css">

<div class="wrap">
	<div id="icon-options-general" class="icon32"><br /></div>
	<span class="alignright"><a target="_blank" href="http://www.smtplw.com.br/"><img src="<?=plugin_dir_url( __FILE__ )?>assets/images/logoMontenegroDigital.png" alt="Voucher Tec by Travel Tec" style="height: 46px"></a></span> 
    <h1>Voucher Tec - Passagens Aéreas</h1> 
    <p>Uma conta é necessária para utilizar esse plugin. Se você já tem a chave de licença inserida, basta realizar as configurações abaixo.</p>
	<p>Se precisa se cadastrar, você pode fazer em <a target="_blank" href="https://montenegrodigital.com.br/sistemas-de-reservas/">https://montenegrodigital.com.br/sistemas-de-reservas/</a>.</p>
 
		<h3>Configuração</h3>
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
		<table class="form-table">
			<tr valign="top" class="flg_flights-smtp">
				<th scope="row">
					<?php _e( 'Url do site' , 'flg_flights' ); ?>
				</th>
				<td>
					<input type="text" class="regular-text" name="flg_flights[username]" id="url" value="<?=$dados['url_sistema']?>" placeholder="postmaster" />
					<p class="description">Insira a url que chamará a pesquisa do sistema.</p>
				</td>
			</tr>
			<tr valign="top" class="smtp_locaweb-smtp">
				<th scope="row">
					<?php _e( 'Background' , 'smtp_locaweb' ); ?>
				</th>
				<td>
					<label for="wte-shortdesc-textarea"><input type="checkbox" name="" onclick="alteratipofundo()" id="background" <?=($dados['background'] == 1 ? 'checked' : '')?>> Utilizar imagem de fundo</label> 
					<p class="description">Selecione essa opção caso queira utilizar uma imagem de fundo no motor de reservas.</p>
				</td>
			</tr> 
			<tr valign="top" class="smtp_locaweb-smtp" id="background_color" style="<?=($dados['background'] == 1 ? 'display:none' : '')?>">
				<th scope="row">
					 
				</th>
				<td>
					<span class="cp-alt-target" style="display: inline;padding: 0.5em 1.3em;background-color: #fff;color: #fff;opacity: 1;border: 1px solid #828282;border-radius: 4px;">
						          
						        </span>
						        <input type="text" class="cp-alt" value="<?=str_replace("#", "", $dados['cor'])?>" id="cor" /> 
				</td>
			</tr>
			<tr valign="top" class="smtp_locaweb-smtp" id="background_image" style="<?=($dados['background'] == 1 ? '' : 'display:none')?>">
				<th scope="row">
					 
				</th>
				<td>
					<div class="form-field term-group">
	                            <label for="category-image-id">Imagem de fundo</label>
	                            <br class="class_p">
	                            <input type="hidden" id="imagem" name="" value="<?=$dados['imagem']?>">
	                            <img src="<?=$dados['imagem']?>" id="img-src" style="<?=(empty($dados['imagem']) ? 'display:none' : 'height: 200px;')?>">
	                            <input type="hidden" id="category-image-id" name="category-image-id" class="custom_media_url" value="">
	                            <div id="category-image-wrapper"></div>
	                            <p>
	                                <a href="#" id="img-upload"><input type="button" class="button button-secondary ct_tax_media_button" id="ct_tax_media_button" name="ct_tax_media_button" value="Adicionar imagem"></a>
	                            </p>
	                        </div>
	                        <br>
	                        <div class="form-field term-group">
	                            <label for="wte-shortdesc-textarea">Posição do fundo</label>
	                            <select id="posicao"> 
	                            	<option value="fixed" <?=($dados['posicao'] == 'fixed' || empty($dados['posicao']) ? 'selected' : '')?>>fixed</option>
	                            	<option value="scroll" <?=($dados['posicao'] == 'scroll' ? 'selected' : '')?>>scroll</option>
	                            </select>
	                        </div> 
	                        <br>
	                        <input type="hidden" id="sobreposicao" value="0" name=""> 
				</td>
			</tr>
		</table> 
		<p class="submit">
			<a onclick="salvar_dados('<?=$_SERVER['HTTP_HOST']?>')" id="button_save<?=$i?>" title="" value="Salvar dados" class="button button-primary">Salvar dados</a>         <span class="spinner"></span>
		</p> 
 
</div> 

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script src="<?=plugin_dir_url( __FILE__ )?>plugins/colorpicker/jquery.colorpicker.js"></script>
<script type="text/javascript">
	function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("myInput");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
} 
          jQuery(function() {
            jQuery('.cp-alt').colorpicker({
              altField: '.cp-alt-target',
              altProperties: 'background-color,color',
              altAlpha: true,
              alpha: true
            });
          });

          function alteratipofundo(){
          	jQuery("#background_image").toggle(500);
          	jQuery("#background_color").toggle(500);
          }

    jQuery('#img-upload').click(function(){
        var upload = wp.media({
        title:'Choose Image', //Title for Media Box
        multiple:false //For limiting multiple image
        })
        .on('select', function(){
            var select = upload.state().get('selection');
            var attach = select.first().toJSON();
            console.log(attach.id); //the attachment id of image
            console.log(attach.url); //url of image
            jQuery('.class_p').attr('style','');
            jQuery('#img-src').attr('style','height: 200px;');
            jQuery('#img-src').attr('src',attach.url);
            jQuery('#imagem').attr('value',attach.url);
        })
        .open();
   }); 

    function salvar_dados(host){ 
        jQuery("#button_save").html('Aguarde... <img src="<?=plugin_dir_url( __FILE__ )?>assets/images/loader.gif" style="height: 22px;width: 24px;">');
        var url = jQuery("#url").val(); 
        var cor = jQuery("#cor").val(); 
        var imagem = jQuery("#imagem").val(); 
        var posicao = jQuery("#posicao").val(); 
        var sobreposicao = 0; 
        if (jQuery("#sobreposicao").is(":checked")) {
        	sobreposicao = 1;
        }
        var background = 0; 
        if (jQuery("#background").is(":checked")) {
        	background = 1;
        }

    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.traveltec.com.br/serv/validar/salvar_dados",
  "method": "GET",
  "headers": { 
    "url-iugu": host,
    "url": url,
    "cor": cor,
    "imagem": imagem,
    "posicao": posicao,
    "sobreposicao": sobreposicao,
    "background": background,
    "cache-control": "no-cache",
    "postman-token": "243c1a55-93ec-ae0b-8d77-9e4fa92fe346"
  }
}

jQuery.ajax(settings).done(function (response) {
	console.log(response);
    if (response.errors) {

        jQuery("#button_save").html('Salvar dados');

                return Swal.fire({

                    title: "Erro encontrado",

                    text: response.message,

                    icon: "error",

                }); 

            }else{  
  return Swal.fire({

                    title: "Dados cadastrados",

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