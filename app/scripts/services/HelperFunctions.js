'use strict';
angular.module('restaurantclientApp')
  .run(function($rootScope){
  $rootScope.populateRestaurants = function(vm, json, $scope){
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
    };
});
