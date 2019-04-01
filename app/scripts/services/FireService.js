'use strict';
angular.module('restaurantclientApp')
  .factory('FireService', function () {
    var upload = function(dataUrl, cb){
      /*var metadata = {
        contentType : dataUrl.data
      };
      console.log(dataUrl);
      var file = new File([new Blob([dataUrl.split(',')[1]],
        {type: 'image/png'})], '_' + Math.random().toString(36).substr(2, 9) +'.png');
      console.log('file' + file.name);*/
      console.log(dataUrl);
      var name = '_' + Math.random().toString(36).substr(2, 9) + '.' +
        dataUrl.substring(dataUrl.indexOf('/')+1, dataUrl.indexOf(';'));
      var type = dataUrl.substring(dataUrl.indexOf(':')+1, dataUrl.indexOf(';'));
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var uploadTask;
      uploadTask = storageRef.child('Images/' + name).putString(dataUrl.split(',')[1], 'base64', {contentType: type});
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot){
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        console.log('Upload is' + progress + '%done');
        switch(snapshot.state){
          case firebase.storage.TaskState.PAUSED:
            console.log('PAUSED');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('RUNNING');
            break;
        }
        }, function(error){
        switch(error.code){
          case 'storage/unauthorized':
            cb('unauthorized');
            break;
          case 'storage/canceled':
            cb('canceled');
            break;
          case 'storage/unknown':
            cb('unknown');
            break;
        }
      }, function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
          cb(downloadURL);
        });
      });
    };
    return {
      uploadImage : upload,
    };
  });
