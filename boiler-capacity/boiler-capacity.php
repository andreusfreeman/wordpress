<?php
/**
 * @package Boiler-capacity
 */
/*
Plugin Name: Boiler-capacity
Plugin URI: http://altep.ua/
Description:
Version: 1.0
Author: Automatic
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

add_action( 'init', 'true_include_myscript' );
function true_include_myscript() {
	$work_url = '/test/';
	$real_url = $_SERVER['REQUEST_URI'];
	if ($work_url === $real_url) {
	 	wp_enqueue_script( 'myscript', '/wp-content/plugins/boiler-capacity/script.js', '', '3.0', true );
		wp_enqueue_style( 'mystyle', '/wp-content/plugins/boiler-capacity/styles/style.css', '', '3.0', true );
	}
}
