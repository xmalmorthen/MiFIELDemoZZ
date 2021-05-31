<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class Override {

    public function output($params = NULL)
    {   
        $CI =& get_instance();
        $out = $CI->output->get_output();

        $cnfg = (object)json_decode(CNFG);

        $superMainModel = [
            "title" => $cnfg->general->title,
            "css"   => '',
            "body"  => $out,
            "js"    => ''
        ];        

        if ($CI->session->flashdata('noLayout') === TRUE){
            $CI->session->set_flashdata('noLayout',FALSE);
            echo $out;
        } else {                        
            echo $CI->load->view('shared/masterPage',$superMainModel,TRUE);
        }

        return;
    }
}