'use strict';

angular.module('restaurantclientApp')
  .factory('RestaurantService', function ($http) {

    return {
      getRestaurants: function(data){
        var req = {
          method:'GET',
          url: 'http://localhost:8080/app/search',
          data: data,
          headers: {
          }
        };
        return $http(req);
      },
      getRandomRestaurants: function(){
        var req = {
          method:'GET',
          url: 'http://localhost:8080/app/random',
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : '*',
            'Access-Control-Allow-Headers' : '*'
          }
        };
        return $http(req);
      }
    };
  });
