<?php
/**
 * @package Boiler-capacity
 */
/*
Plugin Name: Boiler-capacity
Plugin URI: http://altep.ua/
Description:
Version: 1.0
Author: Automattic
Author URI: http://altep.ua/
License:
Text Domain: Boiler-capacity
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Copyright 2005-2015 Automattic, Inc.
*/

// Make sure we don't expose any info if called directly
// if ( !function_exists( 'add_action' ) ) {
// 	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
// 	exit;
// }
//
// define( 'AKISMET_VERSION', '3.1.10' );
// define( 'AKISMET__MINIMUM_WP_VERSION', '3.2' );
// define( 'AKISMET__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
// define( 'AKISMET_DELETE_LIMIT', 100000 );
//
// register_activation_hook( __FILE__, array( 'Akismet', 'plugin_activation' ) );
// register_deactivation_hook( __FILE__, array( 'Akismet', 'plugin_deactivation' ) );
//
// require_once( AKISMET__PLUGIN_DIR . 'class.akismet.php' );
// require_once( AKISMET__PLUGIN_DIR . 'class.akismet-widget.php' );
//
// add_action( 'init', array( 'Akismet', 'init' ) );
//
// if ( is_admin() ) {
// 	require_once( AKISMET__PLUGIN_DIR . 'class.akismet-admin.php' );
// 	add_action( 'init', array( 'Akismet_Admin', 'init' ) );
// }
//
// //add wrapper class around deprecated akismet functions that are referenced elsewhere
// require_once( AKISMET__PLUGIN_DIR . 'wrapper.php' );
// function bc_run() {
// 	require 'somefile.php';
// 	$test_url = '/2016/06/14/hello-world/';
// 	$real_url = $_SERVER['REQUEST_URI'];
// 	// echo("<script>console.log('PHP: ".$real_url."'); alert('hello')</script>");
// 	if ($test_url === $real_url){
// 		echo("<script>console.log('PHP: ".$data."'); alert('hello')</script>");
// 	}
// }
//
// add_action('init', 'bc_run');
// add_action( 'wp_enqueue_scripts', 'true_include_myscript' );
// function true_include_myscript() {
//  	wp_enqueue_script( 'myscript', get_stylesheet_directory_uri() . '/script.js', '', '3.0', false );
// }


add_action( 'init', 'true_include_myscript' );
function true_include_myscript() {
	$work_url = '/test/';
	$real_url = $_SERVER['REQUEST_URI'];
	if ($work_url === $real_url) {
	 	wp_enqueue_script( 'myscript', '/wp-content/plugins/boiler-capacity/script.js', '', '3.0', true );
	}
}


// add_action("wp_head", "wp_head_meta_description", 1);
//
// function wp_head_meta_description() {
// 	global $post;
// 	if( is_single() ) {
// 		echo "<meta name=\"descriptions\" value=\"" . esc_attr( get_post_meta( $post->ID, 'seo_description', true ) ) ."\" />\n\r";
// 	}
// }
