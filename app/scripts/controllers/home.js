

'use strict';

/**
 * @ngdoc function
 * @name restaurantclientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantclientApp
 */
angular.module('restaurantclientApp')
  .controller('HomeCtrl', function ($scope, RestaurantService, SharedContext, $location) {
    $scope.todayDate= new Date();
    $scope.reservation = {
      nameRes: ''
    };
    $scope.search = function(){
      var place = {
        search : $scope.reservation.nameRes,
        guests : $scope.reservation.numGuests,
        date : $scope.reservation.date,
        time : $scope.reservation.time
      };
        SharedContext.removeData();
        SharedContext.addData(place);
        $location.path('/search/' + $scope.reservation.nameRes + '/guests/' + $scope.reservation.numGuests +
        '/date/' + $scope.reservation.date + '/time/' + $scope.reservation.time);
    };

  })

  .controller('RestCtrl', function ($scope, RestaurantService, $window) {

    var vm = this;
  $scope.$on('$routeChangeSuccess', function(){
    console.log('00Test');
    RestaurantService.getRandomRestaurants().then(function(res){
      var json = res.data.restaurants;
      $scope.restaurants = json;
      vm.ratings = json.map(obj => obj.votes.toString());
      vm.averageRating = json.map(obj => obj.mark);
      vm.ratingsPosition = 'right';
      vm.formData = {
        myRating: 2
      };
      vm.averageRatingDollar = json.map(obj => obj.priceRange);
      vm.ratingChange = function() {
        console.log('My rating changed to: ' + vm.formData.myRating);
      };

      $scope.viewRestaurant = function(clickEvent){
        $window.localStorage.setItem('restaurant', JSON.stringify(json[clickEvent.target.parentElement.id]));
        $window.location.href='#/restaurant';
      };

      //var prices = json.map(obj => obj.priceRange);
      //SharedContext.addData(prices);
      //console.log(SharedContext.getData());
    });
  });
  })


  .controller('fakeSpecialsCtrl', function ($scope) {
    $scope.getSecondIndex = function(index) {
      if (index - 6 >= 0) {
        return index - 6;
      } else {
        return index;
      }
    };
    $scope.$on('$routeChangeSuccess', function(){
      $scope.meals = [];
      $scope.meals.push( {
        img: 'https://cdn.pixabay.com/photo/2016/02/19/11/30/pizza-1209748_960_720.jpg',
        title: 'Best Pizza of 2016',
        city: 'New York',
        numRes: '43 restaurants'
      });
      $scope.meals.push( {
        img: 'https://cdn.pixabay.com/photo/2017/01/20/19/12/chili-1995689_960_720.jpg',
        title: 'Fresh & Spicy',
        city: 'Philadelphia',
        numRes: '16 restaurants'
      });
      $scope.meals.push({
        img: 'https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_960_720.jpg',
        title: 'Cupcakes Flavor',
        city: 'Chicago',
        numRes: '11 restaurants'
      });
      $scope.meals.push({
        img: 'https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_960_720.jpg',
        title: 'Shish Kebab',
        city: 'Madrid',
        numRes: '26 restaurants'
      });
      $scope.meals.push( {
        img: 'https://cdn.pixabay.com/photo/2017/01/16/17/45/pancake-1984716_960_720.jpg',
        title: 'Pancakes',
        city: 'Moscow',
        numRes: '54 restaurants'
      });
      $scope.meals.push( {
        img: 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg',
        title: 'Sushi',
        city: 'Tokyo',
        numRes: '35 restaurants'
      });
    });
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

