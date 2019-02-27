'use strict';
angular.module('restaurantclientApp')
  .factory('LoginService', function ($http) {

    return {
      login: function(data){
        var req = {
          method:'POST',
          url: 'http://localhost:8080/login',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return $http(req);
      },
    };
  });
