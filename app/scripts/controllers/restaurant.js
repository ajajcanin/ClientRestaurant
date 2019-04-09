'use strict';


angular.module('restaurantclientApp')
  .controller('RestaurantCtrl', function ($scope, $window, SharedContext, $uibModal, RestaurantService, $rootScope) {
    var vm = this;
    var id = null;
    $scope.isCollapsed = true;
    $scope.findTablesError=false;
    $scope.heightMenu = '100px';
    $scope.btnShowMenu = 'Show full menu';
    $scope.restaurant = {
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
    $scope.reservation={
      numGuests : '',
      time : '',
      date : ''
    };
    var reservationInfo = $rootScope.place;
    if(reservationInfo!=null){
      $scope.reservation.numGuests = reservationInfo.guests;
      $scope.reservation.time = reservationInfo.time;
      $scope.reservation.date = reservationInfo.date;
    }
    $scope.$on('$routeChangeSuccess', function(){
      //var json = SharedContext.getData();
      var json = JSON.parse($window.localStorage.getItem('restaurant'));
      id = json.id;
      $scope.restaurant=json;
      RestaurantService.getExtraDetails(id).then(function(res){
        $scope.restaurant.description = res.data.description;
      });
      $scope.todayDate= new Date();
      vm.ratings = json.votes;
      vm.averageRating = json.mark;
      vm.ratingsPosition = 'right';
      vm.formData = {
        myRating: 2
      };
      //uhvati description, longitude, latitude, menu
    });
    //funckcija za review
    $scope.review = function(){
      $uibModal.open({
        templateUrl: 'rateRestaurant.html',
        controller: 'modalInstanceCtrl'
      });
    };
    $scope.showMenu = function(){
      if($scope.heightMenu === '100px'){
        $scope.heightMenu = 'none';
        $scope.btnShowMenu = 'Show less';
      } else {
        $scope.heightMenu = '100px';
        $scope.btnShowMenu = 'Show full menu';
      }
    };
    $scope.findTables = function(){
      var data = {
        people: $scope.reservation.numGuests,
        date: $scope.reservation.date,
        hour: $scope.reservation.time,
        idRestaurant: id
      };

      if(!data.people ||  !data.date || !data.hour){
        $scope.findTablesError = true;
      } else {
        $scope.findTablesError = false;
        RestaurantService.checkReservationAvailability(data).then(function(res){
          $scope.reservations = res.data.reservations;
          $scope.tablesLeft = res.data.reservations.tables.size();
        }); //sta ako nema uopste stola
      }
    };

    $scope.confirmReservation = function(times){
      SharedContext.removeData();
      var reservation = {
        numGuests : $scope.reservation.numGuests,
        time : times.bestTime,
        date : $scope.reservation.date,
        tables : times.tableIds,
        duration: times.duration
      };
      SharedContext.addData(reservation);
      $window.location.href='#/reservation';
    };
  })
  .controller('modalInstanceCtrl', function ($scope, $rootScope, SharedContext, RestaurantService, $window){
    $scope.rateRestaurant= function(){

      var json = JSON.parse($window.localStorage.getItem('restaurant'));
      var id = json.id;
      var data = {
        mark: $scope.formData.myRating,
        emailUser: $window.localStorage.getItem('userInfo'),
        idRestaurant: id,
        comment: $scope.comment
      };
      RestaurantService.rateRestaurant(data, $window.localStorage.getItem('token')).then(function(res){
          var json = JSON.parse($window.localStorage.getItem('restaurant'));
          json.votes = res.data.ratings;
          json.mark = res.data.grade;
          $window.localStorage.setItem('restaurant', JSON.stringify(json));
          $window.location.reload();
      });
    };
  });
