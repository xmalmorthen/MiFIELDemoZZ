window.mifiel=window.mifiel||[],function(){"use strict";for(var e=["widget"],i=function(e){return function(){window.mifiel.push([e].concat(Array.prototype.slice.call(arguments,0)))}},t=0;t<e.length;t++){var n=e[t];window.mifiel[n]||(window.mifiel[n]=i(n))}if(!document.getElementById("mifiel-js")){var r=document.createElement("script"),o=document.getElementsByTagName("script")[0];r.type="text/javascript",r.id="mifiel-js",r.async=!0,r.src="https://sandbox.mifiel.com/sign-widget-v1.0.0.js",o.parentNode.insertBefore(r,o)}}();

window.addEventListener('message', mifielWidgetMessages , false);

let validator = null;
let fileInfoGlobalData = null;
let mifielGlobalDocumentData = null
let mifielGlobalSignatureDataProc = null;

$(() => {

    $(`#${selectedTab}.nav-link`).addClass('active');
    $(`#${selectedTab}Tab.tab-pane`).addClass('show active');

    validator = $("form.signers").validate(
        {
            rules: {
                "name": "required",
                "email": {
                    required: true,
                    email: true
                }
            },
            
        }
    );

    setValidatorDefaults();

    //$('#prepareSection').removeClass('d-none');

    $("#chkVig").click( function(){
        if( $(this).is(':checked') ) {
            $('.vigency').removeClass('d-none');
        } else {
            $('.vigency').addClass('d-none');
        }
        resizePDFContent();
    });		

    $('#vigDays').on('change', calculateAgo)
    $('#vigDays').trigger('change');

    
    $("#chkMsg").click( function(){
        if( $(this).is(':checked') ) {
            $('.msg').removeClass('d-none');
        } else {
            $('.msg').addClass('d-none');
        }
        resizePDFContent();
    });

    $('.addSigner').click( addSignerSection );
        
    $('.btnGetSignature').click(getSignature);
    $('.btnCancelSignature').click(cancelSignature);
    

});

function setValidatorDefaults($options){
    $defaults = {
        ignore: [':disabled'],
        errorClass: "text-warning",
        debug: true,
        errorPlacement: function(error, element) {
            element.parent().find('.errFrm').remove()
            var placement = $(element).data('error');

            error.addClass('errFrm');

            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    };

    $extend = $.extend($defaults, $options);

    $.validator.setDefaults($extend);   

}

const previewNode = document.querySelector("#template");
previewNode.classList.remove('d-none');
previewNode.id = "";
const previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

Dropzone.autoDiscover = false;  

const myDropzone = new Dropzone(".dropzone", {   
    url: `${site_url}main/postFiles`,
    autoProcessQueue: false,  		
       maxFilesize: 4,  
    maxFiles: 1,
       acceptedFiles: "application/pdf",
       paramName: "file",
    parallelUploads: 1,
    previewTemplate: previewTemplate,
    init: function() {
        this.hiddenFileInput.removeAttribute('multiple');
    },
    error: function (err,description) {
        mapErr(description);
    },
    accept: function(file, done) {
        genCsrf_token();
        done();
        myDropzone.processQueue();  
    },
    complete: function(res){
        myDropzone.removeAllFiles();

        if (res.status !== 'success') {
            if (!Swal.isVisible())
                mapErr('Ocurrió un error al registrar el pdf, favor de intentarlo de nuevo');
        } else if (res.xhr.response){

            try {
                const jsonRes = JSON.parse(res.xhr.response);
                if (!jsonRes.status)
                    mapErr('Ocurrió un error al registrar el pdf, favor de intentarlo de nuevo');

                $('.addSigner').trigger('click');	
                previewPDF(jsonRes.data.url_path);
                doSigner(jsonRes.data);
            } catch (error) {
                mapErr(`No se pudo leer la respuesta del proceso de registro del pdf [ ${res.xhr.response} ]` );
            }
        }
    }
});  

function genCsrf_token(){

    $('input[name="csrf_mifielTest"]').remove();

    $('<input>').attr({
        type: 'hidden',
        id: csrf_token_name,
        name: csrf_token_name,
        value: csrf_hash
    }).appendTo('form.dropzone');
}

function mapErr(description){
    let msg = description;
        let _err = false;
        if (description.toLowerCase().includes('file is too big')) {
            msg = 'El tamaño del archivo supera el límite de 4 mb';
            _err = true;
        } else if (description.toLowerCase().includes('upload files of this type')){
            msg = 'Formato de archivo incorrecto';
            _err = true;
        } else {
            _err = true;
        }
        
        if (_err){
            myDropzone.removeAllFiles();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: `${msg}`,
                confirmButtonText: 'Aceptar',				
            })
        }
}

