<?php 
	session_start();
	
	$price = str_replace('&#36;', "", str_replace('<span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">', "", str_replace('</span>', "",  str_replace('</bdi>', "", str_replace("&#82;&#36;", "", $_POST['price']))))); 


	$produto = $_POST['produto'];

	if($produto == 'comercial'){
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
			echo $price;
		}
	}else if($produto == 'turismo'){
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
 
	  	echo $price;
	}else{
		echo 0;
	}

	$_SESSION['produto'] = $produto;
?>
