'use strict';

angular.module('restaurantclientApp')
  .controller('LogoutCtrl', function ($window, authManager, $scope) {
    $scope.logout = function(){
      $window.localStorage.setItem('token', '');
      $window.localStorage.setItem('userInfo', '');
      authManager.unauthenticate();
    };
  });
