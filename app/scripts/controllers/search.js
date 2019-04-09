'use strict';
angular.module('restaurantclientApp')
  .controller('SearchCtrl', function ($scope, $window, $routeParams, RestaurantService, CousineService) {
    $scope.reservation = {
      nameRes : '',
      filter : ''
    };
    $scope.filterCousine = "";
    $scope.formData = {
      priceRange : "",
      myRating: ""
    };
    $scope.params = {
      guests: '',
      date: '',
      time: ''
    };
    $scope.notEmpty = false;
    $scope.noFilter = false;
    $scope.currentPage = 1;
    $('.dropdown-menu').click(function (e){
      e.stopPropagation();
    });
    document.getElementById("filter-cousine").onmousedown = function(e){
      e.preventDefault();
      e.target.selected = !e.target.selected;
    };
    CousineService.getAllCousines().then(function(res){
      var cousineData = res.data;
      $scope.cousines = cousineData.map(obj => obj.name.toString());
    });
    var json = {};
    var searchText = '';
    var vm = this;
    var vmDollar = this;
    $scope.search = function(){
      var filteredCousines = [];
      var opts = document.getElementById("filter-cousine").options;
      for(var i = 0; i< opts.length; i++){
        if(opts[i].selected){
          filteredCousines.push(opts[i].value);
        }
      }
      var data = {
        itemsPerPage : 9,
        pageNumber : $scope.currentPage,
        searchText : $scope.reservation.nameRes,
        filterPrice : $scope.formData.priceRange,
        filterRating : $scope.formData.myRating,
        filterCousine : filteredCousines.toString(),
        date: $scope.params.date,
        time: $scope.params.time,
        guests: $scope.params.guests,
      };

      RestaurantService.getSearchedRestaurants(data).then(function (res){
        console.log("filteri: " + data);
        json = res.data.restaurants;
        var numPages = res.data.numberOfRestaurantPages;
        if(!Object.keys(json).length){
          $scope.notEmpty = false;
        } else {
          $scope.notEmpty = true;
          $scope.restaurants = json;
          vm.ratings = json.map(obj => obj.votes.toString());
          vm.averageRating = json.map(obj => obj.mark);
          vm.ratingsPosition = 'right';
          vm.formData = {
            myRating: 2
          };
          vm.averageRatingDollar = json.map(obj => obj.priceRange);
          $scope.numPerPage = 9;
          $scope.numPages = numPages;
          $scope.totalItems = res.data.totalItems;
          $scope.maxSize = 5;
        }
      });
    };
    $scope.$on('$routeChangeSuccess', function(){
      if($routeParams.value){
        $scope.reservation.nameRes = $routeParams.value;
        $scope.params.guests = $routeParams.guests;
        $scope.params.date = Date.parse($routeParams.date);
        $scope.params.time = Date.parse($routeParams.time);
        $scope.noFilter = true;

        $scope.search();
      } else {
        $scope.reservation.nameRes = '';
        $scope.reservation.filter='';
        $scope.search();
      }
    });


    $scope.searchHandler = function(){
      searchText = $scope.reservation.nameRes;
      $scope.currentPage = 1;
      $scope.search();
    };
    $scope.pageChanged = function() {
     $scope.search();
    };
    $scope.viewRestaurant = function(clickEvent){
      $window.localStorage.setItem('restaurant', JSON.stringify(json[clickEvent.target.parentElement.id]));
      $window.location.href='#/restaurant';
    };
    $scope.closeAlert = function(){
      $window.location.href='#/search';
    };
  });
