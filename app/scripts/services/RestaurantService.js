'use strict';

angular.module('restaurantclientApp')
  .factory('RestaurantService', function ($http) {

    return {
      getRestaurants: function(data){
        var req = {
          method:'POST',
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
      },
      getSearchedRestaurants: function(data){
        var req = {
          method:'POST',
          url: 'http://localhost:8080/app/getRestaurantsByFilter',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        };
        return $http(req);
      },
      rateRestaurant: function(data){
        var req = {
          method:'POST',
          url: 'http://localhost:8080/app/insertComment',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        };
        return $http(req);
      },
      checkReservationAvailability: function(data){
        var req = {
          method:'POST',
          url: 'http://localhost:8080/app/checkReservationAvailability',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        };
        return $http(req);
      },
      makeReservation: function(data){
        var req = {
          method:'POST',
          url: 'http://localhost:8080/app/makeReservation',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        };
        return $http(req);
      },
      getExtraDetails: function(data){
        var req = {
          method:'POST',
            url: 'http://localhost:8080/app/getExtraDetails',
          data: data,
          headers: {
            'Content-Type':'application/json'
          }
        };
        return $http(req);
      }
    };
  });
