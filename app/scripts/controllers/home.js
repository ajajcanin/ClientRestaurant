

'use strict';

/**
 * @ngdoc function
 * @name restaurantclientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantclientApp
 */
angular.module('restaurantclientApp')
  .controller('HomeCtrl', function ($scope, RestaurantService) {
    $scope.reservation = {
      nameRes: ''
    };
    $scope.search = function(){
      var place = {
        search : $scope.reservation.nameRes,
        test : 'ttest1'
      };
      RestaurantService.getRestaurants(place).then(function (res){
        $scope.reservation = res;
      });
    };

  })

  .controller('RestCtrl', function ($scope, RestaurantService) {

    var vm = this;
  $scope.$on('$routeChangeSuccess', function(){
    console.log('00Test');
    RestaurantService.getRandomRestaurants().then(function(res){
      var json = res.data;
      $scope.restaurants = json;
      console.log(json.map(obj => obj.priceRange));

      vm.ratings = 25;
      vm.averageRating = json.map(obj => obj.priceRange);
      vm.ratingsPosition = 'right';
      vm.formData = {
        myRating: 2
      };
      vm.ratingChange = function() {
        console.log('My rating changed to: ' + vm.formData.myRating);
      };

      //var prices = json.map(obj => obj.priceRange);
      //SharedContext.addData(prices);
      //console.log(SharedContext.getData());
    });
  });
  })


  .controller('myCtrl', function ($scope, SharedContext) {


  })


  .controller('LocationCtrl', function ($scope, LocationService) {
    $scope.$on('$routeChangeSuccess', function(){
      console.log('00Test');
      LocationService.getPopularLocations().then(function(res){
        $scope.locations = res.data;
        console.log(res);
      });
    });
  });
