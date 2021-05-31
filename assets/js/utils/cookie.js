var MyCookie = {
    objs : {
        coockieObj : Cookies.noConflict()
    },
    session : {
        reset : function(){
            MyCookie.objs.coockieObj.set('sess_time_to_update',sess_time_to_update,{ path : '/' });

            // MyCookie.objs.coockieObj.remove('sessionCookie',{ path: ''});
            // sessionStorage.removeItem('sessionCookie');
            // MyCookie.session.save();
        },
        save : function(){
            // var sessionObj = {
            //     sess_base_time : sess_base_time,
            //     sess_time_to_update : sess_time_to_update,
            //     sess_time_left_to_confirm : sess_time_left_to_confirm
            // }
            // MyCookie.objs.coockieObj.set('sessionCookie',JSON.stringify(sessionObj));
            // sessionStorage.setItem("sessionCookie", JSON.stringify(sessionObj));
        },
        get : function(){
            // var sessionObj = MyCookie.objs.coockieObj.get('sessionCookie');
            // sessionObj = sessionStorage.getItem("sessionCookie");
            // if (sessionObj){
            //     return JSON.parse(sessionObj);
            // } else {
            //     return null;
            // }
        },
        doExpire : function(){
            MyCookie.objs.coockieObj.set('doExpire',1,{ path : '/' }); 
        }
    },    
    singleWindow : {
        objs : {
            COOKIE_NAME : 'singleWindow'
        },        
        save : function(){            
            MyCookie.objs.coockieObj.set(MyCookie.singleWindow.objs.COOKIE_NAME,1,{ path : '/' });
        },
        remove : function(){
            MyCookie.objs.coockieObj.remove(MyCookie.singleWindow.objs.COOKIE_NAME, { path: '/' });
        },
        get : function(){
            var singleWindow = MyCookie.objs.coockieObj.get(MyCookie.singleWindow.objs.COOKIE_NAME,{ path : '/' });
            return singleWindow;
        }
    },
    force : {
        objs : {
            COOKIE_NAME : 'force'
        },        
        save : function(){            
            MyCookie.objs.coockieObj.set(MyCookie.force.objs.COOKIE_NAME,1,{ path : '/' });            
        },
        remove : function(){
            MyCookie.objs.coockieObj.remove(MyCookie.force.objs.COOKIE_NAME, { path: '/' });
        },
        get : function(){
            var force = MyCookie.objs.coockieObj.get(MyCookie.force.objs.COOKIE_NAME,{ path : '/' });
            return force;
        }
    },
    tabRef : {
        save : function(COOKIE_NAME,linkRefHash){           
            //MyCookie.objs.coockieObj.set(COOKIE_NAME,linkRefHash,{ path : '/' });            
        },
        remove : function(COOKIE_NAME){
            //MyCookie.objs.coockieObj.remove(COOKIE_NAME, { path: '/' });
        },
        get : function(COOKIE_NAME){
            // var linkRefHash = MyCookie.objs.coockieObj.get(COOKIE_NAME,{ path : '/' });
            // return linkRefHash;
        }
    }
};

// var doExpireInterval = setInterval(function(){
//     var sess_time_to_updateCookie = MyCookie.objs.coockieObj.get('sess_time_to_update',{ path : '/' });

//     if (sess_time_to_updateCookie !== undefined) {
//         if (parseInt(sess_time_to_updateCookie) <= parseInt(sess_time_left_to_confirm)){
//             if (parseInt(sess_time_to_updateCookie) == 1) {
//                 clearInterval(doExpireInterval);
//                 swal.close();
//                 $.LoadingOverlay("show", {image:"",fontawesome:"fa fa-cog fa-spin"});
//                 window.location.href = site_url + 'Sesion/Terminar';                
//             }

//             sess_time_to_update = sess_time_to_updateCookie; 
//             MyCookie.objs.coockieObj.set('sess_time_to_update',sess_time_to_update,{ path : '/' });
//         } else if (swalShow){
//             swal.close();
//         }
//     }
// },1000);


/*if ( MyCookie.singleWindow.get() === undefined) {
    MyCookie.singleWindow.save();
    $(window).unload(MyCookie.singleWindow.remove);
} else {
    window.location.href = base_url + 'Error/singleWindow';
}*/