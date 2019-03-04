'use strict';

angular.module('restaurantclientApp')
  .controller('RegisterCtrl', function ($window, $scope, RegisterService, LocationService) {
    $scope.$on('$routeChangeSuccess', function(){
      console.log('test');
      LocationService.getCountries().then(function (res) {
        var json = res.data;
        json.unshift({country : 'Country', disabled : true});
        $scope.countries = json;
      });
    });
   /* $scope.info = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNum: '',
      country: '',
      city: '',
      pass: '',
      confirmPass: ''
    };*/

    $scope.registerFun = function () {
      var register = {
        firstName: $scope.info.first,
        lastName: $scope.info.last,
        email: $scope.info.email,
        phoneNum: $scope.info.phone,
        country: $scope.info.country,
        city: $scope.info.city,
        password: $scope.info.pass
      };

      RegisterService.register(register).then(function () {
          $window.location.href = '/#/login';
      }).catch(function (){
        $scope.error='Email is already registered.';
      });
    };
    $scope.updateCities = function(){
      var body = {
        countryId : $scope.info.country
      };
      LocationService.getCities(body).then(function (res) {
        var json = res.data;
        //json.unshift({country : 'City', disabled : true});
        $scope.cities = json;
      });
    };


  });