function previewPDF(url_path){

    const path = atob(url_path);
    PDFObject.embed(path,'#pdfPreview',{
        pdfOpenParams: {
            view: 'Fit',
            pagemode: 'bookmarks',
            statusbar: 0,
            navpanes: 0
        },
        fallbackLink: 'Su navegador no soporta la previsualizaciòn de PDF',
        
    });

    $('#prepareSection').removeClass('d-none');
    $('html, body').animate({ scrollTop: $("#prepareSection").offset().top}, 100);

}

function doSigner(data){
    
    fileInfoGlobalData = data;

    $('.originalName').html(atob(data.file_info.name));
    $('.crypName').html(atob(data.file_info.crypName));
    resizePDFContent();

}

function calculateAgo(ele){
    let agoVig = '';
    let agoVigDate = '';
    if ( !isNaN(ele.target.value) ) {
        agoVig = moment().add(ele.target.value, 'days').fromNow();
        agoVigDate = moment().add(ele.target.value, 'days').format('LL');
    }


    $('.agoVig').html(agoVig);
    $('.agoVigDate').html(agoVigDate);
}

function addSignerSection(){

    const count = $('form.signers .signerSection').length + 1;

    const ele = `<div class="signerSection" data-id="${count}">
        <button type="buttom" class="btn btn-outline-warning btn-sm float-right removeSigner d-none"><i class="fa fa-times" aria-hidden="true"></i></button>

        <div class="form-row align-items-start">
            <div class="col-12 col-md-6 my-1">
                <label><span class="text-danger">*</span> Nombre</label>
                <input type="text" class="form-control inputName required" name="name_${count}" placeholder="Nombre del firmante" required>
            </div>
            <div class="col-12 col-md-6 my-1">
                <label ><span class="text-danger">*</span> Correo electrónico</label>
                <input type='email' class="form-control inputEmail required" name="email_${count}" placeholder="correo@dominio.com" required>
            </div>
            <div class="col-12 my-1">
                <label >RFC</label>
                <input type='text' class="form-control inputTaxId" name="taxId_${count}" placeholder="12 o 13 caracteres alfanuméricos">
            </div>																			
        </div>										
        <!--<hr class="separate">-->
    </div>`;

    $('form.signers').append(ele);

    //$(`<div class="signerSection">${ele.innerHTML}</div>`).appendTo('form.signers');
   
    hideShowRemoveSignerBtns();

    $('.removeSigner').off('click',removeSigner);
    $('.removeSigner').on('click',removeSigner);
    
    $('.inputEmail').off('blur',validateEmail);
    $('.inputEmail').on('blur',validateEmail);

    $('.inputEmail').off('input',removeErr);
    $('.inputEmail').on('input',removeErr);

    resizePDFContent();		
};

function hideShowRemoveSignerBtns(){
    const countEle = $('.signerSection').length;

    if (countEle > 1) 
        $('.removeSigner').removeClass('d-none');
    else
        $('.removeSigner').addClass('d-none');
}

function removeSigner(evt){
    evt.preventDefault();
    evt.target.closest('.signerSection').remove();
    hideShowRemoveSignerBtns();
    resizePDFContent();	
}

function validateEmail(evt){
    const testEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const val = evt.target.value;

    $(evt.target.parentElement).find('.errFrm').remove();
    
    if (!testEmail.test(val))
        $(`<span class="errFrm text-warning font-weight-bold"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Ingresa una dirección de correo electrónico válida</span>`).appendTo(evt.target.parentElement);
}

function removeErr(evt){
    $(evt.target.parentElement).find('.errFrm').remove();
}

function resizePDFContent(){
    $('#pdfPreview').height($('.docDataIndoSection').height());
}

