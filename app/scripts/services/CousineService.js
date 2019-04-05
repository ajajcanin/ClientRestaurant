'use strict';
angular.module('restaurantclientApp')
  .factory('CousineService', function ($http) {
    return {
      getAllCousines: function () {
        var req = {
          method: 'GET',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/cousines',
        };
        return $http(req);
      },
      getCousinePagination: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/cousinesPagination',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      }
    };
  });
