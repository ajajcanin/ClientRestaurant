'use strict';
angular.module('restaurantclientApp')
  .factory('LocationService', function ($http) {

    return {
      getPopularLocations: function(){
        var req = {
          method:'GET',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/popular-locations',
        };
        return $http(req);
      },
      getCountries: function(){
        var req = {
          method:'GET',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/countries',
        };
        return $http(req);
      },
      getCities: function(country){
        var req = {
          method:'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/cities',
          data: country,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      getCitiesPagination: function(data){
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/citiesPagination',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      }
    };
  });