function getSignature(){

    $('form.signers .signerSection').each( function(){
        const ele = $(this);

        let valid = false;

        ele.find('input').each( function(){
            if ( $(this).val().length ) {
                valid = true;
                return true;
            }
        });

        if (!valid) {
            ele.remove();
            hideShowRemoveSignerBtns();
            resizePDFContent();
        } 

    });

    $('.inputEmail').off('blur',validateEmail);

    if (!$('form.signers .signerSection').length) {

        $('.errFrmSigners .msg').html('Debe especificar al menos un firmante');
        $('.errFrmSigners').removeClass('d-none');
        $('html, body').animate({ scrollTop: $(".errFrmSigners").offset().top - 10}, 100);
        $('.addSigner').trigger('click');

    }  else if ($('form.signers .signerSection .errFrm').length){

        $('.errFrmSigners .msg').html('Información erronea o faltante');
        $('.errFrmSigners').removeClass('d-none');
        $('html, body').animate({ scrollTop: $(".errFrmSigners").offset().top - 10}, 100);

    } else if (!$('form.signers').valid()){

        if ($('form.signers .signerSection .errFrm').length) {
            $('.errFrmSigners .msg').html('Información erronea o faltante');
            $('.errFrmSigners').removeClass('d-none');
            $('html, body').animate({ scrollTop: $(".errFrmSigners").offset().top}, 100);
        } else
            $('.errFrmSigners').addClass('d-none');
        
    } else {
        $('.errFrmSigners').addClass('d-none');

        const frm = $('form.signers').serializeArray();
        
        let data = [];
        for (let idx = 0; idx < frm.length; idx = idx + 3) {
            if (!data.find( qry => qry.name == frm[idx].value && qry.email == frm[idx + 1].value))
                data.push({ name: frm[idx].value, email: frm[idx + 1].value, taxId: frm[idx + 2].value })
        }
        
        createDocument(data);
    }

    resizePDFContent();
}

function cancelSignature(){

    Swal.fire({
        title: '¿Quieres descartar este documento?',
        html: "<p>Perderás la configuración que has realizado y los firmantes no recibirán la invitación para firmar.</p>",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar trabajando',
        cancelButtonText: 'Descartar documento'
      }).then((result) => {
        if (result.dismiss === 'cancel') {
            $('#prepareSection').addClass('d-none');
            $('.signers .signerSection').remove();
            $('html, body').animate({ scrollTop: $("body").offset().top}, 100);
        }
      })
    
}

function createDocument(signersModel){

    sendData = {
        data: {
            fileInfoGlobalData,
            signers : signersModel,
            days_to_expire: $("#chkVig").is(':checked') ? +$('#vigDays').val() : 0
        }
    };

    sendData[csrf_token_name] = csrf_hash;

    $.LoadingOverlay("show", {image:"",fontawesome:"fa fa-cog fa-spin"});

    $.post(site_url + 'main/ajaxCreateDocument', sendData, function(data) {
        mifielGlobalDocumentData = data.results.model;
        showWidget(data.results.model.documentId);
    })
    .fail(function() { 
        debugger;
        $.LoadingOverlay("hide",true);
        errBackEndProc();        
    })
    .always(function() {
        $.LoadingOverlay("hide",true);
    });

}

function errBackEndProc(msg, footer){

    const config = {
        icon: 'error',
        title: 'Error',
        html: msg ? msg : "Ocurrió un error al realizar el proceso",
        footer: 'Favor de intentarlo de nuevo',            
        confirmButtonColor: '#3085d6',            
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
    }

    if (footer)
        config['footer'] = footer;

    Swal.fire(config);
}

async function showWidget(documentId){
    
    const documentDetail = await getDocummentDetail(documentId).catch( ()=> { return; } );    
    const widgetId = documentDetail.results.model.signers[0].widget_id;

    $('.mainTabs').addClass('d-none');
    
    window.mifiel.widget({
        widgetId,
        appendTo: 'widgetSignature',
        successBtnText: 'Continuar',
        color: '2b3d51'
    });

    $('#widgetSignature').removeClass('d-none');
    
}

function hideMifielWidget(){
    
    $('#widgetSignature').addClass('d-none');
    $('.mainTabs').removeClass('d-none');
    
}

function getDocummentDetail(documentId){
    return new Promise( (res,rej) => {

        $.get( `${site_url}main/ajaxDocumentDetail/${documentId}`, function(data) {
           res(data) ;
        })
        .fail(function() { 
            $.LoadingOverlay("hide",true);
            errBackEndProc();
            rej();
        })
        .always(function() {
            $.LoadingOverlay("hide",true);
        });

    });
}

function mifielWidgetMessages(msg){
    if ( ![mifielBaseUrl,'https://www.mifiel.com'].includes(msg.origin) ) return;

    if (typeof msg.data !== 'object') return;

    switch (msg.data.eventType) {
        case 'mifiel.widget.successStep':
        case 'mifiel.widget.success':
            
            mifielGlobalSignatureDataProc = msg.data;
            location.href= `${site_url}main/documentDetail/${mifielGlobalDocumentData.documentId}`;

            break;
        case 'mifiel.widget.error':
            const err = msg.data.error;
            if (err.code == 3002) {
                hideMifielWidget();
                errBackEndProc('Falló el proceso de firmado del documento','Favor de intentarlo de nuevo');
            }
            break;
    }
}