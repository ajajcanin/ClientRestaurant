'use strict';
angular.module('restaurantclientApp')
  .factory('AdminService', function ($http) {
    return {
      addRestaurant: function (data) {
        var req = {
          method: 'GET',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/addRestaurant',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      editRestaurant: function (data) {
        var req = {
          method: 'GET',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/editRestaurant',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      deleteRestaurant: function (data) {
        var req = {
          method: 'GET',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/deleteRestaurant',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
    };
  });
