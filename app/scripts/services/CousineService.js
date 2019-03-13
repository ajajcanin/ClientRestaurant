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
      }
    };
  });
