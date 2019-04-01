'use strict';
angular.module('restaurantclientApp')
  .factory('LoginService', function ($http) {

    return {
      login: function(data){
        var req = {
          method:'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/login',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return $http(req);
      },
    };
  });
