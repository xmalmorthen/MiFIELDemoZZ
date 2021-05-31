<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 fixed" lang="es-MX"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8 fixed" lang="es-MX"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9 fixed" lang="es-MX"> <![endif]-->
<!--[if gt IE 8]> -->
<html lang="es-MX">
<!--<![endif]-->
	<head>
		<!-- Basic -->
		<meta charset="iso-8859-1">

		<title><?php echo isset($title) ? $title : ''; ?></title>
		<meta name="keywords" content="<?php echo isset($title) ? $title : ''; ?>" />
		<meta name="description" content="<?php echo isset($title) ? $title : ''; ?>">
		<meta name="Xmal Morthen" content="">

		<meta http-equiv="X-UA-Compatible" content="IE=edge">		
		
		<!-- Mobile Metas -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<!-- Favicon -->
		<link rel="apple-touch-icon" href="<?php echo base_url('assets/images/favIcons/apple-icon.png') ?>">
		<link rel="shortcut icon" href="<?php echo base_url('assets/images/favIcons/favicon.ico') ?>">

		<!-- VENDOR -->
		<!-- CSS -->
		<link href="<?php echo base_url('assets/vendor/css/animate.css') ?>" rel="stylesheet" type="text/css" />
		<link href="<?php echo base_url('assets/vendor/css/bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
		<link href="<?php echo base_url('assets/vendor/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet" type="text/css" />
		<link href="<?php echo base_url('assets/vendor/css/style.css') ?>" rel="stylesheet" type="text/css" />		
		<!-- /CSS -->

		<script>
			var base_url = '<?php echo base_url(); ?>',
				site_url = '<?php echo site_url(); ?>',
				csrf = {
					token_name : "<?php echo $this->security->get_csrf_token_name(); ?>",
					hash : "<?php echo $this->security->get_csrf_hash(); ?>"
				},
				uri = {
					uri_string : JSON.parse('<?php echo json_encode($this->uri->uri_string);  ?>'),
					segments : JSON.parse('<?php echo json_encode($this->uri->segments);  ?>'),
					rsegments : JSON.parse('<?php echo json_encode($this->uri->rsegments);  ?>')
				},
				force = '<?php echo $this->session->flashdata('force'); ?>';
		</script>

		<!-- JS -->
		<script src="<?php echo base_url('assets/vendor/js/modernizr.min.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/js/jquery.min.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/plugins/moment/v2.29.1/moment.min.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/plugins/moment/v2.29.1/moment-with-locales.min.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/js/popper.min.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/js/bootstrap.min.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/js/detect.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/js/fastclick.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/js/jquery.blockUI.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/js/jquery.nicescroll.js'); ?>"></script>
		<!-- <script src="<?php //echo base_url("assets/vendor/plugins/ion.sound/v3.0.7/ion.sound.min.js"); ?>"></script> -->
		<script src="<?php echo base_url('assets/vendor/plugins/sweetAlert2/v11/sweetalert2.all.min.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/plugins/LoadingOverlay/v2.1.5/loadingOverlay.js'); ?>"></script>
		<script src="<?php echo base_url('assets/vendor/plugins/jquery-validation/dist/jquery.validate.min.js'); ?>"></script>
		<script src="<?php echo base_url("assets/vendor/plugins/jquery-validation/dist/messages_es.js"); ?>"></script>
		<script src="<?php echo base_url("assets/vendor/plugins/cookie/v3.14.1/js.cookie.min.js"); ?>"></script>
		<script src="<?php echo base_url("assets/vendor/plugins/dixie/v2.0.4/dexie.min.js"); ?>"></script>
		<script src="<?php echo base_url("assets/js/utils/cookie.js"); ?>"></script>
		<script src="<?php echo base_url("assets/js/utils/beep.js"); ?>"></script>

		<!-- /JS -->
		
		<!-- JS -->
		<script src="<?php echo base_url('assets/js/utils/guid.js'); ?>"></script>
		<script>
			var outputError = {
				errorMgs : "<?php echo $this->session->flashdata('outputError'); ?>",
				guid : "<?php echo $this->config->item('GUID'); ?>",
			}			
		</script>
		<script src="<?php echo base_url('assets/js/utils/compatibilidad.js'); ?>"></script>
		<script src="<?php echo base_url('assets/js/masterPage.js'); ?>"></script>
		<!-- /JS -->
</head>
	<body class="bg-secondary text-white p-0">
		<noscript><meta http-equiv="refresh" content="0;url=<?php echo site_url('Error/noScript') ?>"></noscript>
		<div class="animated fadeIn faster">
			<?php echo $this->load->view('/shared/header',NULL,TRUE); ?>
    		<div><?php echo isset($body) ? $body : '' ?></div>
		</div>
		<script src="<?php echo base_url('assets/vendor/js/pikeadmin.js'); ?>"></script>
	</body>
</html>

