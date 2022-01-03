<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' ); 

/*
 	* Plugin Name: Vouchertec - Câmbio
 	* Plugin URI: https://traveltec.com.br
 	* Description: Utilize o plugin de Câmbio para conversão dos valores dos seus produtos Woocommerce.
 	* Author: Travel Tec
 	* Author URI: https://traveltec.com.br
 	* Version: 1.3.0
 	*
 */
session_start(); 

require 'plugin-update-checker-4.10/plugin-update-checker.php';

add_action( 'admin_init', 'cambio_update_checker_setting' );  

function cambio_update_checker_setting() { 
	
	register_setting( 'vouchertec-cambio', 'serial' );
	register_setting( 'vouchertec-cambio', 'type' );
	register_setting( 'vouchertec-cambio', 'exibition' );
	register_setting( 'vouchertec-cambio', 'data' );
	register_setting( 'vouchertec-cambio', 'price_comercial' );
	register_setting( 'vouchertec-cambio', 'price_turismo' );

        if ( ! is_admin() || ! class_exists( 'Puc_v4_Factory' ) ) {  
            return;  
        }  

        $myUpdateChecker = Puc_v4_Factory::buildUpdateChecker( 
            'https://github.com/TravelTec/vouchertec-cambio',  
            __FILE__,  
            'cambio'  
        );  
	
        $myUpdateChecker->setBranch('master'); 

    }

function conectar_mysql_wp($server, $user, $pass, $database){  
     
        try{
            // create a PostgreSQL database connection
            $conn = new \PDO("mysql:host=$server;dbname=$database", $user, $pass);
            
            return $conn;
        }catch (\PDOException $e){
            // report error message
            echo $e->getMessage();
        }
    } 

function valida_serial(){
	//1. checa se existe o token
	//2. checa se já existe um domínio cadastrado para o token
	//3. checa se o domínio cadastrado, caso houver, é igual ao domínio da instalação
	$serial = get_option( 'serial' );
	$serial_url = get_option( 'serial_url' );
	
	$conn = conectar_mysql_wp('162.214.165.237', 'travelte_wordpress', 'Travel#2021@', 'travelte_wordpress'); 
	
	if($serial != ""){
		$query = $conn->prepare("SELECT * FROM wp_postmeta WHERE meta_key = 'token_key' AND meta_value = '$serial'");
		$query->execute();
		$dados = $query->fetch(\PDO::FETCH_ASSOC);    
		
		//checa se existe o token
		if(!empty($dados) || $dados != null){
			$subscription_id = $dados["post_id"];
			
			$query = $conn->prepare("SELECT * FROM wp_postmeta WHERE meta_key = 'token_url' AND post_id = '$subscription_id'");
			$query->execute();
			$dados = $query->fetch(\PDO::FETCH_ASSOC);    
			
			//checa se já existe domínio cadastrado
			if(!empty($dados)){ 
				$dominio = $dados["meta_value"];

				//checa se o domínio cadastrado é igual ao da hospedagem
				if($dominio == $_SERVER['HTTP_HOST']){
					return "1";
				}else{
					return "0a";	
				}
			}else{
				return "0b";
			}
		}else{
			return "0c";
		}
	}else{
		return "0d";
	}
}

add_action( 'updated_option', 'updated_option_callback', 10, 3 );
function updated_option_callback( $option, $old_value, $value ) {
	$serial = get_option( 'serial' );
		
	$conn = conectar_mysql_wp('162.214.165.237', 'travelte_wordpress', 'Travel#2021@', 'travelte_wordpress');
	
	$query = $conn->prepare("SELECT * FROM wp_postmeta WHERE meta_key = 'token_key' AND meta_value = '$serial'");
	$query->execute();
	
	$dados = $query->fetch(\PDO::FETCH_ASSOC); 
	
	$subscription_id = $dados["post_id"];
			
	$query = $conn->prepare("SELECT * FROM wp_postmeta WHERE meta_key = 'token_url' AND post_id = '$subscription_id'");
	$query->execute();
	$dados = $query->fetch(\PDO::FETCH_ASSOC);    
	
	$dominio = $dados["meta_value"];

	//checa se o domínio cadastrado é igual ao da hospedagem
	if($dominio !== $_SERVER['HTTP_HOST']){  
		$url = $_SERVER['HTTP_HOST'];
		$query = $conn->prepare("UPDATE wp_postmeta SET  meta_value = '$url' WHERE post_id = '$subscription_id' AND meta_key = 'token_url'");
		$query->execute();
	}
}
			    		 			
