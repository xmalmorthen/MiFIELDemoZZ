var defaultSound;

var dbUtils = new Dexie('SGPUtilsv1');
dbUtils.version(1).stores({
    sounds: 'name, b64Data'
});

dbUtils.open();
dbUtils.on('ready',function(){
    dbUtils.sounds.where('name').equals('bell_ring').count().then((count) => {
        if (count == 0){
            return new Promise( resolve => {
                $.get(site_url + 'assets/js/utils/beep.js.b64/bell_ring.sound.txt',function(data){
                    resolve (data);
                });
            }).then((data) =>{
                return dbUtils.sounds.add({
                    name: 'bell_ring',
                    b64Data : data
                }).then(() =>{
                    return dbUtils.sounds.where('name').equals('bell_ring').toArray();
                });
            });
        } else {
            return dbUtils.sounds.where('name').equals('bell_ring').toArray();
        }
    }).then((data) => {
        defaultSound = new  Audio(data[0].b64Data);
    });    
});

function beep() {
    try {
        defaultSound.play().then(() => {});
    } catch(err){}
}