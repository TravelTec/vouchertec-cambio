<?php  

/*

Plugin Name: Voucher Tec - Passagens aéreas

Plugin URI: https://github.com/TravelTec/flights_plugin

GitHub Plugin URI: https://github.com/TravelTec/flights_plugin

Description: Voucher Tec - Passagens aéreas é um plugin que disponibiliza um motor de reservas para o consumidor final efetuar pesquisas de passagens aéreas nacionais e internacionais, diretamente no site.

Version: 1.0.1

Author: Travel Tec

Author URI: https://traveltec.com.br

License: GPLv2

*/



/*

 * Plugin Update Checker

 * 

 * Note: If you're using the Composer autoloader, you don't need to explicitly require the library.

 * @link https://github.com/YahnisElsts/plugin-update-checker

 */

require_once 'plugin-update-checker-4.10/plugin-update-checker.php';

require_once plugin_dir_path(__FILE__) . 'includes/flg-functions.php';





/*

 * Plugin Update Checker Setting

 *

 * @see https://github.com/YahnisElsts/plugin-update-checker for more details.

 */

function flights_update_checker_setting() {

    if ( ! is_admin() || ! class_exists( 'Puc_v4_Factory' ) ) { 
        return; 
    } 

    $myUpdateChecker = Puc_v4_Factory::buildUpdateChecker( 
        'https://github.com/TravelTec/flights_plugin', 
        __FILE__, 
        'flights_plugin' 
    ); 

    // (Opcional) Set the branch that contains the stable release. 
    $myUpdateChecker->setBranch('main');

}



add_action( 'admin_init', 'flights_update_checker_setting' );



 