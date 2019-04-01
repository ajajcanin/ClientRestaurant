'use strict';

angular.module('restaurantclientApp')
  .controller('AdminCtrl', function ($scope, $rootScope) {
    $rootScope.show = false;
    $scope.btnValue = ['restaurants', 'locations', 'categories', 'users'];


    $scope.addNewElement = function(tab){
      console.log(tab);
      $scope.activeTab = tab;
      $rootScope.show = false;
    };

  })
  .controller('AdminDashboardCtrl', function ($scope) {

  })
  .controller('AdminRestaurantsCtrl', function ($scope, RestaurantService, $rootScope, FireService){
    $scope.imageSrc = {
      profile : null,
      cover : null
    };
    $scope.restaurantInfo = {
      restaurantName: '',
      description: '',
      latitude: '',
      longitude: '',
      mark: '',
      votes: '',
      priceRange: '',
      imageFileName: '',
      coverFileName: '',
      foodType: ''
    };

      $rootScope.show = true;
    $scope.notEmpty = false;
    $scope.currentPage= 1;
    $scope.gmap = {
      pos : [43.8563, 18.4131],
      center : [43.8563, 18.4131]
    };
  $scope.searchRestaurants = function(){

     var data = {
      itemsPerPage : 9,
      pageNumber : $scope.currentPage,
      searchText : '',
      filterPrice : '',
      filterRating : '',
      filterCousine : '',
      date: '',
      time: '',
      guests: ''
    };
    RestaurantService.getSearchedRestaurants(data).then(function(res){
      var json = res.data.restaurants;
      var numPages = res.data.numberOfRestaurantPages;
      if(!Object.keys(json).length){
        $scope.notEmpty = false;
      } else {
        $scope.notEmpty = true;
        $scope.restaurants = json;
        $scope.numPerPage = 9;
        $scope.numPages = numPages;
        $scope.totalItems = res.data.totalItems;
        $scope.maxSize = 5;
      }
    });
  };
  $scope.searchRestaurants();


  $scope.pageChanged = function() {
    $scope.searchRestaurants();
  };

  $scope.dragEnd = function (){
    $scope.gmap.pos = [$scope.map.getCenter().lat(),$scope.map.getCenter().lng()];
    console.log($scope.gmap);
  };


  $scope.addRestaurant = function(){
    FireService.uploadImage($scope.imagesSrc.profile, function(downloadURL){
      console.log(downloadURL);
    });
  };
});
