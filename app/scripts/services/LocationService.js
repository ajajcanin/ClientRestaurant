'use strict';
angular.module('restaurantclientApp')
  .factory('LocationService', function ($http) {

    return {
      getPopularLocations: function(){
        var req = {
          method:'GET',
          url: 'http://localhost:8080/app/popular-locations',
        };
        return $http(req);
      },
      getCountries: function(){
        var req = {
          method:'GET',
          url: 'http://localhost:8080/app/countries',
        };
        return $http(req);
      },
      getCities: function(country){
        var req = {
          method:'POST',
          url: 'http://localhost:8080/app/cities',
          data: country,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
    };
  });
