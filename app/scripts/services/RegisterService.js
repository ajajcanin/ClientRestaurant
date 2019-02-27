'use strict';
angular.module('restaurantclientApp')
  .factory('RegisterService', function ($http) {

    return {
      register: function(data){
        var req = {
          method:'POST',
          url: 'http://localhost:8080/app/register',
          data: data,
          headers: {
            'Content-Type': 'application/json',
          }
        };
        return $http(req);
      },
    };
  });
