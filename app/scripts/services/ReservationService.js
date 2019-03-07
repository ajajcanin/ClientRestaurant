'use strict';
angular.module('restaurantclientApp')
  .factory('ReservationService', function ($http) {

    return {
      makeReservation: function(data){
        var req = {
          method:'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/makeReservation',
          data: data,
          headers: {
            'Content-Type': 'application/json',
          }
        };
        return $http(req);
      },
    };
  });
