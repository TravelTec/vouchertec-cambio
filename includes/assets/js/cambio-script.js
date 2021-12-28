jQuery(document).ready(function(){  
	
    jQuery("#billing_company_field .optional").html('<abbr class="required" title="obrigatório">*</abbr>');  

    add_value_cambio(); 

});

window.setInterval(function(){ 
	if(localStorage.getItem("TIPO_PRODUTO") == 'comercial' || localStorage.getItem("TIPO_PRODUTO") == 'turismo'){
		jQuery(".woocommerce-Price-currencySymbol").html("R$ ");
		jQuery(".cart-subtotal .woocommerce-Price-currencySymbol").html("R$ ");
		jQuery(".order-total .woocommerce-Price-currencySymbol").html("R$ "); 
		jQuery(".product-total .woocommerce-Price-currencySymbol").html("R$ "); 
		jQuery(".woocommerce-shipping-methods .woocommerce-Price-currencySymbol").html("R$ "); 
		jQuery(".woocommerce-order-overview__total .woocommerce-Price-currencySymbol").html("R$ "); 
		jQuery(".order_details .woocommerce-Price-currencySymbol").html("R$ "); 
		jQuery(".cart-discount .woocommerce-Price-currencySymbol").html("R$ "); 
		jQuery(".wl-ci-product-price .woocommerce-Price-currencySymbol").html("R$ ");
		jQuery("th.product-price").html("R$ "); 
	}
}, 1000);

var url_atual = window.location.href;  
 

function dataFormatada() {
  var data = new Date(),
    dia = data.getDate(),
    mes = data.getMonth() + 1,
    ano = data.getFullYear();
  return [dia, mes, ano].join('/');
}

function getSearchParams(k){
 var p={};
 location.search.replace("&amp;", "&").replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
 return k?p[k]:p;
}
if(getSearchParams("wcf-key") && getSearchParams("change") !== "true"){
	jQuery(".elementor-element-6c63b73 .elementor-column-gap-wide").html('<h3 style="text-align:center;width:100%;">Aguarde, informações atualizadas estão sendo carregadas... <img src="https://media.tenor.com/images/a742721ea2075bc3956a2ff62c9bfeef/tenor.gif" style="height: 27px;"></h3>')
	change_price_order(getSearchParams("wcf-order"));
}

function change_price_order(order){
	jQuery.ajax({
        type: "POST",
        url: wp_ajax_cambio.ajaxurl,
        data: { action: "change_price_order", order:order },
        success: function( data ) {
            var url_atual = window.location.href.replace("&amp;", "&")+'&change=true'; 
			
			window.location.href = url_atual;
        }
    });
}

function add_value_cambio(){ 
    var data_atual = dataFormatada();
    
    jQuery.ajax({
        type: "POST",
        url: "/wp-content/plugins/voucher-cambio/includes/ajax-valor.php",  
        success: function(response){   
			console.log(response);
			var dados = response.split("++++");
			var valor = dados[0];
			var produto = dados[1];
            if(produto == 'comercial' || produto == 'turismo'){
				localStorage.setItem("TIPO_PRODUTO", produto); 
				
				jQuery(".woocommerce-Price-currencySymbol").html("R$ ");
				jQuery(".cart-subtotal .woocommerce-Price-currencySymbol").html("R$ ");
				jQuery(".order-total .woocommerce-Price-currencySymbol").html("R$ "); 
				jQuery(".product-total .woocommerce-Price-currencySymbol").html("R$ "); 
				jQuery(".woocommerce-shipping-methods .woocommerce-Price-currencySymbol").html("R$ "); 
				jQuery(".woocommerce-order-overview__total .woocommerce-Price-currencySymbol").html("R$ "); 
				jQuery(".order_details .woocommerce-Price-currencySymbol").html("R$ "); 
				jQuery(".cart-discount .woocommerce-Price-currencySymbol").html("R$ "); 
				jQuery(".wl-ci-product-price .woocommerce-Price-currencySymbol").html("R$ ");
				jQuery("th.product-price").html("R$ "); 
			}
		}
	})
}
