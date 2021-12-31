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
<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class="wrap">
		        <div id="icon-themes" class="icon32"></div>  
		        <h2>Licença de uso</h2> 
	<small>Adicione no campo abaixo o número do serial recebido durante a compra do plugin. <br>Ainda não tem um número válido? <a href="https://traveltec.com.br">Compre aqui</a>.</small>
		         <!--NEED THE settings_errors below so that the errors/success messages are shown after submission - wasn't working once we started using add_menu_page and stopped using add_options_page so needed this-->
				<?php global $options; ?>  
		        <form id="vouchertec-cambio-form" action="options.php" method="post">
				<?php settings_fields( 'vouchertec-cambio' ); ?>
				<?php do_settings_sections( 'vouchertec-cambio' ); ?> 
				<table class="form-table">
					<tr valign="top" class="vouchertec-cambio-smtp">
						<th scope="row">
							<?php _e( 'Serial' , 'vouchertec-cambio' ); ?>
						</th>
						<td>
							<input type="text" class="regular-text" name="serial" value="<?php esc_attr_e( get_option( 'serial' ) ); ?>" maxlength="18" placeholder="Nº de serial válido" />
							<input type="hidden" class="regular-text" name="serial_url" value="<?= (get_option( 'serial' ).';'.$_SERVER['HTTP_HOST']) ?>"/>
							<p class="description"><?php _e( 'O número de serial da sua licença.', 'vouchertec-cambio' ); ?></p>
						</td>
					</tr> 
				</table> 
				<p class="submit">
					<input type="submit" class="button-primary" value="<?php _e( 'Cadastrar' , 'vouchertec-cambio' ); ?>" /> 
				</p>
			</form>
</div>
