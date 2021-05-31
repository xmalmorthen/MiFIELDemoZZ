var swalShow = false;

// init bunch of sounds
// ion.sound({
//     sounds: [
//         {name: "bell_ring"},
//     ],

//     // main config
//     path: "assets/vendor/plugins/ion.sound/v3.0.7/sounds/",
//     preload: true,
//     multiplay: true,
//     volume: 0.9
// });

// if (typeof MyCookie !== "undefined"){
//     MyCookie.objs.coockieObj.set('sess_time_to_update',sess_base_time,{ path : '/' });
//     var timer = setInterval(function() { 

//         sess_time_to_update = MyCookie.objs.coockieObj.get('sess_time_to_update',{ path : '/' });

//         if (parseInt(sess_time_to_update) <= parseInt(sess_time_left_to_confirm) && !swalShow ){
//             MyCookie.session.save();

//             swalShow = true;
//             timerInterval = null;

//             var swalPreserve = null;
//             if (Swal.isVisible()){
//                 swalPreserve = {
//                     preserve : $('.swal2-container').data('preserve'),
//                     preserveCall : $('.swal2-container').data('preserveCall')
//                 }                
//             }


//             Swal.fire({                
//                 title: 'Sesión',
//                 html: "Está a punto de expirar la sesión por inactividad,<br> ¿Desea mantener la sesión activa?<br><br> Tiempo restante: <span class='swalSessionRemainTime'><strong></strong></span>",
//                 footer: "<div>Se perderá cualquier avance no guardado...</div>",
//                 type: 'question',
//                 allowOutsideClick : false,
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 timer: sess_time_to_update * 1000,
//                 onBeforeOpen: function() {
//                     var leftToBeep = 0;
//                     timerInterval = setInterval(function() {
//                         var content = Swal.getContent();
//                         if (content) {
//                             var timeLeft = (Swal.getTimerLeft() / 1000),
//                                 mitnutesLeft = Math.trunc(timeLeft / 60),
//                                 secondsLeft = Math.trunc(timeLeft % 60),
//                                 msgLeft = mitnutesLeft >= 1 ? (  mitnutesLeft.toString() + " minuto" + (mitnutesLeft > 1 ? 's':'') + ' ' + secondsLeft.toString() + " segundo" + (secondsLeft != 1 ? 's':'') ) : (  secondsLeft.toString() + " segundo" + (secondsLeft > 1 ? 's':'') );

//                             content.querySelector('strong')
//                             .textContent = (msgLeft);
//                         }
                        
//                         leftToBeep++;
//                         if (leftToBeep == 10){
//                             beep();
//                             leftToBeep = 0;
//                         }

//                     }, 1000);

//                     beep();
//                 },
//                 onClose: () => {
//                     clearInterval(timerInterval);
//                 }
//             }).then(function(result){
//                 if (result.value === true || result.value === undefined && result.dismiss === undefined){

//                     if (swalPreserve){
//                         if (swalPreserve.preserve){
//                             $.LoadingOverlay("show", {image:"",fontawesome:"fa fa-cog fa-spin"});
//                         }
//                     }

//                     $.getJSON(site_url + 'UserSession/renovateSession/' + guid(), function(timeRemain) {
//                         swalShow = false;
//                         sess_base_time = timeRemain;
//                         MyCookie.objs.coockieObj.set('sess_time_to_update',sess_base_time,{ path : '/' });

//                         if (swalPreserve){
//                             if (swalPreserve.preserve){
//                                 eval(swalPreserve.preserveCall + '()');
//                                 $.LoadingOverlay("hide",true);
//                             }
//                         }                    
//                     });                    
//                 } else if (result.dismiss === 'cancel' || result.dismiss === 'timer') {
//                     MyCookie.objs.coockieObj.set('sess_time_to_update',1,{ path : '/' });
//                 }
//             });
//         }
//         if (sess_time_to_update == 1) {
//             MyCookie.objs.coockieObj.set('sess_time_to_update',1,{ path : '/' });
//             return false;
//         }

//         sess_time_to_update--;
//         MyCookie.objs.coockieObj.set('sess_time_to_update',sess_time_to_update,{ path : '/' });
        
//     }, 1000);
// }

$(document).ready(function () { 
    
    moment.locale('es');
    
    $.LoadingOverlaySetup({image:"",fontawesome : "fa fa-gear fa-spin",maxSize:150,minSize:20,zIndex : 1000});
    
    if (typeof MyCookie !== 'undefined') {
        MyCookie.session.save();
        MyCookie.session.get();
    }

    window.addEventListener("beforeunload", function (e) {
        $.LoadingOverlay("show");
        return null;
    });

    $('#sidebar-menu ul li.submenu a[href="' + site_url + uri.uri_string + '"]')
    .addClass('active')
    .closest('li').addClass('active')
    .closest('ul').css('display','block')
    .closest('li.submenu').find('a').first().addClass('subdrop active');
    
    if (typeof outputError !== 'undefined') {
        if (outputError.errorMgs.length > 0){
            Swal.fire({
                position: 'top-end',
                type: 'error',
                title: 'Error',
                html: outputError.errorMgs,
                footer: '<span>GUID de rastreo [ <strong>' + outputError.guid + '</strong> ]</span>',
                showConfirmButton: true,
                allowOutsideClick: false            
            });
        }
    }

    setValidatorDefaults();

    $('[data-toggle="tooltip"]').tooltip();

});

function setValidatorDefaults($options){
    $defaults = {
        ignore: [':disabled'],
        errorClass: "text-danger",
        debug: true,
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    };

    // if($options) {
    //     if ( $options.hasOwnProperty("ignore") )
    //         $defaults.ignore = $options.ignore;
    // }

    $extend = $.extend($defaults, $options);

    $.validator.setDefaults($extend);   

}

window.addEventListener('load', function() {
    
    function updateOnlineStatus(event) {
      
        if (!navigator.onLine){
        $('body').LoadingOverlay("show", {image:"",fontawesome:"fa fa-cog fa-cloud fa-2x",text:'Conexión a internet perdida'});
      } else {
        $('body').LoadingOverlay("hide", true);
      }

    }
  
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });