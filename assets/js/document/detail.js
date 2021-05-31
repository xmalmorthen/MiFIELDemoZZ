
$( () => {

    init();

});

async function init(){
    const promisesCall = [
        renderOriginalDocument(),
        renderSignedDocument(),
        renderXMLDocument()
    ]

    $.LoadingOverlay("show", {image:"",fontawesome:"fa fa-cog fa-spin"});

    await Promise.race(promisesCall).then( (res) => {
    }).catch( (err) => {
        debugger;
        Swal.fire({
            type: 'error',
            title: 'Error',
            html: err.message,
            showConfirmButton: true,
            allowOutsideClick: false
        });
    });

    $.LoadingOverlay("hide");
}

function createCanonicalString(method,contentType,requestURI){
    const canonical_string = `${method},${contentType},,${mifielBaseUrl}${documentoGlobalData.file_signed}${new Date().toUTCString()}`;
    const shaObj = new jsSHA(canonical_string, "TEXT");
	const hmac = shaObj.getHMAC("FEXjovNhDbmPfEVvQOXmaSzZ8jOgfCH7qk10FLqMEwkXyMo+26eKdibJc8oo/V+zi1qsDj+wiibsVxc3G9J7pQ==", "TEXT", "SHA-1", "B64");
    const APIAuth = `APIAuth fd246f2b72217b0e618b2acd3f632a8535898c92:${hmac}`;
    console.log(APIAuth);
    return APIAuth;
}

renderOriginalDocument = () => {
    return new Promise( (res,rej) => {
        
        url = `${mifielBaseUrl}${documentoGlobalData.file_download}`;

        debugger

        callFetch(url,'application/json','GET').then(res => res.blob()).catch( err => rej(err) )
        .then(blob => {
            previewPDF(blob,'#originalDocumentRender');
            res(true);
        });

    });
    
}

renderSignedDocument = () => {
    return new Promise( (res,rej) => {

        url = `${mifielBaseUrl}${documentoGlobalData.file_signed_download}`;

        callFetch(url,'application/json','GET').then(res => res.blob()).catch( err => rej(err) )
        .then(blob => {
            previewPDF(blob,'#signedDocumentRender');
            res(true);
        });

    });

}

renderXMLDocument = () => {
    return new Promise( (res,rej) => {

        url = `${mifielBaseUrl}${documentoGlobalData.file_xml}`;

        callFetch(url,'text/xml','GET').then(res => res.text()).catch( err => rej(err) )
        .then(text => {
            $('.preXMLDocumen').val(text);
            res(true);
        });

    });

}


function callFetch(url, ct, pt){
    return fetch(url, {
        headers:{
        'Content-Type': ct,
        'Date': new Date().toUTCString(),
        'Authorization': createCanonicalString(pt,ct,url)
        }
    });
}

function previewPDF(blob, domTarget){
    const file = window.URL.createObjectURL(blob);
    PDFObject.embed(file,domTarget,{
        pdfOpenParams: {
            view: 'FitH', 
            scrollbar: '1', 
            toolbar: '1', 
            statusbar: '0', 
            messages: '0', 
            navpanes: '1'
        },
        fallbackLink: 'Su navegador no soporta la previsualizaciòn de PDF',        
    });
}

function downloadFIle(typeFile){
    url = `${mifielBaseUrl}`;
    ct = 'application/json';
    switch (typeFile) {
        case 1:
            url += `${documentoGlobalData.file_signed_download}`;
            break;
        case 2:
            url += `${documentoGlobalData.file_download}`;
            break;
        case 3:
            url += `${documentoGlobalData.file_xml}`;
            ct = 'text/xml';
            break;
    }

    fetch(url, {
        headers:{
            'Content-Type': ct,
            'Date': new Date().toUTCString(),
            'Authorization': createCanonicalString('GET',ct,url)
        }
    }).then(res => { return ct == 'application/json' ? res.blob() : res.text();})
    .catch(err => { 
        Swal.fire({
            type: 'error',
            title: 'Error',
            html: err.message,
            showConfirmButton: true,
            allowOutsideClick: false
        });
    })
    .then(data => {
        let fileName = documentoGlobalData.external_id ? atob(documentoGlobalData.external_id) : documentoGlobalData.file_file_name;
        if (ct == 'text/xml')
            fileName = fileName.slice(0,-3) + 'xml'
        download(data, fileName, ct);
    });
}

