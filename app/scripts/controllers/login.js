'use strict';
angular.module('restaurantclientApp')
  .controller('LoginCtrl', function ($location, $http, $scope, $window, $rootScope, LoginService, authManager) {
    $scope.credentials = {
      email: '',
      pass: ''
    };

    $scope.loginFun = function(){
      var loginInfo = {
        email : $scope.credentials.email,
        password : $scope.credentials.pass
      };

      (function initController(){
        $window.localStorage.setItem('token', '');
        authManager.unauthenticate();
      })();

      LoginService.login(loginInfo).then(function (res){
        console.log(res.status);
          $window.localStorage.setItem('token', res.headers('authorization'));
          $window.localStorage.setItem('userInfo', $scope.credentials.email);
          LoginService.isAdmin($scope.credentials.email).then(function(res){
            $window.localStorage.setItem('userType', res.data);
            $window.location.href = '/#/home';
            authManager.authenticate();
          });
      }).catch(function (){
        $scope.error='Email or password is incorrect!';
      });
    };
  });
