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
  .controller('AdminDashboardCtrl', function ($scope, AdminService) {
    AdminService.getCounters().then(function (res){
      $scope.counter = res.data;
    });

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
      var temp = $scope.cousines.find(obj => obj.id === id);
      console.log(id);
      if($scope.activeCategories.map(obj => obj.id).indexOf(id) === -1){
        $scope.activeCategories.push(temp);
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
        console.log('test');
        res=res.data;
        $scope.restaurantInfo = restaurant;
        $scope.imageSrc.profile = restaurant.imageFileName;
        $scope.imageSrc.cover = restaurant.coverFileName;
        $scope.restaurantInfo.priceRange = restaurant.priceRange;
        $scope.gmap.pos = [res.longitude, res.latitude];
        $scope.restaurantInfo.description = res.description;
        $scope.restaurantInfo.country = res.city.country.id;
        $scope.updateCities();
        $scope.restaurantInfo.city = res.city.id;
        $scope.activeCategories=res.cousines;
        $scope.foodType=res.cousines.map(obj => obj.id);
      });
      console.log('hhhhhhh'+restaurant);
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

  .controller('AdminLocationCtrl', function ($scope, $rootScope, LocationService) {
    $scope.currentPage= 1;
    $rootScope.show = true;
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

      console.log('Lokacije1001');
      LocationService.getCitiesPagination(data).then(function(res){
        console.log('Lokacije100');
        var json = res.data.locations;
        console.log('Lokacije' + json);
        var numPages = res.data.numberOfRestaurantPages;
        if(!Object.keys(json).length){
          $scope.notEmpty = false;
        } else {
          $scope.notEmpty = true;
          $scope.cities = json;
          $scope.numPerPage = 9;
          $scope.numPages = numPages;
          $scope.totalItems = res.data.totalItems;
          $scope.maxSize = 5;
        }
      });
    };
    $scope.searchLocations();

    $scope.pageChanged = function() {
      $scope.searchLocations();
    };

    $scope.edit = function(location) {
      $scope.location.city = location.city;
      $scope.location.country = location.country;
    };
  })
  .controller('AdminCategoriesCtrl', function ($scope, $rootScope, CousineService) {
    $scope.currentPage = 1;
    $rootScope.show = false;
    $scope.cousine={
      id: '',
      name: ''
    };

    $scope.searchCategories = function(){
      var data = {
        itemsPerPage : 9,
        pageNumber : $scope.currentPage,
        searchText : '', //scope.search!
      };

      CousineService.getCousinePagination(data).then(function(res){
        var json = res.data.cousines;
        console.log(json);
        var numPages = res.data.numberOfRestaurantPages;
        if(!Object.keys(json).length){
          $scope.notEmpty = false;
        } else {
          $scope.notEmpty = true;
          $scope.categories = json;
          $scope.numPerPage = 9;
          $scope.numPages = numPages;
          $scope.totalItems = res.data.totalItems;
          $scope.maxSize = 5;
        }
      });
    };
    $scope.searchCategories();
    $scope.pageChanged = function() {
      $scope.searchCategories();
    };

    $scope.edit = function(cousine) {
      $scope.cousine.name = cousine.name;

    };
  })
  .controller('AdminUsersCtrl', function ($scope, $rootScope, AdminService, LocationService) {
    LocationService.getCountries().then(function (res) {
      var json = res.data;
      json.unshift({country : 'Country', disabled : true});
      $scope.countries = json;
    });
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
    $scope.currentPage = 1;
    $scope.users = [];
    $rootScope.show = false;
    $scope.info = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      type: ''
    };
//DODATI PASSWORD ?
    $scope.searchUsers = function(){
      var data = {
        itemsPerPage : 9,
        pageNumber : $scope.currentPage,
        searchText : '', //scope.search!
      };

      AdminService.getUserPagination(data).then(function(res){
        var json = res.data.users;
        console.log(json);
        var numPages = res.data.numberOfRestaurantPages;
        if(!Object.keys(json).length){
          $scope.notEmpty = false;
        } else {
          $scope.notEmpty = true;
          $scope.users = json;
          $scope.numPerPage = 9;
          $scope.numPages = numPages;
          $scope.totalItems = res.data.totalItems;
          $scope.maxSize = 5;
        }
      });
    };
    $scope.searchUsers();
    $scope.pageChanged = function() {
      $scope.searchCategories();
    };

    $scope.edit = function(user) {
      $scope.info = {
        first: user.firstName,
        last: user.lastName,
        email: user.email,
        phone: user.phone,
      };
      $scope.info.country = 1;
      $scope.updateCities();
      $scope.info.city=2;
    };
  });
