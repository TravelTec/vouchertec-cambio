<?php 

/*
 * Add my new menu to the Admin Control Panel
 */

// Hook the 'admin_menu' action hook, run the function named 'flg_Add_My_Admin_Link()'
add_action( 'admin_menu', 'flg_Add_My_Admin_Link' );
add_action( 'admin_menu', 'flg_Add_My_SubAdmin_Link' );
 
// Add a new top level menu link to the ACP
function flg_Add_My_Admin_Link(){ 
	$icon = base64_encode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 32.1"><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1" fill="#fff"><path d="M11.87,12.19l.24-5.86c-.67.13-1.34.26-2,.37l-1.29.21c-.25,0-.43.09-.42.4s-.08.32-.07.48c0,.33-.08.51-.47.51L7.66,7.13H7.21L7.14,7l.38-.36L7,5.7c.3-.21.49-.21.73.11.47.65.5.62,1.22.25l2.34-1.13a3.35,3.35,0,0,0,.3-.19L8.09.15c.21-.21.38-.19.62,0l4.6,3.43a1.38,1.38,0,0,0,1.33.18,7.29,7.29,0,0,1,3.08-.29,1.27,1.27,0,0,1,.27.11,4.09,4.09,0,0,1-1.45,1.15c-.65.32-1.35.57-2,.93-.2.11-.29.45-.36.71-.34,1.13-.65,2.28-1,3.41-.21.71-.45,1.42-.68,2.12C12.44,12.17,12.22,12.25,11.87,12.19Z"/><path d="M14.1,30.79a1.31,1.31,0,0,1-1.3,1.31h-.17q-.33,0-.66-.09c-.57-.1-1.15-.14-1.71-.29a13.9,13.9,0,0,1-7.54-5A10.72,10.72,0,0,1,1.1,23.87a21.8,21.8,0,0,1-.73-2.2C.19,20.94.15,20.19,0,19.44c0-.08,0-.16,0-.25v-.71a14.51,14.51,0,0,1,.2-1.63c.19-.84.42-1.67.68-2.49a11.31,11.31,0,0,1,1.58-3A14.1,14.1,0,0,1,5.69,8l.75-.52c.15-.09.32-.2.47.08l-.85.6a10.87,10.87,0,0,0-3.37,4,15.48,15.48,0,0,0-.87,2.42A11.35,11.35,0,0,0,1.51,19a11.72,11.72,0,0,0,.7,2.89A11.92,11.92,0,0,0,4.14,25.3a10.84,10.84,0,0,0,3.85,3,13,13,0,0,0,2.34.89,10.59,10.59,0,0,0,2.32.28h.29a1.29,1.29,0,0,1,1.1.9h0a.29.29,0,0,1,0,.09h0A.92.92,0,0,1,14.1,30.79Z"/><path d="M12.94,29.5h0Z"/><path d="M19.29,13.13c-.07.2-.11.39-.18.56s-.21.54-.32.81-.2.46-.3.69a.3.3,0,0,0,0,.16c.06.16.14.31.19.47s.23.26.4.32l.93.35c.23.09.46.18.68.29s.34.21.34.5c0,.47,0,.95,0,1.43a.44.44,0,0,1-.28.47c-.36.17-.72.33-1.09.48l-.74.29c-.17.06-.19.21-.25.33a1.11,1.11,0,0,0-.16.39.71.71,0,0,0,.08.31l.75,1.76a.27.27,0,0,1-.07.33L18,24.27a.32.32,0,0,1-.32.08c-.34-.11-.69-.22-1-.35s-.64-.27-1-.39a.51.51,0,0,0-.3,0,3.2,3.2,0,0,0-.43.17.38.38,0,0,0-.23.25c-.08.27-.19.52-.29.78s-.21.5-.32.75a3.54,3.54,0,0,1-.19.33.27.27,0,0,1-.26.15H12a.37.37,0,0,1-.34-.23c-.15-.31-.3-.63-.44-.95s-.25-.62-.39-.93a.29.29,0,0,0-.16-.12,3.89,3.89,0,0,0-.51-.21c-.17-.07-.31.05-.46.11-.34.13-.68.29-1,.43l-.58.23a.43.43,0,0,1-.49-.09q-.52-.54-1.08-1.05a.49.49,0,0,1-.13-.59c.24-.61.5-1.21.74-1.82a.23.23,0,0,0,0-.14,5.44,5.44,0,0,1-.22-.5c0-.17-.18-.21-.31-.26l-.91-.34L5,19.3a.79.79,0,0,1-.25-.15.45.45,0,0,1-.12-.25c0-.55,0-1.11,0-1.66A.29.29,0,0,1,4.76,17c.3-.15.59-.3.9-.43s.75-.29,1.11-.46c.09,0,.14-.19.19-.3s.11-.24.16-.37a.17.17,0,0,0,0-.12c-.18-.41-.38-.82-.56-1.23a6.92,6.92,0,0,1-.28-.76A.3.3,0,0,1,6.37,13l1.15-1.12a.43.43,0,0,1,.5-.1c.29.12.6.2.89.31s.63.27.95.4a.44.44,0,0,0,.25,0,5.55,5.55,0,0,0,.56-.24.24.24,0,0,0,.13-.13c.14-.33.25-.68.39-1s.28-.61.43-.91A.33.33,0,0,1,12,10h1.58a.42.42,0,0,1,.41.23c.16.32.32.65.46,1s.25.63.39.93c0,.08.18.12.28.17a2.5,2.5,0,0,0,.38.15.33.33,0,0,0,.22,0c.41-.16.81-.35,1.22-.51a6.06,6.06,0,0,1,.75-.27.36.36,0,0,1,.36.1l1.17,1.15A.91.91,0,0,1,19.29,13.13Zm-6.58,1.68a3,3,0,0,0-1.48.39,3.2,3.2,0,0,0-1.67,2.32,3.05,3.05,0,0,0,.49,2.26,3.22,3.22,0,0,0,2.18,1.41A3.27,3.27,0,0,0,16,18.52a3,3,0,0,0-.31-1.94,3.1,3.1,0,0,0-1.46-1.42A3.4,3.4,0,0,0,12.71,14.81Z"/></g></g></svg>');
	
    add_menu_page( 'Voucher Tec - Passagens Aéreas', 'Passagens Aéreas', 'manage_options', 'flg-first-acp-page', 'show_flg_page', 'data:image/svg+xml;base64,' .$icon );

}
function flg_Add_My_SubAdmin_Link(){ 
	add_submenu_page( 'flg-first-acp-page', 'Voucher Tec - Passagens Aéreas', 'Licença', 'manage_options', 'flg-license', 'show_flg_page_license' );

}

