<!-- CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/css/custom-tabs.css'); ?>">
<link rel="stylesheet" href="<?php echo base_url('assets/vendor/dropzone-5.7.0/dist/min/dropzone.min.css'); ?>">
<link rel="stylesheet" href="<?php echo base_url('assets/css/custom-dropZone-CreateDocument.css'); ?>">
<link rel="stylesheet" href="<?php echo base_url('assets/css/switch.css'); ?>">
<link rel="stylesheet" href="<?php echo base_url('assets/css/main/styles.css'); ?>">
<!-- /CSS -->

<div class="container-fluid mt-2">	

	<div id="widgetSignature" class="d-none p-2"></div>

	<div class="mainTabs">
		<ul class="nav nav-tabs" id="tab" role="tablist">
			<li class="nav-item">
				<a class="nav-link" id="lstDocs" data-toggle="tab" href="#lstDocsTab" role="tab" aria-controls="lstDocsTab" aria-selected="true"><i class="fa fa-list-alt" aria-hidden="true"></i> Lista de documentos</a>
			</li>		
			<li class="nav-item">
				<a class="nav-link" id="createDoc" data-toggle="tab" href="#createDocTab" role="tab" aria-controls="createDocTab" aria-selected="false"><i class="fa fa-file-text-o" aria-hidden="true"></i> Crear documento para firma</a>
			</li>
		</ul>

		<div class="tab-content" id="tabContent">
			<div class="tab-pane fade py-4" id="lstDocsTab" role="tabpanel" aria-labelledby="lstDocs">
				<div class="table-responsive">
					<table class="table table-sm table-striped" style="width:100%">
						<thead class="thead-dark">
							<tr >                    
								<th><i class="fa fa-hashtag" aria-hidden="true"></i> Id de documento</th>
								<th><i class="fa fa-gavel" aria-hidden="true"></i> Estatus</th>
								<th><i class="fa fa-certificate" aria-hidden="true"></i> Dueño</th>
								<th><i class="fa fa-calendar" aria-hidden="true"></i> Creado</th>
								<th><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Archivo</th>								
								<th></th>                    
							</tr>
						</thead>
						<tbody>
							<?php foreach ($documentos as $key => $value) { 
								$fecha = new DateTime($value->created_at);							
							?>
								<tr>
									<td><?php echo $value->id; ?></td>

									<td>
										<?php switch ($value->state) {
											case 'pending':
												echo 'EN PROCESO';
												break;
											case 'issued':
												echo 'FIRMADO';
												break;
											default:
												echo $value->state;
												break;
										}?>
									</td>
									<td><?php echo ($value->owner->name); ?> | <?php echo ($value->owner->email); ?></td>
									<td><?php echo $fecha->format('d/m/Y'); ?></td>
									<td><?php echo $value->file_file_name; ?></td>
									<td class="text-right">
										<div class="btn-group" role="group" aria-label="Basic example">
											<button type="button" class="btn btn-outline-primary" onclick="location.href='<?php echo base_url('main/documentDetail/' . $value->id . '?gt=' . base64_encode('main') . '&tb=' . base64_encode('lstDocs')) ?>'" title="Ver detalle del documento"><i class="fa fa-info-circle" aria-hidden="true"></i></button>
											<?php if (!$value->status[0]) { ?>
											<button type="button" class="btn btn-outline-success" onclick="alert('ok')" title="Firmar documento"><i class="fa fa-pencil" aria-hidden="true"></i></button>
											<?php } ?>
											<!-- <button type="button" class="btn btn-outline-primary" >Right</button> -->										
										</div>
									</td>
								</tr>
							<?php } ?>
						</tbody>
					</table>
				</div>
			</div>		
			<div class="tab-pane fade py-4" id="createDocTab" role="tabpanel" aria-labelledby="createDoc">

				<div id="template" class="file-row d-none">
					<div>
						<span class="preview"><img data-dz-thumbnail /></span>
					</div>
					<div>
						<p class="name" data-dz-name></p>
						<strong class="error text-danger" data-dz-errormessage></strong>
					</div>
					<div>
						<p class="size" data-dz-size></p>
						<div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
							<div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
						</div>
					</div>				
				</div>

				<form enctype="multipart/form-data" class="dropzone dropzone_custom w-100" id="image-upload">  
					
					<div class="d-flex flex-column justify-content-center align-items-center"> 
						<i class="fa fa-file-pdf-o fa-5x fa-fw" aria-hidden="true"></i> 
						<h5 class="my-2">Arrastra un archivo PDF para solicitar firmas</h5>  
					</div>
					
					<div class="dz-message" data-dz-message><span><button type="button" class="btn btn-outline-success">Seleccionar uno</button></span></div>					
				
				</form>  
			
				<div id="prepareSection" class="row d-none">
					<div id="pdfPreview" class="co-12 col-md-8 w-100 p-0"></div>
					<div class="co-12 col-md-4 ">
						<div class="docDataIndoSection">
							<h2>Preparación del documento</h2>
							<hr>
							<div class="row ml-2">
								<div class="col-12">
									<h5><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Documento</h5>
									<div class="pl-3">
										<span>Nombre: <strong class="originalName"></strong></span>
										<br>
										<span>Nombre encriptado: <strong class="crypName"></strong></span>
									</div>
								</div>
							</div>
							<br>
							<div class="row ml-2">
								<div class="col-12">
									<h5><i class="fa fa-certificate" aria-hidden="true"></i> Firmante</h5>		
									<!--<p class="pl-3 text-justify font-weight-bold h6">Todos los firmantes recibirán una copia del documento original y firmado.</p>-->
									
									<div class="pl-3">
										<span class="d-block text-right"><span class="text-danger">*</span> Información obligatoria</span>

										<form class="signers p-2">
											<div class="alert alert-danger errFrmSigners d-none" role="alert">
												<h5><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> <span class="msg"></span></h5>
											</div>										
										</form>
										<div class="mt-2 text-right d-none">									
											<button type="buttom" class="btn btn-outline-light addSigner"><i class="fa fa-plus" aria-hidden="true"></i> Agregar otro firmante</button>
										</div>
									</div>
								</div>
							</div>
							<br>
							<div class="row ml-2">
								<div class="col-12">
									<div class="row">
										<div class="col-8">
											<h5><i class="fa fa-calendar-o" aria-hidden="true"></i> Días de vigencia</h5>
										</div>
										<div class="col-auto">
											<span class="switch switch-sm">
												<input type="checkbox" class="switch" id="chkVig">
												<label for="chkVig"></label>
											</span>
										</div>
									</div>

									<div class="pl-3 d-none vigency">
										<input type="number" name="vigDays" id="vigDays" value="5" class="numberStyle">
										<span class="ml-2">días</span>
										<br>
										<span> La vigencia del documento expira <strong class="agoVig"></strong> [ <strong class="agoVigDate"></strong> ]</span>
									</div>
								</div>
							</div>
							<br>
							<div class="row ml-2 d-none">
								<div class="col-12">
									<h5><i class="fa fa-envelope-o" aria-hidden="true"></i> Recordatorios</h5>
									<div class="pl-3">
										<select class="custom-select">
											<option value="1">Cada día</option>
											<option value="2" selected>Cada tres días (predeterminado)</option>
											<option value="3">Cada semana</option>
											<option value="4">No enviar recordatorios automáticos</option>
										</select>
									</div>
								</div>
							</div>
							<br>
							<div class="row ml-2 d-none">
								<div class="col-12">
									<div class="row">
										<div class="col-8">
											<h5><i class="fa fa-comments-o" aria-hidden="true"></i> Mensaje para firmantes</h5>
										</div>
										<div class="col-auto">
											<span class="switch switch-sm">
												<input type="checkbox" class="switch" id="chkMsg">
												<label for="chkMsg"></label>
											</span>
										</div>
									</div>							
									<div class="pl-3 d-none msg">
										<textarea name="msg" id="msg" cols="30" rows="10" class="p-2"></textarea>
									</div>
								</div>
							</div>					
							<br class='d-none'>
							<p class="text-justify font-weight-bold h6 py-3">Por favor, revisa el documento que estás preparando y los correos de los firmantes. Cuando estés listo para solicitar las firmas, da clic en el botón de “Solicitar firma”.</p>
							<div class="">
								<button type="button" class="btn btn-success btn-block btn-lg btnGetSignature"><i class="fa fa-certificate" aria-hidden="true"></i> Solicitar firma</button>
								<button type="button" class="btn btn-danger btn-block btn-lg btnCancelSignature"><i class="fa fa-times" aria-hidden="true"></i> Cancelar</button>
							</div>
						</div>
					</div>

				</div>
				
			</div>
		</div>
	</div>

</div>

<!-- JS -->
<script src="assets/vendor/dropzone-5.7.0/dist/min/dropzone.min.js"></script>
<script src="assets/vendor/pdfobject/v2.2.5/pdfobject.min.js"></script>
<script src="assets/js/main/index.js"></script>

<script>

const mifielBaseUrl = '<?php echo MIFIEL_URL; ?>';
const csrf_token_name = '<?php echo $this->security->get_csrf_token_name();?>';
const csrf_hash = '<?php echo $this->security->get_csrf_hash();?>';

const selectedTab = '<?php echo $this->session->flashdata('tab'); ?>';
	
</script>
<!-- /JS -->