$validar = valida_serial();  
if($validar == "1"){
	add_action( 'woocommerce_order_status_changed', 'your_function', 99, 3 ); 
	function your_function( $order_id, $old_status, $new_status ){  
			//your code here  

		$order = wc_get_order( $order_id ); // The WC_Order object instance

		$curl = curl_init();

			curl_setopt_array($curl, array(
				CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRL",
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => "",
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 30,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => "GET", 
				CURLOPT_HTTPHEADER => array(
					"cache-control: no-cache",
					"content-type: application/json",
					"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
				),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
				echo "cURL Error #:" . $err;
			} else {
				$dados = array_values(json_decode($response, true)); 

				$valor_converter_cambio_comercial = $dados[0]["high"];
			}

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/oauth/token",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_POSTFIELDS => "{\n\t\"client_id\": \"105\",\n\t\"client_secret\": \"AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53\",\n\t\"grant_type\": \"client_credentials\"\n}",
			  CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
				"client_id: 105",
				"client_secret: AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53",
				"content-type: application/json",
				"grant_type: client_credentials",
				"postman-token: cefe5fcc-d209-3170-5b95-5f895ad044ed"
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
			  echo "cURL Error #:" . $err;
			} else {
			  $dados_oauth = json_decode($response, true); 
			  $access_token = $dados_oauth["access_token"];
			} 

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/api/simulate?amount=1000",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "GET",
			  CURLOPT_HTTPHEADER => array(
				"amount: 100",
				"authorization: Bearer ".$access_token, 
				"content-type: application/json" 
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			$dados = json_decode($response, true); 


			$valor_converter_cambio_turismo = $dados["data"]["dolar"];

		// Loop through Order items ("line_item" type)
		foreach( $order->get_items() as $item_id => $item ){
			$product = $item->get_product();
			$post_id = $product->get_id();
			$product_price = (int) $product->get_price(); // A static replacement product price 

			$dolar_comercial = get_post_meta( $post_id, '_evisa', true);
			$dolar_turismo = get_post_meta( $post_id, '_ecred', true); 

			$new_product_price = $product_price; 

			$product_quantity = (int) $item->get_quantity(); // product Quantity

			if ($dolar_comercial == 'yes') {

				$valor_convertido = number_format(floatval($product_price)*floatval($valor_converter_cambio_comercial), 2, ".", "");

				$new_product_price = $valor_convertido;   
			}else if($dolar_turismo == 'yes'){

				$valor_convertido = number_format(floatval($product_price)*floatval($valor_converter_cambio_turismo), 2, ".", "");

				$new_product_price = $valor_convertido;   
			}else{

				$new_product_price = $product_price;   
			}

			// The new line item price
			$new_line_item_price = $new_product_price * $product_quantity;

			// Set the new price
			$item->set_subtotal( $new_line_item_price ); 
			$item->set_total( $new_line_item_price );

			// Make new taxes calculations
			$item->calculate_taxes();

			$item->save(); // Save line item data
		}
		// Make the calculations  for the order and SAVE
		$order->calculate_totals();   
	}

	function return_custom_price($price, $product) {
		if(!is_admin()){
			global $post, $blog_id;
			$product = wc_get_product( '$post_id' );
			$post_id = $post->ID;
			$wc_product_id = 5266;

			$dolar_comercial = get_post_meta( $post_id, '_evisa', true);
			$dolar_turismo = get_post_meta( $post_id, '_ecred', true);

			$valor = get_post_meta( get_the_ID(), '_regular_price', true); 

			if($dolar_comercial == 'yes'){
				$_SESSION['tipo_produto'] = 'comercial';

				$curl = curl_init();

				curl_setopt_array($curl, array(
				  CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRL",
				  CURLOPT_RETURNTRANSFER => true,
				  CURLOPT_ENCODING => "",
				  CURLOPT_MAXREDIRS => 10,
				  CURLOPT_TIMEOUT => 30,
				  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				  CURLOPT_CUSTOMREQUEST => "GET", 
				  CURLOPT_HTTPHEADER => array(
					"cache-control: no-cache",
					"content-type: application/json",
					"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
				  ),
				));

				$response = curl_exec($curl);
				$err = curl_error($curl);

				curl_close($curl);

				if ($err) {
					echo "cURL Error #:" . $err;
				} else {
					$dados = array_values(json_decode($response, true)); 

					$valor_converter = $dados[0]["high"];

				  $valor_convertido = number_format(floatval($price)*floatval($valor_converter), 2, ".", "");

				  $price = $valor_convertido;  

				} 
				return $price;
			}else if($dolar_turismo == 'yes'){
				$_SESSION['tipo_produto'] = 'turismo';

				$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://app.parcelow.com/oauth/token",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "{\n\t\"client_id\": \"105\",\n\t\"client_secret\": \"AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53\",\n\t\"grant_type\": \"client_credentials\"\n}",
		  CURLOPT_HTTPHEADER => array(
			"cache-control: no-cache",
			"client_id: 105",
			"client_secret: AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53",
			"content-type: application/json",
			"grant_type: client_credentials",
			"postman-token: cefe5fcc-d209-3170-5b95-5f895ad044ed"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  echo "cURL Error #:" . $err;
		} else {
		  $dados_oauth = json_decode($response, true); 
		  $access_token = $dados_oauth["access_token"];
		} 

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://app.parcelow.com/api/simulate?amount=1000",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
			"amount: 100",
			"authorization: Bearer ".$access_token, 
			"content-type: application/json" 
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		$dados = json_decode($response, true); 


				  $valor_converter = $dados["data"]["dolar"];

				  $valor_convertido = number_format(floatval($price)*floatval($valor_converter), 2, ".", "");

				  $price = $valor_convertido; 

				return $price;
			}else{
				$_SESSION['tipo_produto'] = 'normal';

				return $price;
			} 
		}else{
			return $price;
		} 
	}
	add_filter('woocommerce_get_price', 'return_custom_price', 10, 2);

	add_filter( 'woocommerce_variable_price_html', 'filter_wc_variable_price_html', 10, 2 );
	function filter_wc_variable_price_html( $price_html, $product ) {
		if(!is_admin()){ 
			$post_id = $product->get_id(); 

			$dolar_comercial = get_post_meta( $post_id, '_evisa', true);
			$dolar_turismo = get_post_meta( $post_id, '_ecred', true); 

			if($dolar_comercial == 'yes'){
				$min_price = $product->get_variation_price( 'min' );  
				$max_price = $product->get_variation_price( 'max' );  

				$_SESSION['tipo_produto'] = 'comercial';

				$curl = curl_init();

				curl_setopt_array($curl, array(
				  CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRL",
				  CURLOPT_RETURNTRANSFER => true,
				  CURLOPT_ENCODING => "",
				  CURLOPT_MAXREDIRS => 10,
				  CURLOPT_TIMEOUT => 30,
				  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				  CURLOPT_CUSTOMREQUEST => "GET", 
				  CURLOPT_HTTPHEADER => array(
					"cache-control: no-cache",
					"content-type: application/json",
					"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
				  ),
				));

				$response = curl_exec($curl);
				$err = curl_error($curl);

				curl_close($curl);

				if ($err) {
					echo "cURL Error #:" . $err;
				} else {
					$dados = array_values(json_decode($response, true)); 

					$valor_converter = $dados[0]["high"];

				  $price_min = number_format(floatval($min_price)*floatval($valor_converter), 2, ".", "");
				  $price_max = number_format(floatval($max_price)*floatval($valor_converter), 2, ".", ""); 

				} 
				return '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">R$ </span>'.str_replace(".", ",", $price_min).' - <span class="woocommerce-Price-currencySymbol">R$ </span> '.str_replace(".", ",", $price_max).'</span></bdi>';
			}else if($dolar_turismo == 'yes'){
		// only for variable product 68719 

				$min_price = $product->get_variation_price( 'min' );  
				$max_price = $product->get_variation_price( 'max' );  

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://app.parcelow.com/oauth/token",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "{\n\t\"client_id\": \"105\",\n\t\"client_secret\": \"AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53\",\n\t\"grant_type\": \"client_credentials\"\n}",
		  CURLOPT_HTTPHEADER => array(
			"cache-control: no-cache",
			"client_id: 105",
			"client_secret: AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53",
			"content-type: application/json",
			"grant_type: client_credentials",
			"postman-token: cefe5fcc-d209-3170-5b95-5f895ad044ed"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  echo "cURL Error #:" . $err;
		} else {
		  $dados_oauth = json_decode($response, true); 
		  $access_token = $dados_oauth["access_token"];
		} 

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://app.parcelow.com/api/simulate?amount=1000",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
			"amount: 100",
			"authorization: Bearer ".$access_token, 
			"content-type: application/json" 
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		$dados = json_decode($response, true); 


				  $valor_converter = $dados["data"]["dolar"];

				  $price_min = number_format(floatval($min_price)*floatval($valor_converter), 2, ".", "");
				  $price_max = number_format(floatval($max_price)*floatval($valor_converter), 2, ".", ""); 


			return '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">R$ </span>'.str_replace(".", ",", $price_min).' - <span class="woocommerce-Price-currencySymbol">R$ </span> '.str_replace(".", ",", $price_max).'</span></bdi>';
			}else{
		// only for variable product 68719 

				$min_price = $product->get_variation_price( 'min' );  
				$max_price = $product->get_variation_price( 'max' );  
			return '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">R$ </span>'.str_replace(".", ",", $min_price).' - <span class="woocommerce-Price-currencySymbol">R$ </span> '.str_replace(".", ",", $max_price).'</span></bdi>';

			}
		}

	}

	add_action('woocommerce_before_add_to_cart_form', 'selected_variation_price_replace_variable_price_range');
	function selected_variation_price_replace_variable_price_range(){

		global $product;
		if( $product->is_type('variable') ):

		 $min_price = $product->get_variation_price( 'min' ); 
			$post_id = $product->get_id(); 

			$dolar_comercial = get_post_meta( $post_id, '_evisa', true);
			$dolar_turismo = get_post_meta( $post_id, '_ecred', true); 

			if($dolar_comercial == 'yes'){
				$tipo_produto = 'comercial';
			}else if($dolar_turismo == 'yes'){
				$tipo_produto = 'turismo';
			}else{
				$tipo_produto = 'comercial';
			} 
		?> 
		<script>
		jQuery(function($) { 

			$('form.cart').on('show_variation', function( event, data ) {
				jQuery(".woocommerce-variation-price").html('');
				jQuery(".single_variation").attr('style', 'display:none');
				if ( data.price_html ) {
					console.log(data.price_html);
					jQuery(".woocommerce-variation-price").html('');
					jQuery(".single_variation").attr('style', 'display:none');
					jQuery.ajax({
						type: "POST",
						url: "/wp-content/plugins/voucher-cambio/includes/ajax-cambio.php",
						data: {price: data.price_html, produto: "<?=$tipo_produto?>"}, 
						success: function(result){ 
							console.log(result);
							jQuery(".woocommerce-variation-price").html('<span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">R$ </span>'+result.replace(".", ",")+'</bdi></span>');
							jQuery(".single_variation").attr('style', '');
						}

					});
				}
			});
		});
		</script>
		<?php
		endif;
	}

	add_action( 'woocommerce_before_calculate_totals', 'custom_cart_total2' );
	function custom_cart_total2() {

		if ( is_admin() && ! defined( 'DOING_AJAX' ) )
			return;

		if ( did_action( 'woocommerce_before_calculate_totals' ) >= 2 )
			return;  

			$curl = curl_init();

			curl_setopt_array($curl, array(
				CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRL",
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => "",
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 30,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => "GET", 
				CURLOPT_HTTPHEADER => array(
					"cache-control: no-cache",
					"content-type: application/json",
					"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
				),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
				echo "cURL Error #:" . $err;
			} else {
				$dados = array_values(json_decode($response, true)); 

				$valor_converter_cambio_comercial = $dados[0]["high"];
			}

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/oauth/token",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_POSTFIELDS => "{\n\t\"client_id\": \"105\",\n\t\"client_secret\": \"AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53\",\n\t\"grant_type\": \"client_credentials\"\n}",
			  CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
				"client_id: 105",
				"client_secret: AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53",
				"content-type: application/json",
				"grant_type: client_credentials",
				"postman-token: cefe5fcc-d209-3170-5b95-5f895ad044ed"
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
			  echo "cURL Error #:" . $err;
			} else {
			  $dados_oauth = json_decode($response, true); 
			  $access_token = $dados_oauth["access_token"];
			} 

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/api/simulate?amount=1000",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "GET",
			  CURLOPT_HTTPHEADER => array(
				"amount: 100",
				"authorization: Bearer ".$access_token, 
				"content-type: application/json" 
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			$dados = json_decode($response, true); 


			$valor_converter_cambio_turismo = $dados["data"]["dolar"];

		foreach ( WC()->cart->get_cart() as $cart_item ) {
			$post_id = $cart_item['product_id'];  

			$dolar_comercial = get_post_meta( $post_id, '_evisa', true);
			$dolar_turismo = get_post_meta( $post_id, '_ecred', true); 
			## Price calculation ## 

			if ($dolar_comercial == 'yes') {

				$valor_convertido = number_format(floatval($cart_item['data']->price)*floatval($valor_converter_cambio_comercial), 2, ".", "");

				$price = $valor_convertido;   
			}else if($dolar_turismo == 'yes'){

				$valor_convertido = number_format(floatval($cart_item['data']->price)*floatval($valor_converter_cambio_turismo), 2, ".", "");

				$price = $valor_convertido;   
			}else{

				$price = $cart_item['data']->price;   
			}

			## Set the price with WooCommerce compatibility ##
			if ( version_compare( WC_VERSION, '3.0', '<' ) ) {
				$cart_item['data']->price = $price; // Before WC 3.0
			} else {
				$cart_item['data']->set_price( $price ); // WC 3.0+
			}       

		}  

	}

	add_action('woocommerce_checkout_order_processed', 'action_checkout_order_processed', 10, 3);
	function action_checkout_order_processed( $order_id, $posted_data, $order ) { 
		$order = wc_get_order($order_id);

		$curl = curl_init();

			curl_setopt_array($curl, array(
				CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRL",
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => "",
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 30,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => "GET", 
				CURLOPT_HTTPHEADER => array(
					"cache-control: no-cache",
					"content-type: application/json",
					"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
				),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
				echo "cURL Error #:" . $err;
			} else {
				$dados = array_values(json_decode($response, true)); 

				$valor_converter_cambio_comercial = $dados[0]["high"];
			}

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/oauth/token",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_POSTFIELDS => "{\n\t\"client_id\": \"105\",\n\t\"client_secret\": \"AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53\",\n\t\"grant_type\": \"client_credentials\"\n}",
			  CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
				"client_id: 105",
				"client_secret: AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53",
				"content-type: application/json",
				"grant_type: client_credentials",
				"postman-token: cefe5fcc-d209-3170-5b95-5f895ad044ed"
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
			  echo "cURL Error #:" . $err;
			} else {
			  $dados_oauth = json_decode($response, true); 
			  $access_token = $dados_oauth["access_token"];
			} 

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/api/simulate?amount=1000",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "GET",
			  CURLOPT_HTTPHEADER => array(
				"amount: 100",
				"authorization: Bearer ".$access_token, 
				"content-type: application/json" 
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			$dados = json_decode($response, true); 


			$valor_converter_cambio_turismo = $dados["data"]["dolar"];

		// Loop through Order items ("line_item" type)
		foreach( $order->get_items() as $item_id => $item ){
			$product = $item->get_product();
			$post_id = $product->get_id();
			$product_price = (int) $product->get_price(); // A static replacement product price 

			$dolar_comercial = get_post_meta( $post_id, '_evisa', true);
			$dolar_turismo = get_post_meta( $post_id, '_ecred', true); 

			$new_product_price = $product_price; 

			$product_quantity = (int) $item->get_quantity(); // product Quantity

			if ($dolar_comercial == 'yes') {

				$valor_convertido = number_format(floatval($product_price)/floatval($valor_converter_cambio_comercial), 2, ".", "");

				$new_product_price = $valor_convertido;   
			}else if($dolar_turismo == 'yes'){

				$valor_convertido = number_format(floatval($product_price)/floatval($valor_converter_cambio_turismo), 2, ".", "");

				$new_product_price = $valor_convertido;   
			}else{

				$new_product_price = $product_price;   
			}

			// The new line item price
			$new_line_item_price = $new_product_price * $product_quantity;

			// Set the new price
			$item->set_subtotal( $new_line_item_price ); 
			$item->set_total( $new_line_item_price );

			// Make new taxes calculations
			$item->calculate_taxes();

			$item->save(); // Save line item data
		}
		// Make the calculations  for the order and SAVE
		$order->calculate_totals();


	}
}

function my_enqueue() { 
    wp_enqueue_style('bootstrap-datepicker', 'https://apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery-ui.min.css');
	
    wp_enqueue_script('cambio_script', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.11.2/jquery.mask.min.js');
    wp_enqueue_script('bootstrap-datepicker', 'https://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js');
}

add_action('admin_enqueue_scripts', 'my_enqueue');

add_action( 'wp_enqueue_scripts', 'enqueue_scripts_cambio' ); 
function enqueue_scripts_cambio() { 

    wp_enqueue_script( 
        'cambio-script',
        plugin_dir_url( __FILE__ ) . 'includes/assets/js/cambio-script.js?v='.date("dmYHis"),
        array( 'jquery' ),
        false,
        true
    );

    wp_localize_script( 
        'cambio-script',
        'wp_ajax_cambio',
        array( 
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'dede' => 1234
        )                 
    );
} 



add_filter( 'woocommerce_checkout_cart_item_quantity', 'customizing_checkout_item_quantity', 10, 3);
function customizing_checkout_item_quantity( $quantity_html, $cart_item, $cart_item_key ) {
    $quantity_html = ' <br>
            <span class="product-quantity" style="font-size:12px;">' . __('Quantidade:') . ' <strong>' . $cart_item['quantity'] . ' '.($cart_item['quantity'] > 1 ? 'unidades' : 'unidade').'</strong></span>';

    return $quantity_html;
} 

function hide_coupon_field_on_cart_cambio( $enabled ) {
    if ( is_checkout() ) {
        $enabled = false;
    }
    return $enabled;
    }
    add_filter( 'woocommerce_coupons_enabled', 'hide_coupon_field_on_cart_cambio' );

    add_filter( 'woocommerce_add_to_cart_validation', 'remove_cart_item_before_add_to_cart_cambio', 20, 3 );
    function remove_cart_item_before_add_to_cart_cambio( $passed, $product_id, $quantity ) {
        if( ! WC()->cart->is_empty() )
            WC()->cart->empty_cart();
        return $passed;
    }

    add_filter('woocommerce_checkout_get_value','__return_empty_string', 1, 1);

    add_filter( 'cartflows_allow_persistace', 'do_not_store_persistance_data_cambio', 10, 1 );

    function do_not_store_persistance_data_cambio( $allow ){
      $allow = 'no';
      return $allow;
    } 

$validar = valida_serial();  
if($validar == "1"){
	add_action( 'wp_ajax_change_price_order', 'change_price_order' );
	add_action( 'wp_ajax_nopriv_change_price_order', 'change_price_order' );
	function change_price_order(){
		$order_id = $_POST['order'];

		$order = wc_get_order($order_id);

		$curl = curl_init();

			curl_setopt_array($curl, array(
				CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRL",
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => "",
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 30,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => "GET", 
				CURLOPT_HTTPHEADER => array(
					"cache-control: no-cache",
					"content-type: application/json",
					"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
				),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
				echo "cURL Error #:" . $err;
			} else {
				$dados = array_values(json_decode($response, true)); 

				$valor_converter_cambio_comercial = $dados[0]["high"];
			}

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/oauth/token",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_POSTFIELDS => "{\n\t\"client_id\": \"105\",\n\t\"client_secret\": \"AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53\",\n\t\"grant_type\": \"client_credentials\"\n}",
			  CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
				"client_id: 105",
				"client_secret: AO6jnqgvEkwwEaajN7CaTRMmloW3O4YUEVOrEW53",
				"content-type: application/json",
				"grant_type: client_credentials",
				"postman-token: cefe5fcc-d209-3170-5b95-5f895ad044ed"
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			if ($err) {
			  echo "cURL Error #:" . $err;
			} else {
			  $dados_oauth = json_decode($response, true); 
			  $access_token = $dados_oauth["access_token"];
			} 

			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://app.parcelow.com/api/simulate?amount=1000",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "GET",
			  CURLOPT_HTTPHEADER => array(
				"amount: 100",
				"authorization: Bearer ".$access_token, 
				"content-type: application/json" 
			  ),
			));

			$response = curl_exec($curl);
			$err = curl_error($curl);

			curl_close($curl);

			$dados = json_decode($response, true); 


			$valor_converter_cambio_turismo = $dados["data"]["dolar"];

		// Loop through Order items ("line_item" type)
		foreach( $order->get_items() as $item_id => $item ){
			$product = $item->get_product();
			$post_id = $item->get_product_id(); 
			$product_price = (int) $product->get_price(); // A static replacement product price 

			$dolar_comercial = get_post_meta( $post_id, '_evisa', true);
			$dolar_turismo = get_post_meta( $post_id, '_ecred', true);  

			$new_product_price = $product_price; 

			$product_quantity = (int) $item->get_quantity(); // product Quantity

			if ($dolar_comercial == 'yes') {

				$valor_convertido = number_format(floatval($product_price)*floatval($valor_converter_cambio_comercial), 2, ".", "");

				$new_product_price = $valor_convertido;   
			}else if($dolar_turismo == 'yes'){

				$valor_convertido = number_format(floatval($product_price)*floatval($valor_converter_cambio_turismo), 2, ".", "");

				$new_product_price = $valor_convertido;   
			}else{

				$new_product_price = $product_price;   
			}

			// The new line item price
			$new_line_item_price = $new_product_price * $product_quantity; 

			// Set the new price
			$item->set_subtotal( $new_line_item_price ); 
			$item->set_total( $new_line_item_price );

			// Make new taxes calculations
			$item->calculate_taxes();

			$item->save(); // Save line item data
		}
		// Make the calculations  for the order and SAVE
		$order->calculate_totals();

		$mailer = WC()->mailer();
		$mails = $mailer->get_emails();
		if ( ! empty( $mails ) ) {                
			foreach ( $mails as $mail ) {
				if ( $mail->id == 'new_order' || $mail->id == 'customer_processing_order' ){
					$mail->trigger( $order_id );    
				}
			}            
		}
	}
}

add_action('admin_menu', 'addPluginAdminMenu');  
function addPluginAdminMenu() { 
	$validar = valida_serial();  
	
		add_menu_page(  'Câmbio', 'Câmbio', 'administrator', 'vouchertec-cambio', 'displayPluginAdminSettings', 'dashicons-chart-area', 26 );
	if($validar == "1"){
	add_submenu_page( 'vouchertec-cambio', 'Configuração', 'Configuração', 'administrator', 'vouchertec-cambio-settings', 'displayPluginAdminDashboard');
}
	
}

function displayPluginAdminDashboard() {
	require_once 'partials/vouchertec-cambio-admin-display.php';
}

function displayPluginAdminSettings() {
	require_once 'partials/vouchertec-cambio-admin-settings-display.php';
}
 

add_shortcode('vouchertec-cambio', 'dotiavatar_function');
function dotiavatar_function() {
	$tipo = get_option("type"); //0 = automática | 1 = manual
	$exibicao = get_option("exibition"); //0 = comercial e turismo | 1 = comercial | 2 = turismo
	
	if($tipo == 0){
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRL",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET", 
			CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
				"content-type: application/json",
				"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			$dados = array_values(json_decode($response, true)); 
 
			$valor_dolar_comercial = number_format($dados[0]["high"], 2, ".", ""); 
		}
		
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://economia.awesomeapi.com.br/last/USD-BRLT",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET", 
			CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
				"content-type: application/json",
				"postman-token: 8296d4a5-27c8-417d-0b20-8b36ced8c445"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			$dados = array_values(json_decode($response, true)); 
 
			$valor_dolar_turismo = number_format($dados[0]["high"], 2, ".", ""); 
		}
	}else{
		$valor_dolar_turismo = get_option("price_turismo");
		$valor_dolar_comercial = get_option("price_comercial");
	}
	
	$retorno = '';
	$retorno .= '<h2 style="font-size: 14px!important;color: #000000;margin: 0;">
                                    <b>CÂMBIO:</b> <small>'.date("d/m/Y").'</small>
                                </h2>';
	if($exibicao != 2){
                                $retorno .= '<h2 style="font-size: 13px!important;margin: 0;font-weight: 500;">Dólar comercial <small>'.$valor_dolar_comercial.'</small></h2>';
	}
	if($exibicao != 1){
                                $retorno .= '<h2 style="font-size: 13px!important;margin: 0;font-weight: 500;">Dólar turismo <small>'.$valor_dolar_turismo.'</small></h2>';
	}
     return $retorno;
}

// Add a Custom product Admin Field
add_action( 'woocommerce_product_options_general_product_data', 'add_custom_product_general_field' );
function add_custom_product_general_field() {
    echo '<div class="options_group">';
	
	woocommerce_wp_select(array(
		'id' => '_select_exchange',
		'label' => __('Moeda', 'woocommerce'),
		'desc_tip'      => 'true',
        'description'   => __('Informe a moeda que será utilizada para o produto', 'woocommerce'),
		'options' => array(
			'_selection' => 'Selecione...',
			'_evisa' => 'Dólar comercial',
			'_ecred' => 'Dólar turismo',
			'_ereal' => 'Real'
		),
	));

    echo '</div>';
}

add_action( 'woocommerce_process_product_meta', 'woo_add_custom_general_fields_save' );
function woo_add_custom_general_fields_save( $post_id ){

// Select
    $woocommerce_select = $_POST['_select_exchange'];
	update_post_meta( $post_id, '_select_exchange', esc_attr( $woocommerce_select ) );
	 
	switch($woocommerce_select){
		case '_selection':
			update_post_meta( $post_id, '_evisa', 'no' );
			update_post_meta( $post_id, '_ecred', 'no' );
			update_post_meta( $post_id, '_ereal', 'yes' ); 
			break;
		case '_evisa':
			update_post_meta( $post_id, '_evisa', 'yes' );
			update_post_meta( $post_id, '_ecred', 'no' );
			update_post_meta( $post_id, '_ereal', 'no' ); 
			break;
		case '_ecred':
			update_post_meta( $post_id, '_evisa', 'no' );
			update_post_meta( $post_id, '_ecred', 'yes' );
			update_post_meta( $post_id, '_ereal', 'no' ); 
			break;
		case '_ereal':
			update_post_meta( $post_id, '_evisa', 'no' );
			update_post_meta( $post_id, '_ecred', 'no' );
			update_post_meta( $post_id, '_ereal', 'yes' ); 
			break;
		default:
			update_post_meta( $post_id, '_evisa', 'no' );
			update_post_meta( $post_id, '_ecred', 'no' );
			update_post_meta( $post_id, '_ereal', 'yes' ); 
			break;
	}
	
}
?>