function show_flg_page() { require_once "flg-first-acp-page.php"; }
function show_flg_page_license() { require_once "flg-license.php"; }

function show_flg_shortcode() {
 

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

        if ($dados["background"] == 1) {
            $background = "background-image:url(".$dados["imagem"]."); background-repeat: no-repeat; background-position: center; background-attachment: ".$dados["posicao"].";";
        }else{
            $background = "background-color: ".$dados["cor"];
        }

    } 

            $output = '<div class="motor-section" style="'.$background.'">
		<style type="text/css">
		    

		.ocultarDisplay{
		    display: none;
		}



		ul:not(.browser-default) {
		    padding-left: 0;
		    list-style-type: none;
		}
		.listDropdown {
		    background-color: white;
		    top: 64px;
		    left: 15px;
		    right: 15px;
		    position: absolute;
		    border-bottom-right-radius: 5px;
		    border-bottom-left-radius: 5px;
		    z-index: 100;
		    max-height: 180px;
		    overflow-y: auto;
		}

		ul:not(.browser-default)>li {
		    list-style-type: none;
		}

		</style>
		<link rel="stylesheet" type="text/css" href="'.plugin_dir_url(__FILE__) .'assets/css/datepicker.min.css"> 
		<link rel="stylesheet" href="'.plugin_dir_url(__FILE__) .'assets/css/sweetalert.css">
		    <div class="overlay" style="background: none repeat scroll 0 0 transparent;">
		        <div class="container largura-motor">
		            <div class="row">   
		                <div class="col-md-12"> 
		                    <form action="" id="submit">
		                        <br>
		                        <h1 style="color:#fff;text-align: center;"></h1>  
		                        <div class="row justify-content-center" style="justify-content: center !important;display: flex;flex-wrap: wrap;"> 
		                            <div class="col-lg-9 col-sm-9 col-md-9 col-12 largura-motor">
		                                <ul class="nav nav-pills tab1" style="margin-bottom: -17px;">
		                                    <li class="active" style="margin-right: 2px;">
		                                        <a data-toggle="pill" href="#hot" style="color: #ffffff; padding: 10px 15px 10px 15px !important;" class="default-bg"><i class="fa fa-plane"></i><span> Passagens Aéreas</span></a>
		                                    </li>
		                                </ul>
		                                <div class="tab-content default-bg-rgba" style="color: #ffffff;">
		                                    <div id="hot" class="tab-pane active" style="padding: 22px;">
		                                        <div class="row">
		                                            <div class="col-lg-12 col-sm-12 col-xs-12">
		                                                <div class="row" style="margin-bottom:7px;">
		                                                    <div class="col-lg-7 col-sm-7 col-xs-12 textNone largura-motor">
		                                                        <h3 class="textNone textCenter2" style="color: #ffffff;margin: 0 !important;">Melhores preços para sua viagem</h3>
		                                                    </div>
		                                                    <div class="col-lg-5 col-sm-5 col-xs-12 pull-right largura-motor">
		                                                        <h2 class="textCenter" style="float: right;margin: 0 !important;">
		                                                            <input name="tipo_voo" type="radio" id="ida" value="2">
		                                                            <small style="font-size: 13px;color: #fff"> Só ida</small> 
		                                                            <input type="radio" name="tipo_voo" id="idavolta" value="1" checked="">
		                                                            <small style="font-size: 13px;color: #fff"> Ida e volta</small> 
		                                                            <input type="radio" name="tipo_voo" id="varios" value="3">
		                                                            <small style="font-size: 13px;color: #fff"> Vários destinos</small>
		                                                        </h2>
		                                                    </div>
		                                                </div> 
		                                                <div class="voos_destino_unico">
		                                                    <div class="row">
		                                                        <div class="col-lg-6 col-sm-6 col-xs-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe sua origem:</strong></label>
		                                                            <input type="hidden" name="iata_origem" id="iata_origem" value="SAO"> 
		                                                            <input type="text" name="origem" id="origem" autocomplete="off" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_unico_origem\',\'format_motor\')" style="" value="São Paulo, Brasil , Todos aeroportos(SAO)" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_unico_origem ocultarDisplay listDropdown"></ul> 
		                                                        </div>
		                                                        <div class="col-lg-6 col-sm-6 col-xs-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe seu destino:</strong></label>
		                                                            <input type="hidden" name="iata_destino" id="iata_destino"> 
		                                                            <input type="text" name="destino" id="destino" autocomplete="off" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_unico_destino\',\'format_motor\')" style="" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_unico_destino ocultarDisplay listDropdown"></ul>    
		                                                        </div>
		                                                    </div>
		                                                    <div class="row" style="padding-top: 4px;">
		                                                        <div id="partida" class="ocultarDisplay">
		                                                            <div class="col-lg-3 col-sm-3 col-12 inputSemTeclado largura-motor">
		                                                                <label style="display:block !important" ><strong>Partida:</strong></label>
		                                                                <div class="form-group">
		                                                                    <div class="input-group " id="datetimepickerPartida">
		                                                                        <input type="text" class="form-control date" id="data_partida" name="data_partida" placeholder="dd/mm/aaaa" autocomplete="off" readonly="" style="background-color: #fff;cursor: text">
		                                                                        <span class="input-group-addon" id="IconDate">
		                                                                            <span class="fa fa-calendar default" style="color: #7b345c;"></span>
		                                                                        </span>
		                                                                    </div>
		                                                                </div>
		                                                            </div>
		                                                            <div class="col-lg-3 col-sm-3 col-12 inputSemTeclado"></div>
		                                                        </div>

		                                                        <div id="partidaretorno">
		                                                            <div class="col-lg-3 col-sm-3 col-12 inputSemTeclado largura-motor">
		                                                                <label style="display:block !important" ><strong>Partida:</strong></label>
		                                                                <div class="form-group">
		                                                                    <div class="input-group " id="datetimepickerPartidaR">
		                                                                        <input type="text" class="form-control date" id="data_partida_retorno_ida" name="data_partida" placeholder="dd/mm/aaaa" autocomplete="off" readonly="" style="background-color: #fff;cursor: text">
		                                                                        <span class="input-group-addon" id="IconDate2">
		                                                                            <span class="fa fa-calendar default" style="color: #7b345c;"></span>
		                                                                        </span>
		                                                                    </div>
		                                                                </div>
		                                                            </div>
		                                                            <div class="col-lg-3 col-sm-3 col-12 inputSemTeclado largura-motor">
		                                                                
		                                                                <label style="display:block !important"  class="labelrtdate"><strong>Retorno:</strong></label>
		                                                                <div class="form-group labelrtdate">
		                                                                    <div class="input-group " id="datetimepickerRetorno">
		                                                                        <input type="text" class="form-control date" id="data_partida_retorno_volta" name="datadata_retorno_partida" placeholder="dd/mm/aaaa" autocomplete="off" readonly="" style="background-color: #fff;cursor: text">
		                                                                        <span class="input-group-addon" id="IconDate2R">
		                                                                            <span class="fa fa-calendar default" style=""></span>
		                                                                        </span>
		                                                                    </div>
		                                                                </div> 
		                                                            </div>
		                                                        </div>

		                                                        <div class="col-lg-2 col-sm-2 col-4 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important"  style="margin-bottom: 5px;"><strong>Adultos:</strong></label>
		                                                            <select id="adt_count" name="adt_count" class="form-control" style="margin-top: 0px;margin-bottom: 0px">
		                                                                <option value="1" selected="">1</option>
		                                                                <option value="2">2</option>
		                                                                <option value="3">3</option>
		                                                                <option value="4">4</option>
		                                                                <option value="5">5</option>
		                                                                <option value="6">6</option>
		                                                                <option value="7">7</option>
		                                                                <option value="8">8</option>
		                                                                <option value="9">9</option>
		                                                            </select>
		                                                        </div>
		                                                        <div class="col-lg-2 col-sm-2 col-4 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important"  style="margin-bottom: 5px;"><strong>Crianças:</strong></label>
		                                                            <select id="chd_count" name="chd_count" class="form-control" style="margin-top: 0px;margin-bottom: 0px">
		                                                                <option value="0" selected="">0</option>
		                                                                <option value="1">1</option>
		                                                                <option value="2">2</option>
		                                                                <option value="3">3</option>
		                                                                <option value="4">4</option>
		                                                            </select>
		                                                            <small style="font-size: 12px;"><strong>2 a 11 anos</strong></small>
		                                                        </div>
		                                                        <div class="col-lg-2 col-sm-2 col-4 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important"  style="margin-bottom: 5px;"><strong>Bebês:</strong></label>
		                                                            <select id="inf_count" name="inf_count" class="form-control" style="margin-top: 0px;margin-bottom: 0px">
		                                                                <option value="0" selected="">0</option>
		                                                                <option value="1">1</option>
		                                                                <option value="2">2</option>
		                                                                <option value="3">3</option>
		                                                                <option value="4">4</option>
		                                                            </select>
		                                                            <small style="font-size: 12px;"><strong>0 a 23 meses</strong></small>
		                                                        </div>
		                                                    </div>
		                                                    <div class="row" style="padding-top: 4px;">
		                                                        <div class="col-lg-3 col-sm-3 col-4 inputSemTeclado largura-motor" id="div_classe">
		                                                            <label style="display:block !important" ><strong>Classe:</strong></label>
		                                                            <select id="classe_voo_pesquisa" name="classe" class="form-control" style="margin-top: 0px;margin-bottom: 0px">
		                                                                <option value="0" selected="">Econômica</option>
		                                                                <option value="1">Econômica Premium</option>
		                                                                <option value="2">Executiva</option>
		                                                                <option value="3">Primeira Classe</option>
		                                                            </select>
		                                                        </div>
		                                                        <div class="col-lg-9 col-sm-9 col-12 inputSemTeclado buttons largura-motor">
		                                                            <br> 
		                                                                <button class="btn btn-primary btnPesquisar btn-pesquisa-aereo default-button" style="float: right;font-size: 18px"><i class="fa fa-search"></i> Pesquisar</button> 
		                                                        </div>
		                                                    </div>
		                                                </div>

		                                                <div class="voos_multi_destinos ocultarDisplay" style="margin-top: 6px;">
		                                                    <div class="row multi-item multi-line-one">
		                                                        <div class="col-lg-1 col-1 number_phone largura-motor" style="max-width: 33px; vertical-align: middle; position: relative; margin-top: 36px;">
		                                                            <h4 style="color: #ffffff;margin: 0 !important;">1</h4>
		                                                        </div>
		                                                        <div class="col-lg-4 col-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe sua origem:</strong></label>
		                                                            <input type="hidden" name="" id="iata_origem_multidestino1" value="SAO"> 
		                                                            <input type="text" name="" id="origem_multidestino1" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_varios_one_origem\',\'format_motor\')" style="" autocomplete="off" value="São Paulo, Brasil , Todos aeroportos(SAO)" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_varios_one_origem ocultarDisplay listDropdown multi"></ul>
		                                                        </div>
		                                                        <div class="col-lg-1 ocultarExibicao seta largura-motor" style="max-width: 20px; vertical-align: middle; position: relative; margin-top: 40px; padding-left: 0px; padding-right: 0;">
		                                                            <h4 style="font-size: 20px;color: #ffffff;margin: 0 !important;"><i class="fa fa-arrow-right"></i></h4>
		                                                        </div>
		                                                        <div class="col-lg-4 col-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe seu destino:</strong></label>
		                                                            <input type="hidden" name="" id="iata_destino_multidestino1"> 
		                                                            <input type="text" name="" id="destino_multidestino1" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_varios_one_destino\',\'format_motor\')" style="" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_varios_one_destino ocultarDisplay listDropdown multi"></ul>
		                                                        </div>
		                                                        <div class="col-lg-3 col-12 largura-motor inputSemTeclado">
		                                                            <label style="display:block !important" ><strong>Data de ida:</strong></label>
		                                                            <div class="form-group">
		                                                                <div class="input-group " id="datetimepickerPartida1">
		                                                                    <input type="text" class="form-control" id="dpdate_multidestino1" placeholder="dd/mm/aaaa" autocomplete="off" readonly="" style="background-color: #fff;cursor: text">
		                                                                        <span class="input-group-addon" id="IconDate3">
		                                                                        <span class="fa fa-calendar default" style="color: #7b345c;"></span>
		                                                                    </span>
		                                                                </div>
		                                                            </div>
		                                                        </div>
		                                                    </div>
		                                                    <div class="row multi-item multi-line-two">
		                                                        <div class="col-lg-1 col-12 number_phone" style="max-width: 33px; vertical-align: middle; position: relative; margin-top: 36px;">
		                                                            <h4 style="color: #ffffff;margin: 0 !important;">2</h4>
		                                                        </div>
		                                                        <div class="col-lg-4 col-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe sua origem:</strong></label>
		                                                            <input type="hidden" name="" id="iata_origem_multidestino2" value=""> 
		                                                            <input type="text" name="" id="origem_multidestino2" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_varios_two_origem\',\'format_motor\')" style="" autocomplete="off" value="" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_varios_two_origem ocultarDisplay listDropdown multi"></ul>
		                                                        </div>
		                                                        <div class="col-lg-1 ocultarExibicao  seta largura-motor" style="max-width: 20px; vertical-align: middle; position: relative; margin-top: 40px; padding-left: 0px; padding-right: 0;">
		                                                            <h4 style="font-size: 20px;color: #ffffff;margin: 0 !important;"><i class="fa fa-arrow-right"></i></h4>
		                                                        </div>
		                                                        <div class="col-lg-4 col-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe seu destino:</strong></label>
		                                                            <input type="hidden" name="" id="iata_destino_multidestino2"> 
		                                                            <input type="text" name="" id="destino_multidestino2" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_varios_two_destino\',\'format_motor\')" style="" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_varios_two_destino ocultarDisplay listDropdown multi"></ul>
		                                                        </div>
		                                                        <div class="col-lg-3 col-12 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important" ><strong>Data de ida:</strong></label>
		                                                            <div class="form-group">
		                                                                <div class="input-group " id="datetimepickerPartida2">
		                                                                    <input type="text" class="form-control" id="dpdate_multidestino2" placeholder="dd/mm/aaaa" autocomplete="off" readonly="" style="background-color: #fff;cursor: text">
		                                                                        <span class="input-group-addon" id="IconDate3R">
		                                                                        <span class="fa fa-calendar default" style="color: #7b345c;"></span>
		                                                                    </span>
		                                                                </div>
		                                                            </div>
		                                                        </div>
		                                                    </div>
		                                                    <div class="row multi-item multi-line-three ocultarDisplay" id="multi_destino_linha3" style="">
		                                                        <div class="col-lg-1 col-12 number_phone largura-motor" style="max-width: 33px; vertical-align: middle; position: relative; margin-top: 36px;">
		                                                            <h4 style="color: #ffffff;margin: 0 !important;">3</h4>
		                                                        </div>
		                                                        <div class="col-lg-4 col-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe sua origem:</strong></label>
		                                                            <input type="hidden" name="" id="iata_origem_multidestino3" value=""> 
		                                                            <input type="text" name="" id="origem_multidestino3" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_varios_three_origem\',\'format_motor\')" style="" autocomplete="off" value="" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_varios_three_origem ocultarDisplay listDropdown multi"></ul>
		                                                        </div>
		                                                        <div class="col-lg-1 ocultarExibicao seta largura-motor" style="max-width: 20px; vertical-align: middle; position: relative; margin-top: 40px; padding-left: 0px; padding-right: 0;">
		                                                            <h4 style="font-size: 20px;color: #ffffff;margin: 0 !important;"><i class="fa fa-arrow-right"></i></h4>
		                                                        </div>
		                                                        <div class="col-lg-4 col-12 largura-motor">
		                                                            <label style="display:block !important" ><strong>Informe seu destino:</strong></label>
		                                                            <input type="hidden" name="" id="iata_destino_multidestino3"> 
		                                                            <input type="text" name="" id="destino_multidestino3" class="form-control" placeholder="Informe a cidade ou aeroporto" onkeyup="autocompleteAirports(this.id,\'voos_destino_varios_three_destino\',\'format_motor\')" style="" onclick="this.value=\'\'">
		                                                            <ul class="voos_destino_varios_three_destino ocultarDisplay listDropdown multi"></ul>
		                                                        </div>
		                                                        <div class="col-lg-3 col-xs-12 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important" ><strong>Data de ida:</strong></label>
		                                                            <div class="form-group">
		                                                                <div class="input-group " id="datetimepickerPartida3">
		                                                                    <input type="text" class="form-control" id="dpdate_multidestino3" placeholder="dd/mm/aaaa" autocomplete="off" readonly="" style="background-color: #fff;cursor: text">
		                                                                        <span class="input-group-addon" id="IconDate3R2">
		                                                                        <span class="fa fa-calendar default" style="color: #7b345c;"></span>
		                                                                    </span>
		                                                                </div>
		                                                            </div>
		                                                        </div>
		                                                        <div class="col-lg-1 col-1 close multi-item-close largura-motor" style="max-width: 10px; vertical-align: middle; position: relative; margin-top: 36px; padding-left: 0px; padding-right: 0;">
		                                                            <h4 style="font-size: 14px;font-weight: 600;color: #fff;margin: 0 !important;">X</h4>
		                                                        </div>
		                                                    </div>
		                                                    <div class="row" id="   ">
		                                                        <div class="col-lg-12 col-12 largura-motor" style="margin-top: 12px; margin-bottom: 12px;">
		                                                            <button class="btn btn-info plusButton" id="plusButton" style="background-color: transparent; border-color: #fff; padding-top: 0;">
		                                                                <span style="font-size: 21px; position: relative; margin-right: 7px;">+</span> Adicionar destino
		                                                            </button>
		                                                        </div>
		                                                    </div>
		                                                    <div class="row" style="padding-top: 4px;">
		                                                        <div class="col-lg-2 col-sm-2 col-4 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important" ><strong>Adultos:</strong></label>
		                                                            <select id="qtd_adultos_multi" class="form-control" style="margin-top: 0px">
		                                                                <option value="1" selected="">1</option>
		                                                                <option value="2">2</option>
		                                                                <option value="3">3</option>
		                                                                <option value="4">4</option>
		                                                                <option value="5">5</option>
		                                                                <option value="6">6</option>
		                                                                <option value="7">7</option>
		                                                                <option value="8">8</option>
		                                                                <option value="9">9</option>
		                                                            </select>
		                                                        </div>
		                                                        <div class="col-lg-2 col-sm-2 col-4 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important" ><strong>Crianças:</strong></label>
		                                                            <select id="qtd_criancas_multi" class="form-control" style="margin-top: 0px">
		                                                                <option value="0" selected="">0</option>
		                                                                <option value="1">1</option>
		                                                                <option value="2">2</option>
		                                                                <option value="3">3</option>
		                                                                <option value="4">4</option>
		                                                            </select>
		                                                            <small style="font-size: 12px;"><strong>2 a 11 anos</strong></small>
		                                                        </div>
		                                                        <div class="col-lg-2 col-sm-2 col-4 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important" ><strong>Bebês:</strong></label>
		                                                            <select id="qtd_bebes_multi" class="form-control" style="margin-top: 0px">
		                                                                <option value="0" selected="">0</option>
		                                                                <option value="1">1</option>
		                                                                <option value="2">2</option>
		                                                                <option value="3">3</option>
		                                                                <option value="4">4</option>
		                                                            </select>
		                                                            <small style="font-size: 12px;"><strong>0 a 23 meses</strong></small>
		                                                        </div>
		                                                        <div class="col-lg-3 col-sm-3 col-4 inputSemTeclado largura-motor">
		                                                            <label style="display:block !important" ><strong>Classe:</strong></label>
		                                                            <select id="class_voo_multi" class="form-control" style="margin-top: 0px">
		                                                                <option value="0" selected="">Econômica</option>
		                                                                <option value="1">Econômica Premium</option>
		                                                                <option value="2">Executiva</option>
		                                                                <option value="3">Primeira Classe</option>
		                                                            </select>
		                                                        </div>
		                                                        <div class="col-lg-3 col-sm-9 col-12 inputSemTeclado largura-motor">
		                                                            <br>
		                                                            <a onclick="buscar_resultados_voo()">
		                                                                <button class="btn btn-primary btnPesquisar btn-pesquisa-aereo default-button" style="float: right;font-size: 18px"><i class="fa fa-search"></i> Pesquisar</button>
		                                                            </a>
		                                                        </div>
		                                                    </div>
		                                                </div> 
		                                                <br>
		                                            </div>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div> 
		                        </div>
		                        <br>
		                        <br>
		                    </form>

		                </div>  
		<br>
		            </div>          
		        
		        </div>
		            
		    </div>  
		</div> 
		<input type="hidden" id="url_redirect" name="" value="'.$dados["url_sistema"].'">

		<script src="'.plugin_dir_url(__FILE__) .'assets/js/jquery-3.1.1.min.js"></script> 
		<script src="'.plugin_dir_url(__FILE__) .'assets/js/datepicker.min.js"></script>
		<script src="'.plugin_dir_url(__FILE__) .'assets/js/datepicker.pt-br.js"></script>
		<script src="'.plugin_dir_url(__FILE__) .'assets/js/moment.js"></script>
		<script src="'.plugin_dir_url(__FILE__) .'assets/js/jquery.mask.js"></script> 
		<script src="'.plugin_dir_url(__FILE__) .'assets/controllers/get-airports.js"></script>
		<script src="'.plugin_dir_url(__FILE__) .'assets/controllers/helpers.js"></script>
		<script src="'.plugin_dir_url(__FILE__) .'assets/controllers/select-airports.js"></script>
		<script src="'.plugin_dir_url(__FILE__) .'assets/search-submit.js"></script>
		<script src="'.plugin_dir_url(__FILE__) .'assets/js/sweetalert.js"></script>

		<script type="text/javascript">
		    $("document").ready(function() { 

		        checarAutorizacaoAero();  
		        homeAtivadores();

		        $("#btn1").on("click", function () {
		            progress(20, $(\'#progressBar\'));
		        });

		        $(\'#ida\').click(function () {
		            $(".search img").removeClass("expand_multi")
		            $(".voos_destino_unico").removeClass("ocultarDisplay");
		            $(".voos_multi_destinos").addClass("ocultarDisplay");
		            $("#partidaretorno").addClass("ocultarDisplay");
		            $("#partida").removeClass("ocultarDisplay");
		        });
		        $("#idavolta").click(function () {
		            $(".search img").removeClass("expand_multi")
		            $("#partida").addClass("ocultarDisplay");
		            $(".voos_multi_destinos").addClass("ocultarDisplay");
		            $("#partidaretorno").removeClass("ocultarDisplay");
		            $(".voos_destino_unico").removeClass("ocultarDisplay");
		        });
		        $("#varios").click(function () {
		            $(".search img").addClass("expand_multi")
		            $(".voos_destino_unico").addClass("ocultarDisplay");
		            $(".voos_multi_destinos").removeClass("ocultarDisplay");
		        });
		        $("#plusButton").click(function () {
		            $(".multi-line-three").removeClass("ocultarDisplay");
		            $("#plusButton").addClass("ocultarDisplay");
		        });
		        $(".multi-item-close").click(function () {
		            $(".multi-line-three").addClass("ocultarDisplay");
		            $("#plusButton").removeClass("ocultarDisplay");
		        });
		        $(\'form#submit\').submit(function (e) {
		            e.preventDefault()
		            submitSearch();
		            return true;
		        });
		    }); 

		    function checarAutorizacaoAero() { 

		            var settings = {
		                async: true,
		                crossDomain: true,
		                url: "https://api.traveltec.com.br/serv/aereo/aeroportos",
		                method: "GET",
		                headers: {
		                    authorization: "Bearer token",
		                    "content-type": "application/json",
		                    accept: "application/json",
		                },
		            };

		            $.ajax(settings).done(function (response) {
		                //converte a resposta da requisiÃ§Ã£o para uma string vÃ¡lida do javascript
		                //em seguida, chama a funÃ§Ã£o parse que converte em um array possÃ­vel de manipulaÃ§Ã£o
		                var resposta = JSON.parse(JSON.stringify({ response }));

		                //se o status da resposta for OK a resposta retorna: lista de aeroportos
		                //se nÃ£o, a resposta retorna: token invÃ¡lido, cliente nÃ£o autorizado
		                if (resposta.response.status === 200) {
		                    //armazena no navegador - localStorage - a listagem de aeroportos
		                    localStorage.setItem("TRAVELTEC_AIRPORTS", JSON.stringify(resposta["response"]["message"]));
		                } else {
		                    //printa na tela - TESTE - a resposta de nÃ£o autorizado
		                    $("#mensagem_api").html(resposta.response.message);
		                }
		            }); 
		    }


		function homeAtivadores() {

		  $(".date").mask("00/00/0000")

		  // DATEPPICKER PARTIDA - DESTINO UNICO - SO IDA
		  $("#datetimepickerPartida input").datepicker({
		    language: \'pt-BR\',
		    autoClose: true,
		    minDate: new Date(),
		  });


		  // DATEPPICKER PARTIDA - DESTINO UNICO - SO IDA E VOLTA
		  $("#datetimepickerPartidaR input")
		    .datepicker({
		      language: \'pt-BR\',
		      autoClose: true,
		      minDate: new Date(),
		      onSelect: function (fd, d, picker) {
		        var retorno = $("#datetimepickerRetorno input").val()
		        $(\'#datetimepickerRetorno input\').datepicker().data(\'datepicker\').update(\'minDate\', d)
		        if (retorno !== "") {
		          var timeLeft = moment(retorno, \'DD/MM/YYYY\').diff(moment(fd, \'DD/MM/YYYY\'), \'days\')
		          if (timeLeft < 0) {
		            $(\'#datetimepickerRetorno input\').val(\'\')
		          }
		        }

		      }
		    });

		  $("#datetimepickerRetorno input")
		    .datepicker({
		      language: \'pt-BR\',
		      minDate: new Date(),
		      autoClose: true,
		    });


		  // DATEPPICKER PARTIDA 1 - VARIOS DESTINOS
		  $("#datetimepickerPartida1 input")
		    .datepicker({
		      language: \'pt-BR\',
		      minDate: new Date(),
		      autoClose: true,
		      onSelect: function (fd, d, picker) {
		        var retorno = $("#datetimepickerPartida2 input").val()
		        $(\'#datetimepickerPartida2 input\').datepicker().data(\'datepicker\').update(\'minDate\', d)
		        if (retorno !== "") {
		          var timeLeft = moment(retorno, \'DD/MM/YYYY\').diff(moment(fd, \'DD/MM/YYYY\'), \'days\')
		          if (timeLeft < 0) {
		            $(\'#datetimepickerPartida2 input\').val(\'\')
		          }
		        }
		      }
		    });

		  $("#datetimepickerPartida2 input")
		    .datepicker({
		      language: \'pt-BR\',
		      autoClose: true,
		      minDate: new Date(),
		      onSelect: function (fd, d, picker) {
		        var retorno = $("#datetimepickerPartida3 input").val()
		        $(\'#datetimepickerPartida3 input\').datepicker().data(\'datepicker\').update(\'minDate\', d)
		        if (retorno !== "") {
		          var timeLeft = moment(retorno, \'DD/MM/YYYY\').diff(moment(fd, \'DD/MM/YYYY\'), \'days\')
		          if (timeLeft < 0) {
		            $(\'#datetimepickerPartida3 input\').val(\'\')
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
		      language: \'pt-BR\',
		      minDate: new Date(),
		      autoClose: true,
		    });
		}
		        
		</script>';

return $output;
} 

add_shortcode('FLG_SEARCH_FLIGHTS_CODE', 'show_flg_shortcode'); 
