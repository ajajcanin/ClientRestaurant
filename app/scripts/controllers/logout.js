'use strict';

angular.module('restaurantclientApp')
  .controller('LogoutCtrl', function ($window, authManager, $scope, $rootScope) {
    $scope.logout = function(){
      $window.localStorage.setItem('token', '');
      $window.localStorage.setItem('userInfo', '');
      $rootScope.isAdmin = false;
      authManager.unauthenticate();
    };
  });

