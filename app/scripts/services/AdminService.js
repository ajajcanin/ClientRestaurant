'use strict';
angular.module('restaurantclientApp')
  .factory('AdminService', function ($http) {
    return {
      addRestaurant: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/addRestaurant',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      editRestaurant: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/editRestaurant',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      deleteRestaurant: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/deleteRestaurant',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      addCategory: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/addCategory',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      editCategory: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/editCategory',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      deleteCategory: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/deleteCategory',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      addLocation: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/addLocation',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      editLocation: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/editLocation',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      deleteLocation: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/deleteLocation',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      addUser: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/addUser',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      editUser: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/editUser',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      deleteUser: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/deleteUser',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      getUserPagination: function (data) {
        var req = {
          method: 'POST',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/usersPagination',
          data: data,
          header:{
            'Content-Type' : 'application/json'
          }
        };
        return $http(req);
      },
      getCounters: function () {
        var req = {
          method: 'GET',
          url: 'https://ajdinsrestaurantsapp.herokuapp.com/app/counters'
        };
        return $http(req);
      },
    };
  });
