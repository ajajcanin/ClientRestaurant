'use strict';
angular.module('restaurantclientApp')
  .directive('ratingDollars', function(){
    var directive = {
      require: '?ngModel',
      restrict: 'E',
      template: ''+
        '<div ng-class="{ hover: vm.mutable, mutable: vm.mutable }" class = "stars-div">'+
        '<span ng-if="vm.ratingsPosition === \'left\'" class="ratings-left">({{vm.ratings}})</span>'+
        [1, 2, 3, 4, 5].map(function(num) {
          return '<i ng-mouseover="vm.mouseover(' + num + ')" '+
            'ng-mouseout="vm.mouseout()" '+
            'ng-click="vm.click()" '+
            'ng-class="vm.getClass(' + num + ')" '+
            'class="dollar hover material-icons"></i>';
        }).join('')+
        '<span ng-if="vm.ratingsPosition === \'right\'" class="ratings-right">({{vm.ratings}})</span>'+
        '</div>',
      scope: {
        ratings: '<',
        averageRating: '<',
        ratingsPosition: '@'
      },
      link: function (scope, element, attrs, ngModel) {
        var vm = scope.vm;
        var myRating = null;

        // Bind data
        vm.mutable = false;



        /*
        * Private functions
        */
        function init() {
          vm.mutable = !!ngModel;

          if (ngModel) {
            ngModel.$render = function() {
              myRating = ngModel.$viewValue;
            };
          }
        }

        /*
        * Public functions
        */
        function getClass(num) {
          return {
            on: vm.averageRating >= num || myRating >= num,
            'on-half': vm.averageRating > myRating && vm.averageRating < num && vm.averageRating >= num - 0.75,
            my: myRating >= num,
          };
        }

        function mouseover(rating) {
          if (ngModel) {
            myRating = rating;
          }
        }

        function mouseout() {
          if (ngModel) {
            myRating = ngModel.$viewValue;
          }
        }

        function click() {
          if (ngModel) {
            ngModel.$setViewValue(myRating);
          }
        }


        // Bind functions
        vm.getClass = getClass;
        vm.mouseover = mouseover;
        vm.mouseout = mouseout;
        vm.click = click;

        // Initialise
        init();
      },
      controller: angular.noop,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;


  });
