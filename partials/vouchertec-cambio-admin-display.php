<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://traveltec.com.br
 * @since      1.2.0
 *
 * @package    Vouchertec - Câmbio
 * @subpackage vouchertec-cambio/partials
 */
?>
<style>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class="wrap">
		        <div id="icon-themes" class="icon32"></div>  
		        <h2>Exibição do câmbio <div><input type="text" value="[vouchertec-cambio]" id="myInput" style="width: 20%;font-size: 14px;background-color: #ccc;color: #000;cursor: pointer;margin-right: 6px;" readonly><button class='button-primary' onclick="myFunction()" >
					Copiar shortcode
					</button></div></h2> 
	<small>Selecione abaixo a forma de exibição do câmbio no seu site.</small>
		         <!--NEED THE settings_errors below so that the errors/success messages are shown after submission - wasn't working once we started using add_menu_page and stopped using add_options_page so needed this-->
				<?php global $options; ?>  
		        <form id="vouchertec-cambio-form" action="options.php" method="post">
				<?php settings_fields( 'vouchertec-cambio' ); ?>
				<?php do_settings_sections( 'vouchertec-cambio' ); ?> 
 
 				<table class="form-table"> 
					<tr valign="top" class="vouchertec-cambio-smtp">
						<th scope="row">
							<?php _e( 'Tipo de cadastro' , 'vouchertec-cambio' ); ?>
						</th>
						<td>
							<input type="radio" name="type" value="0" onclick="change_show(0)" id="automatico" <?=(get_option("type") == 0 ? 'checked' : '')?>> Automático <input type="radio" name="type" value="1" style="margin-left:10px;" onclick="change_show(1)" id="manual" <?=(get_option("type") == 1 ? 'checked' : '')?>> Manual 
						</td>
					</tr> 
					<tr valign="top" class="vouchertec-cambio-smtp">
						<th scope="row">
							<?php _e( 'Tipo de exibição' , 'vouchertec-cambio' ); ?>
						</th>
						<td>
							<input type="radio" name="exibition" value="0" onclick="change_exibition(0)" <?=(get_option("exibition") == 0 ? 'checked' : '')?>> Exibir dólar comercial e turismo <input type="radio" name="exibition" value="1" style="margin-left:10px;" onclick="change_exibition(1)" <?=(get_option("exibition") == 1 ? 'checked' : '')?>> Somente comercial <input type="radio" name="exibition" value="2" style="margin-left:10px;" onclick="change_exibition(2)" <?=(get_option("exibition") == 2 ? 'checked' : '')?>> Somente turismo 
						</td>
					</tr> 
					<tr valign="top" class="vouchertec-cambio-smtp type-manual" style="<?=(empty(get_option("type")) || get_option("type") == 0 ? 'display:none' : '')?>">
						<th scope="row">
							<?php _e( 'Data' , 'vouchertec-cambio' ); ?>
						</th>
						<td>
							<input type="text" class="regular-text datepicker" name="data" value="<?=  date('d/m/Y'); ?>" disabled placeholder="dd/mm/yyyy" id="data" maxlength="10"/>
							<p class="description"><?php _e( 'Data a ser exibida.', 'vouchertec-cambio' ); ?></p>
						</td>
					</tr> 
					<tr valign="top" class="vouchertec-cambio-smtp type-manual type-exibition-comercial" style="<?=(get_option("exibition") == 2 || get_option("type") == 0 ? 'display:none' : '')?>">
						<th scope="row">
							<?php _e( 'Valor dólar comercial' , 'vouchertec-cambio' ); ?>
						</th>
						<td>
							<input type="text" class="regular-text money" name="price_comercial" value="<?php esc_attr_e( get_option( 'price_comercial' ) ); ?>" placeholder="0,00" id="price_comercial" maxlength="4" />
							<p class="description"><?php _e( 'Valor do câmbio comercial para a data informada.', 'vouchertec-cambio' ); ?></p>
						</td>
					</tr> 
					
					<tr valign="top" class="vouchertec-cambio-smtp type-manual type-exibition-turismo" style="<?=(get_option("exibition") == 1 || get_option("type") == 0 ? 'display:none' : '')?>">
						<th scope="row">
							<?php _e( 'Valor dólar turismo' , 'vouchertec-cambio' ); ?>
						</th>
						<td>
							<input type="text" class="regular-text money" name="price_turismo"  id="price_turismo" value="<?php esc_attr_e( get_option( 'price_turismo' ) ); ?>" placeholder="0,00" maxlength="4" />
							<p class="description"><?php _e( 'Valor do câmbio turismo para a data informada.', 'vouchertec-cambio' ); ?></p>
						</td>
					</tr> 
				</table> 
				<p class="submit">
					<input type="submit" class="button-primary" value="<?php _e( 'Salvar alterações' , 'vouchertec-cambio' ); ?>" /> 
				</p>
			</form>
</div>

					<script type="text/javascript">
						jQuery('.money').mask('0,00');
						jQuery('.datepicker').mask('00/00/0000');   
						
						function change_show(value){
							if(value == 0){
								jQuery(".type-manual").attr("style", "display:none");
								jQuery(".type-exibition-comercial").attr("style", "display:none");
								jQuery(".type-exibition-turismo").attr("style", "display:none");
							}else{
								jQuery(".type-manual").attr("style", "");  
							}
						} 
						function change_exibition(value){
							var tipo_cadastro = 0;
							if(jQuery('#manual').is(':checked')){
								tipo_cadastro = 1;
							}
							if(tipo_cadastro == 1){
								if(value == 0){ 
									jQuery(".type-exibition-comercial").attr("style", "");
									jQuery(".type-exibition-turismo").attr("style", "");
								}else if(value == 1){ 
									jQuery(".type-exibition-comercial").attr("style", "");
									jQuery(".type-exibition-turismo").attr("style", "display:none");
								}else{
									jQuery(".type-exibition-comercial").attr("style", "display:none");
									jQuery(".type-exibition-turismo").attr("style", "");
								}
							}
						} 
						
						function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("myInput");

  var text = document.getElementById("myInput");
text.select();
document.execCommand("copy"); 
  alert("Shortcode copiado com sucesso: " + text.value);
}

					</script>
