'use strict';

angular.module('restaurantclientApp')
  .controller('ReservationCtrl', function ($scope, SharedContext, $window, ReservationService) {
    $scope.reservation = {
      numGuests : '',
      time : '',
      date : ''
    };
    $scope.restaurant = {
      imageFileName : '',
      restaurantName : ''
    };
    $scope.$on('$routeChangeSuccess', function() {
      $scope.reservation = SharedContext.getData();
      $scope.restaurant.imageFileName = JSON.parse($window.localStorage.getItem('restaurant')).imageFileName;
      $scope.restaurant.restaurantName = JSON.parse($window.localStorage.getItem('restaurant')).restaurantName;
    });

    $scope.makeReservation = function(){
      var data = {
        guests : $scope.reservation.numGuests,
        date : $scope.reservation.date,
        time : $scope.reservation.time,
        user : $window.localStorage.getItem('userInfo'),
        idRestaurant : JSON.parse($window.localStorage.getItem('restaurant')).id
      };
      console.log(data.date.getDay());
      ReservationService.makeReservation(data).then(function(){

      });
    };
  });
