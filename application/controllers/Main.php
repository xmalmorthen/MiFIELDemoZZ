<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
	function __construct() {
		parent::__construct();	
		$this->load->library('MiFIELLib');
	}
	
	public function index()
	{
		$tab = $this->input->get('tb') ? base64_decode( $this->input->get('tb') ) : 'createDoc';
		$this->session->set_flashdata('tab', $tab);
		$this->load->view('main',['documentos' => $this->mifiellib->documents()]);
		
	}

	public function documentDetail($id){

		$goto = $this->input->get('gt') ? base64_decode( $this->input->get('gt') ) : 'main';
		$tab = $this->input->get('tb') ? $this->input->get('tb') : base64_encode( 'createDoc' );

		$this->session->set_flashdata('goto', $goto);
		$this->session->set_flashdata('tab', $tab);
		$this->load->view('/document/detail', ['documento' => $this->mifiellib->document($id)] );
	}

	public function postFiles(){

		$filesPath = STATIC_DOCUMMENTS_PATH . 'original';

		$config['upload_path'] = $filesPath;
        $config['allowed_types'] = 'pdf';
        $config['max_size'] = 4096;
        $config['max_width'] = 0;
        $config['max_height'] = 0;
		$config['encrypt_name'] = TRUE;
		
		$this->load->library('upload', $config);
		
		$file = [];		
		$responseModel = [];
		if ( !$this->upload->do_upload('file'))
		{
			$responseModel['status'] = 0;
			$responseModel['message'] = $this->upload->display_errors('','');
		} else {
			$fileInfo = $this->upload->data();
			$data = array(
				"originalName" => $_FILES['file']['name'],
				"name" => $fileInfo['file_name'], 
			);
			array_push($file,$data);

			$responseModel['status'] = 1;
			$responseModel['message'] = 'success';
			$responseModel['data'] = [
				'full_path' => base64_encode ($fileInfo['full_path']),
				'url_path' => base64_encode ( site_url( substr($filesPath,1) . '/' . $fileInfo['file_name']) ),
				'file_info' => [
					'name' => base64_encode ($fileInfo['orig_name']),
					'crypName' => base64_encode ($fileInfo['file_name']),
					'size' => base64_encode ($fileInfo['file_size'])
				] 
			];
			
		}

		header('Content-type: application/json');
        echo json_encode( $responseModel );
        exit;
	}

	public function ajaxCreateDocument(){

		$responseModel = null;
		try {

			if (!$this->input->post() && !$this->input->is_ajax_request())
				throw new rulesException('Petición inválida');

			$dataPOST = $this->input->post('data');

			$modelSignature = [
				'file_path' => base64_decode($dataPOST['fileInfoGlobalData']['full_path']),
				'signatories' => $dataPOST['signers'],
				'external_id' => $dataPOST['fileInfoGlobalData']['file_info']['name'],
				// 'callback_url' => null,
				'send_invites' => 0,
				'send_mail' => 0,
				// 'remind_every' => null,
				// 'message_for_signers' => null,
			];

			if ($dataPOST['days_to_expire'])
				$modelSignature['days_to_expire'] = $dataPOST['days_to_expire'];
					
			$documentId = $this->mifiellib->createDocument($modelSignature);
			
			$responseModel = $this->__ajaxReturnResponse(1,200,"Proceso realizado con éxito",['documentId' => $documentId]);

		} catch (rulesException $e){
			$responseModel = $this->__ajaxReturnResponse(0,400,$e->getMessage());
		} catch (Exception $e) {
			$responseModel = $this->__ajaxReturnResponse(0,500,$e->getMessage());
		}

		echo $responseModel;
		exit;

	}

	public function ajaxDocumentDetail($documentId){
		echo $this->__ajaxReturnResponse(1,200,"Proceso realizado con éxito",$this->mifiellib->document($documentId));
		exit;
	}

	private function __ajaxReturnResponse($status, $statusCode, $message, $model = null){
		header("HTTP/1.0 " . $statusCode . " " . utf8_decode($message));
		$responseModel = [ 'status' => $status, 'statusCode' => $statusCode, 'message' => $message, 'model' => $model];
		header('Content-type: application/json');
		return json_encode([ 'results' => $responseModel ]);
	}

}