'use strict';

/**
 * @ngdoc overview
 * @name restaurantclientApp
 * @description
 * # restaurantclientApp
 *
 * Main module of the application.
 */
var app = angular
  .module('restaurantclientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-jwt'
  ]);
app.config(function ($locationProvider) {
  $locationProvider.hashPrefix('');
  //$locationProvider.html5Mode(true);
});
app.config(function ($httpProvider, jwtOptionsProvider){
  $httpProvider.interceptors.push('jwtInterceptor');
  jwtOptionsProvider.config({
    whiteListedDomains: ['http://localhost:8080/', 'localhost'],
    tokenGetter: ['options', function(options){
      if(options.url.substr(options.url.length-5) === '.html') {return null;}
      return window.localStorage.getItem('token');
    }]
  });
});
app
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'LoginCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });
    app
      .run(function ($rootScope, $location, $http, $window){
      var userData = $window.sessionStorage.getItem('userData');
      console.log('userData  = ' + userData);
      if (userData) {
        $http.defaults.headers.common.Authorization = 'Basic ' + JSON.parse(userData).authData;
      }
      $rootScope
        .$on('$locationChangeStart', function (event, next, current) {
          var restrictedPage
            = $location.path().indexOf('/login') === -1;
          var loggedIn
            = $window.sessionStorage.getItem('userData');
          console.log('loggedIn:  = ' + loggedIn);
          if (restrictedPage && !loggedIn) {
            $location.path('/login');
          }
        });
    });
  });
