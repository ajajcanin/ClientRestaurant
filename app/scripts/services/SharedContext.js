'use strict';

angular.module('restaurantclientApp')
  .factory('SharedContext', function () {
    var data={
      value: ''
    };
    return {
      addData: function(value){
        data.value = value;
      },
      getData: function(){
        return data.value;
      },
      removeData: function(){
        data.value=null;
      },
    };
  });
