
<!-- CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/css/custom-tabs.css'); ?>">
<!-- /CSS -->

<div class="container-fluid mt-2">
    <h3>Detalle de documento [ <small><?php echo $documento->id ?></small> ]</h3>
    <div class="text-right">
        <button type="button" class="btn btn-link text-white h5" onclick="location.href='<?php echo base_url($this->session->flashdata('goto') . '?tb=' . $this->session->flashdata('tab')); ?>'"><i class="fa fa-chevron-left" aria-hidden="true"></i> REGRESAR</button>
    </div>
    
    <div class='tabsSection row'>
        <div class="col-2 text-right">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active"  id="signedDocument-tab"     data-toggle="pill" href="#signedDocument-pills" role="tab" aria-controls="signedDocument-pills" aria-selected="false">Documento firmado</a>
                <a class="nav-link"         id="originalDocument-tab"   data-toggle="pill" href="#originalDocument-pills" role="tab" aria-controls="originalDocument-pills" aria-selected="true">Documento original</a>
                <a class="nav-link"         id="xmlDocument-tab"        data-toggle="pill" href="#xmlDocument-pills" role="tab" aria-controls="xmlDocument-pills" aria-selected="false">XML del documento</a>                
                <a class="nav-link"         id="DocumentData-tab"       data-toggle="pill" href="#documentData-pills" role="tab" aria-controls="documentData-pills" aria-selected="false">Detalle técnico</a>
            </div>
        </div>
        <div class='col-10 border-left'>
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="signedDocument-pills" role="tabpanel" aria-labelledby="signedDocument-tab">
                    <button type="button" class="btn btn-outline-primary btn-lg my-2" onclick="downloadFIle(1);"><i class="fa fa-download" aria-hidden="true"></i> Descargar</button>
                    <div id="signedDocumentRender" class="w-100 " style='height:100vh;'></div>
                    <button type="button" class="btn btn-outline-primary btn-lg my-2" onclick="downloadFIle(1);"><i class="fa fa-download" aria-hidden="true"></i> Descargar</button>
                </div>
                <div class="tab-pane fade" id="originalDocument-pills" role="tabpanel" aria-labelledby="originalDocument-tab">
                    <button type="button" class="btn btn-outline-primary btn-lg my-2" onclick="downloadFIle(2);"><i class="fa fa-download" aria-hidden="true"></i> Descargar</button>
                    <div id="originalDocumentRender" class="w-100 " style='height:100vh;'></div>
                    <button type="button" class="btn btn-outline-primary btn-lg my-2" onclick="downloadFIle(2);"><i class="fa fa-download" aria-hidden="true"></i> Descargar</button>
                </div>
                <div class="tab-pane fade" id="xmlDocument-pills" role="tabpanel" aria-labelledby="xmlDocument-tab">
                    <button type="button" class="btn btn-outline-primary btn-lg my-2" onclick="downloadFIle(3);"><i class="fa fa-download" aria-hidden="true"></i> Descargar</button>
                    <textarea class='preXMLDocumen w-100 text-white' style='height:100vh;background-color: #6c757d;' readonly></textarea>
                    <button type="button" class="btn btn-outline-primary btn-lg my-2" onclick="downloadFIle(3);"><i class="fa fa-download" aria-hidden="true"></i> Descargar</button>
                </div>
                <div class="tab-pane fade" id="documentData-pills" role="tabpanel" aria-labelledby="DocumentData-tab">
                    <pre class="text-white preSectionInfo">
                        <?php echo print_r($documento, true); ?>
                    </pre>
                </div>
            </div>
        </div>
    </div>
    
    <br>

    <div class="text-right">
        <button type="button" class="btn btn-link text-white h5" onclick="location.href='<?php echo base_url($this->session->flashdata('goto') . '?tb=' . $this->session->flashdata('tab')) ?>'"><i class="fa fa-chevron-left" aria-hidden="true"></i> REGRESAR</button>
    </div>	
</div>

<!-- JS -->
<script type="text/javascript" src="<?php echo base_url('assets/vendor/plugins/jsSHA-1.5.0/src/sha1.js'); ?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/vendor/pdfobject/v2.2.5/pdfobject.min.js'); ?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/vendor/plugins/downloadjs/v4/download.js'); ?>"></script>
<script type="text/javascript" src="<?php echo base_url('assets/js/document/detail.js'); ?>"></script>
<script>
    const mifielBaseUrl = '<?php echo MIFIEL_URL; ?>';
    const documentoGlobalData = JSON.parse('<?php echo json_encode((array) $documento); ?>');
</script>
<!-- /JS -->