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
      console.log($scope.reservation);
      $scope.restaurant.imageFileName = JSON.parse($window.localStorage.getItem('restaurant')).imageFileName;
      $scope.restaurant.restaurantName = JSON.parse($window.localStorage.getItem('restaurant')).restaurantName;
    });

    $scope.makeReservation = function(){
      var data = {
        guests : $scope.reservation.numGuests,
        date : $scope.reservation.date,
        time : $scope.reservation.time,
        tables : $scope.reservation.tables,
        duration : $scope.reservation.duration,
        user : $window.localStorage.getItem('userInfo'),
        idRestaurant : JSON.parse($window.localStorage.getItem('restaurant')).id
      };
      console.log(data.date.getDay());
      var token = $window.localStorage.getItem('token');
      ReservationService.makeReservation(data, token).then(function(){
        $window.location.href='#/restaurant';
      });
    };
  });
