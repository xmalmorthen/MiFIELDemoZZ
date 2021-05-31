<?php defined('BASEPATH') OR defined('INICONFIGFILE') OR  exit('No direct script access allowed');

class rulesException extends Exception {};
class processException extends Exception {};


class Utils {
    public function __construct() {}

    public static function parseDateMMDDYYYY($date){        
        $var = str_replace('/', '-', $date);
        return date("m/d/Y", strtotime($var));
    }

    public static function crypt($cad){
        $CI = & get_instance();
        $CI->load->library('encrypt');
		return base64_encode($CI->encrypt->encode($cad));
	}

	public static function deCrypt($cad){
        $CI = & get_instance();
        $CI->load->library('encrypt');
		return $CI->encrypt->decode(base64_decode($cad));
    }

	public static function pre($array,$exit = true){
        echo '<pre>';
        print_r($array);
        echo '</pre>';
        if($exit){
            exit();
        }
    }

    public static function isJSON($string){
        return is_string($string) && is_array(json_decode($string, true)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
    }

    public static function addPath($path,$string){
        $jsonDecode = json_decode($string);
        $jsonDecode->name = base_url(trim($path.$jsonDecode->name,'./'));
        return $jsonDecode;
    }

    
    
}
