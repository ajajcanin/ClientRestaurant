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
  .controller('AdminRestaurantsCtrl', function ($scope, RestaurantService, $rootScope, FireService, LocationService, CousineService, AdminService){
    $scope.imageSrc = {
      profile : null,
      cover : null
    };
    $scope.restaurantInfo = {
      id: '',
      restaurantName: '',
      description: '',
      latitude: '',
      longitude: '',
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
    LocationService.getCountries().then(function (res) {
      var json = res.data;
      json.unshift({country : 'Country', disabled : true});
      $scope.countries = json;
    });
    $scope.updateCities = function(){
      var body = {
        countryId : $scope.restaurantInfo.country
      };
      LocationService.getCities(body).then(function (res) {
        var json = res.data;
        //json.unshift({country : 'City', disabled : true});
        $scope.cities = json;
      });
    };
    CousineService.getAllCousines().then(function(res){
      $scope.cousines = res.data;
      //$scope.cousines = json.map(obj => obj.name.toString());
    });
    $scope.activeCategories=[];
    $scope.foodType=[];
    $scope.addCategory=function(id){
      if($scope.activeCategories.indexOf($scope.cousines[id-1]) === -1){
        $scope.activeCategories.push($scope.cousines[id-1]);
        $scope.foodType.push(id);
      }
      console.log($scope.foodType);
    };
    $scope.deleteActiveCategory=function(index){
        $scope.activeCategories.splice(index,1);
        $scope.foodType.splice(index,1);
    };
    $scope.searchRestaurants = function(){
     var data = {
      itemsPerPage : 9,
      pageNumber : $scope.currentPage,
      searchText : '', //scope.search!
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
      $scope.restaurantInfo.latitude=$scope.map.getCenter().lat();
      $scope.restaurantInfo.longitude=$scope.map.getCenter().lng();
    };

    $scope.edit = function(restaurant){
      RestaurantService.getExtraDetails(restaurant.id).then(function(res){
        $scope.restaurantInfo = restaurant;
        $scope.imageSrc.profile = restaurant.imageFileName;
        $scope.gmap.pos = [res.longitude, res.latitude];
        $scope.restaurantInfo.description = res.description;
        $scope.restaurantInfo.country = res.city.country.id;
        $scope.restaurantInfo.city = res.city.id;
        $scope.activeCategories=res.cousines.map(obj => obj.name.toString());
        $scope.foodType=res.cousines.map(obj => obj.id);
      });
      console.log(restaurant);
    };
    $scope.addRestaurant = function(){
      FireService.uploadImage($scope.imageSrc.profile, function(profileUrl){
        $scope.restaurantInfo.imageFileName=profileUrl;
        FireService.uploadImage($scope.imageSrc.cover, function (coverUrl) {
          $scope.restaurantInfo.coverFileName=coverUrl;
          AdminService.addRestaurant($scope.restaurantInfo).then(function(res){
            console.log('dodan!');
          });
        });
      });
    };
  })

  .controller('AdminLocationCtrl', function ($scope, LocationService) {
    $scope.location={
      id: '',
      city: '',
      country: ''
    };

    $scope.searchLocations = function(){
      var data = {
        itemsPerPage : 9,
        pageNumber : $scope.currentPage,
        searchText : '', //scope.search!
      };

      LocationService.getCitiesPagination(data).then(function(res){
        var json = res.data.locations;
        var numPages = res.data.numberOfRestaurantPages;
        if(!Object.keys(json).length){
          $scope.notEmpty = false;
        } else {
          $scope.notEmpty = true;
          $scope.locations = json;
          $scope.numPerPage = 9;
          $scope.numPages = numPages;
          $scope.totalItems = res.data.totalItems;
          $scope.maxSize = 5;
        }
      });
    };
  })
  .controller('AdminCategoriesCtrl', function ($scope, CousineService) {
    $scope.categories={
      id: '',
      category: ''
    };

    $scope.searchCategories = function(){
      var data = {
        itemsPerPage : 9,
        pageNumber : $scope.currentPage,
        searchText : '', //scope.search!
      };

      CousineService.getCousinePagination(data).then(function(res){
        var json = res.data.categories;
        var numPages = res.data.numberOfRestaurantPages;
        if(!Object.keys(json).length){
          $scope.notEmpty = false;
        } else {
          $scope.notEmpty = true;
          $scope.locations = json;
          $scope.numPerPage = 9;
          $scope.numPages = numPages;
          $scope.totalItems = res.data.totalItems;
          $scope.maxSize = 5;
        }
      });
    };
  })
  .controller('AdminUsersCtrl', function ($scope, AdminService) {
    $scope.users={
      id: '',
      name: '',
      email: '',
    };

    $scope.searchLocations = function(){
      var data = {
        itemsPerPage : 9,
        pageNumber : $scope.currentPage,
        searchText : '', //scope.search!
      };

      AdminService.getUsersPagination(data).then(function(res){
        var json = res.data.users;
        var numPages = res.data.numberOfRestaurantPages;
        if(!Object.keys(json).length){
          $scope.notEmpty = false;
        } else {
          $scope.notEmpty = true;
          $scope.locations = json;
          $scope.numPerPage = 9;
          $scope.numPages = numPages;
          $scope.totalItems = res.data.totalItems;
          $scope.maxSize = 5;
        }
      });
    };
  });
