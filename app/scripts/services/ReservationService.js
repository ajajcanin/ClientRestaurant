'use strict';
angular.module('restaurantclientApp')
  .factory('ReservationService', function ($http) {

    return {
      makeReservation: function(data, token){
        var req = {
          method:'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/makeReservation',
          data: data,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        };
        return $http(req);
      },
    };
  });
