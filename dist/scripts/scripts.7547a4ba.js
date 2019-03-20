"use strict";var app=angular.module("restaurantclientApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","angular-jwt","ui.bootstrap","ngMap","ngMaterial","ui.carousel"]);app.config(["$locationProvider",function(e){e.hashPrefix("")}]),app.config(["$httpProvider","jwtOptionsProvider",function(e,t){e.interceptors.push("jwtInterceptor"),t.config({whiteListedDomains:["http://localhost:8080/","localhost","https://ajdinsrestaurantsapp.herokuapp.com/"],tokenGetter:["options",function(e){return e&&".html"===e.url.substr(e.url.length-5)?null:window.localStorage.getItem("token")}]})}]),app.config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl",controllerAs:"register"}).when("/search/",{templateUrl:"views/search.html",controller:"SearchCtrl",controllerAs:"search"}).when("/search/:value?/guests/:guests?/date/:date?/time/:time?",{templateUrl:"views/search.html",controller:"SearchCtrl",controllerAs:"search"}).when("/restaurant",{templateUrl:"views/restaurant.html",controller:"RestaurantCtrl",controllerAs:"restaurant"}).when("/reservation",{templateUrl:"views/reservation.html",controller:"RestaurantCtrl",controllerAs:"restaurant",date:{authorization:!0,redirectTo:"login"}}).otherwise({redirectTo:"/"})}]),app.run(["$rootScope","$location","$http","$window","authManager",function(e,t,a,n,s){n.localStorage.getItem("token");s.checkAuthOnRefresh(),e.$on("$locationChangeStart",function(e,a,s){console.log("token  = ");var i=-1===t.path().indexOf("/login"),r=n.localStorage.getItem("token"),o=-1!==t.path().indexOf("/reservation");console.log("loggedIn:  = "+r),console.log("reservationPage"+o),i&&!r&&o&&t.path("/login")})}]),angular.module("restaurantclientApp").controller("HomeCtrl",["$scope","RestaurantService","SharedContext","$location",function(e,t,a,n){e.reservation={nameRes:""},e.search=function(){var t={search:e.reservation.nameRes,guests:e.reservation.numGuests,date:e.reservation.date,time:e.reservation.time};a.removeData(),a.addData(t),n.path("/search/"+e.reservation.nameRes+"/guests/"+e.reservation.numGuests+"/date/"+e.reservation.date+"/time/"+e.reservation.time)}}]).controller("RestCtrl",["$scope","RestaurantService",function(e,t){var a=this;e.$on("$routeChangeSuccess",function(){console.log("00Test"),t.getRandomRestaurants().then(function(t){var n=t.data;e.restaurants=n.restaurants,n.restaurants.votes?a.ratings=n.restaurants.votes:a.ratings=0,a.averageRating=n.restaurants.map(e=>e.marks),a.ratingsPosition="right",a.formData={myRating:2},a.ratingChange=function(){console.log("My rating changed to: "+a.formData.myRating)}})})}]).controller("fakeSpecialsCtrl",["$scope",function(e){e.getSecondIndex=function(e){return e-6>=0?e-6:e},e.$on("$routeChangeSuccess",function(){e.meals=[],e.meals.push({img:"https://cdn.pixabay.com/photo/2016/02/19/11/30/pizza-1209748_960_720.jpg",title:"Best Pizza of 2016",city:"New York",numRes:"43 restaurants"}),e.meals.push({img:"https://cdn.pixabay.com/photo/2017/01/20/19/12/chili-1995689_960_720.jpg",title:"Fresh & Spicy",city:"Philadelphia",numRes:"16 restaurants"}),e.meals.push({img:"https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_960_720.jpg",title:"Cupcakes Flavor",city:"Chicago",numRes:"11 restaurants"}),e.meals.push({img:"https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_960_720.jpg",title:"Shish Kebab",city:"Madrid",numRes:"26 restaurants"}),e.meals.push({img:"https://cdn.pixabay.com/photo/2017/01/16/17/45/pancake-1984716_960_720.jpg",title:"Pancakes",city:"Moscow",numRes:"54 restaurants"}),e.meals.push({img:"https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg",title:"Sushi",city:"Tokyo",numRes:"35 restaurants"})})}]).controller("LocationCtrl",["$scope","LocationService",function(e,t){e.$on("$routeChangeSuccess",function(){console.log("00Test"),t.getPopularLocations().then(function(t){e.locations=t.data,console.log(t)})})}]),angular.module("restaurantclientApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("restaurantclientApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("restaurantclientApp").controller("LoginCtrl",["$location","$http","$scope","$window","$rootScope","LoginService","authManager",function(e,t,a,n,s,i,r){a.credentials={email:"",pass:""},a.loginFun=function(){var e={email:a.credentials.email,password:a.credentials.pass};n.localStorage.setItem("token",""),r.unauthenticate(),i.login(e).then(function(e){console.log(e.status),n.localStorage.setItem("token",e.headers("authorization")),n.localStorage.setItem("userInfo",a.credentials.email),n.location.href="/#/home",r.authenticate()}).catch(function(){a.error="Email or password is incorrect!"})}}]),angular.module("restaurantclientApp").controller("RegisterCtrl",["$window","$scope","RegisterService","LocationService",function(e,t,a,n){t.$on("$routeChangeSuccess",function(){console.log("test"),n.getCountries().then(function(e){var a=e.data;a.unshift({country:"Country",disabled:!0}),t.countries=a})}),t.registerFun=function(){var n={firstName:t.info.first,lastName:t.info.last,email:t.info.email,phoneNum:t.info.phone,country:t.info.country,city:t.info.city,password:t.info.pass};a.register(n).then(function(){e.location.href="/#/login"}).catch(function(){t.error="Email is already registered."})},t.updateCities=function(){var e={countryId:t.info.country};n.getCities(e).then(function(e){var a=e.data;t.cities=a})}}]),angular.module("restaurantclientApp").controller("SearchCtrl",["$scope","$window","$routeParams","RestaurantService","CousineService",function(e,t,a,n,s){e.reservation={nameRes:"",filter:""},e.filterCousine="",e.formData={priceRange:"",myRating:""},e.params={guests:"",date:"",time:""},e.notEmpty=!1,e.noFilter=!1,e.currentPage=1,$(".dropdown-menu").click(function(e){e.stopPropagation()}),document.getElementById("filter-cousine").onmousedown=function(e){e.preventDefault(),e.target.selected=!e.target.selected},s.getAllCousines().then(function(t){var a=t.data;e.cousines=a.map(e=>e.name.toString())});var i={},r=this;e.search=function(){for(var t=[],a=document.getElementById("filter-cousine").options,s=0;s<a.length;s++)a[s].selected&&t.push(a[s].value);var o={itemsPerPage:9,pageNumber:e.currentPage,searchText:e.reservation.nameRes,filterPrice:e.formData.priceRange,filterRating:e.formData.myRating,filterCousine:t.toString(),date:e.params.date,time:e.params.time,guests:e.params.guests};console.log("filteri: "+o.filterPrice+" "+o.filterRating+" "+o.filterCousine),n.getSearchedRestaurants(o).then(function(t){i=t.data.restaurants;var a=t.data.numberOfRestaurantPages;Object.keys(i).length?(e.notEmpty=!0,e.restaurants=i,r.ratings=i.map(e=>e.votes.toString()),r.averageRating=i.map(e=>e.mark),r.ratingsPosition="right",r.formData={myRating:2},r.averageRatingDollar=i.map(e=>e.priceRange),e.numPerPage=9,e.numPages=a,e.totalItems=19,e.maxSize=5):e.notEmpty=!1})},e.$on("$routeChangeSuccess",function(){a.value?(e.reservation.nameRes=a.value,e.params.guests=a.guests,e.params.date=Date.parse(a.date),e.params.time=Date.parse(a.time),e.noFilter=!0,e.search()):(e.reservation.nameRes="",e.reservation.filter="",e.search())}),e.searchHandler=function(){e.reservation.nameRes,e.currentPage=1,e.search()},e.pageChanged=function(){e.search()},e.viewRestaurant=function(e){t.localStorage.setItem("restaurant",JSON.stringify(i[e.target.parentElement.id])),t.location.href="#/restaurant"},e.closeAlert=function(){}}]),angular.module("restaurantclientApp").controller("RestaurantCtrl",["$scope","$window","SharedContext","$uibModal","RestaurantService",function(e,t,a,n,s){var i=this,r=null;e.isCollapsed=!0,e.findTablesError=!1,e.heightMenu="100px",e.btnShowMenu="Show full menu",e.restaurant={restaurantName:"",description:"",latitude:"",longitude:"",mark:"",votes:"",priceRange:"",imageFileName:"",coverFileName:"",foodType:""},e.$on("$routeChangeSuccess",function(){var a=JSON.parse(t.localStorage.getItem("restaurant"));r=a.id,e.restaurant=a,s.getExtraDetails(r).then(function(t){e.restaurant.description=t.data.description}),e.todayDate=new Date,i.ratings=a.votes,i.averageRating=a.mark,i.ratingsPosition="right",i.formData={myRating:2}}),e.review=function(){n.open({templateUrl:"rateRestaurant.html",controller:"modalInstanceCtrl"})},e.showMenu=function(){"100px"===e.heightMenu?(e.heightMenu="none",e.btnShowMenu="Show less"):(e.heightMenu="100px",e.btnShowMenu="Show full menu")},e.findTables=function(){var t={people:e.reservation.numGuests,date:e.reservation.date,hour:e.reservation.time,idRestaurant:r};t.people&&t.date&&t.hour?(e.findTablesError=!1,s.checkReservationAvailability(t).then(function(t){e.tablesLeft=t.data.tablesLeft,e.bestTime=t.data.bestTime})):e.findTablesError=!0},e.confirmReservation=function(n){a.removeData();var s={numGuests:e.reservation.numGuests,time:e.bestTime[n.target.parentElement.id],date:e.reservation.date};a.addData(s),t.location.href="#/reservation"}}]).controller("modalInstanceCtrl",["$scope","$rootScope","SharedContext","RestaurantService","$window",function(e,t,a,n,s){e.rateRestaurant=function(){var t=JSON.parse(s.localStorage.getItem("restaurant")).id,a={mark:e.formData.myRating,emailUser:s.localStorage.getItem("userInfo"),idRestaurant:t,comment:e.comment};n.rateRestaurant(a,s.localStorage.getItem("token")).then(function(e){console.log("unesen")})}}]),angular.module("restaurantclientApp").controller("ReservationCtrl",["$scope","SharedContext","$window","ReservationService",function(e,t,a,n){e.reservation={numGuests:"",time:"",date:""},e.restaurant={imageFileName:"",restaurantName:""},e.$on("$routeChangeSuccess",function(){e.reservation=t.getData(),e.restaurant.imageFileName=JSON.parse(a.localStorage.getItem("restaurant")).imageFileName,e.restaurant.restaurantName=JSON.parse(a.localStorage.getItem("restaurant")).restaurantName}),e.makeReservation=function(){var t={guests:e.reservation.numGuests,date:e.reservation.date,time:e.reservation.time,user:a.localStorage.getItem("userInfo"),idRestaurant:JSON.parse(a.localStorage.getItem("restaurant")).id};console.log(t.date.getDay()),n.makeReservation(t).then(function(){})}}]),angular.module("restaurantclientApp").controller("LogoutCtrl",["$window","authManager","$scope",function(e,t,a){a.logout=function(){e.localStorage.setItem("token",""),e.localStorage.setItem("userInfo",""),t.unauthenticate()}}]),angular.module("restaurantclientApp").factory("RestaurantService",["$http",function(e){return{getRestaurants:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/search",data:t,headers:{}})},getRandomRestaurants:function(){return e({method:"GET",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/random",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"*","Access-Control-Allow-Headers":"*"}})},getSearchedRestaurants:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/getRestaurantsByFilter",data:t,headers:{"Content-Type":"application/json"}})},rateRestaurant:function(t,a){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/insertComment",data:t,headers:{"Content-Type":"application/json",Authorization:a}})},checkReservationAvailability:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/checkReservationAvailability",data:t,headers:{"Content-Type":"application/json"}})},makeReservation:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/makeReservation",data:t,headers:{"Content-Type":"application/json"}})},getExtraDetails:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/getExtraDetails",data:t,headers:{"Content-Type":"application/json"}})}}}]),angular.module("restaurantclientApp").factory("LoginService",["$http",function(e){return{login:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/login",data:t,headers:{"Content-Type":"application/json"}})}}}]),angular.module("restaurantclientApp").factory("RegisterService",["$http",function(e){return{register:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/register",data:t,headers:{"Content-Type":"application/json"}})}}}]),angular.module("restaurantclientApp").factory("LocationService",["$http",function(e){return{getPopularLocations:function(){return e({method:"GET",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/popular-locations"})},getCountries:function(){return e({method:"GET",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/countries"})},getCities:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/cities",data:t,header:{"Content-Type":"application/json"}})}}}]),angular.module("restaurantclientApp").factory("SharedContext",function(){var e={value:""};return{addData:function(t){e.value=t},getData:function(){return e.value},removeData:function(){e.value=null}}}),angular.module("restaurantclientApp").factory("ReservationService",["$http",function(e){return{makeReservation:function(t){return e({method:"POST",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/makeReservation",data:t,headers:{"Content-Type":"application/json"}})}}}]),angular.module("restaurantclientApp").factory("CousineService",["$http",function(e){return{getAllCousines:function(){return e({method:"GET",url:"https://ajdinsrestaurantsapp.herokuapp.com/app/cousines"})}}}]),angular.module("restaurantclientApp").directive("ratingStars",function(){return{require:"?ngModel",restrict:"E",template:'<div ng-class="{ hover: vm.mutable, mutable: vm.mutable }" class = "stars-div"><span ng-if="vm.ratingsPosition === \'left\'" class="ratings-left">({{vm.ratings}})</span>'+[1,2,3,4,5].map(function(e){return'<i ng-mouseover="vm.mouseover('+e+')" ng-mouseout="vm.mouseout()" ng-click="vm.click()" ng-class="vm.getClass('+e+')" class="star hover material-icons"></i>'}).join("")+'<span ng-if="vm.ratingsPosition === \'right\'" class="ratings-right">({{vm.ratings}})</span></div>',scope:{ratings:"<",averageRating:"<",ratingsPosition:"@"},link:function(e,t,a,n){var s=e.vm,i=null;s.mutable=!1,s.getClass=function(e){return{on:s.averageRating>=e||i>=e,"on-half":s.averageRating>i&&s.averageRating<e&&s.averageRating>=e-.75,my:i>=e}},s.mouseover=function(e){n&&(i=e)},s.mouseout=function(){n&&(i=n.$viewValue)},s.click=function(){n&&n.$setViewValue(i)},s.mutable=!!n,n&&(n.$render=function(){i=n.$viewValue})},controller:angular.noop,controllerAs:"vm",bindToController:!0}}),angular.module("restaurantclientApp").directive("ratingDollars",function(){return{require:"?ngModel",restrict:"E",template:'<div ng-class="{ hover: vm.mutable, mutable: vm.mutable }" class = "stars-div"><span ng-if="vm.ratingsPosition === \'left\'" class="ratings-left">({{vm.ratings}})</span>'+[1,2,3,4,5].map(function(e){return'<i ng-mouseover="vm.mouseover('+e+')" ng-mouseout="vm.mouseout()" ng-click="vm.click()" ng-class="vm.getClass('+e+')" class="dollar hover material-icons"></i>'}).join("")+'<span ng-if="vm.ratingsPosition === \'right\'" class="ratings-right">({{vm.ratings}})</span></div>',scope:{ratings:"<",averageRating:"<",ratingsPosition:"@"},link:function(e,t,a,n){var s=e.vm,i=null;s.mutable=!1,s.getClass=function(e){return{on:s.averageRating>=e||i>=e,"on-half":s.averageRating>i&&s.averageRating<e&&s.averageRating>=e-.75,my:i>=e}},s.mouseover=function(e){n&&(i=e)},s.mouseout=function(){n&&(i=n.$viewValue)},s.click=function(){n&&n.$setViewValue(i)},s.mutable=!!n,n&&(n.$render=function(){i=n.$viewValue})},controller:angular.noop,controllerAs:"vm",bindToController:!0}}),angular.module("restaurantclientApp").run(["$templateCache",function(e){e.put("views/about.html","<p>Restaurants...</p>"),e.put("views/header.html",'<div class="navbar navbar-default navbar-custom" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed colapse-custom" data-toggle="collapse" data-target="#js-navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/">AppName</a> </div> <div class="collapse navbar-collapse colapse-custom" id="js-navbar-collapse" ng-controller="LogoutCtrl"> <ul class="nav navbar-nav nav-custom"> <li><a href="#/home">Home</a></li> <li><a ng-href="#/search">Restaurants</a></li> <li><a ng-href="#/login" ng-if="!isAuthenticated">Login</a> <a ng-href="#/home" ng-click="logout()" ng-if="isAuthenticated">Log Out</a></li> </ul> </div> </div> </div>'),e.put("views/home.html",'\x3c!-- Search restourants --\x3e <div class="image-background text-center"> <div class="content"> <p>Make a free reservation</p> <p>Choose your table from n restaurants near you</p> <form class="form-horizontal form-search" ng-controller="HomeCtrl" ng-submit="search()"> <div class="col-sm-4 input-holder guests-div"><i class="material-icons search loop">search</i><input ng-model="reservation.nameRes" type="text" placeholder="Location, Restaurant or Cousine"></div> <div class="col-sm-2 input-holder guests-div"><i class="material-icons search">person</i><input ng-model="reservation.numGuests" type="number" placeholder="Guests"></div> <div class="col-sm-2 input-holder"><md-datepicker class="datepicker" ng-model="reservation.date" md-hide-icons="triangle" md-placeholder="Insert Date"></md-datepicker></div> <div class="col-sm-2 input-holder"><div class="timepicker-default" uib-timepicker ng-model="reservation.time" hour-step="1" minute-step="30" show-meridian="false" show-spinners="false"></div></div> <div class="col-sm-2 input-holder"><input type="submit" value="Find a table"></div> </form> </div> </div> \x3c!-- Random restourants --\x3e <div class="container random-restaurants-container" ng-controller="RestCtrl as vm"> <div class="header-home text-center">Popular for Lunch Today</div> <div class="col-md-4 col-sm-6 col-xs-12 text-margin-random-restaurant" ng-repeat="item in restaurants"> <div class="random-restaurant-content"> <img class="img-rand img-responsive" ng-src="{{item.imageFileName}}"> <div class="random-restaurant-name">{{item.restaurantName}}</div>\x3c!--item.name/rate/price--\x3e <div class="random-restaurant-rate"> <rating-stars ratings="vm.ratings" average-rating="vm.averageRating[$index]" ratings-position="{{vm.ratingsPosition}}"> </rating-stars> </div> <div class="random-restaurant-name search-food-type">{{item.foodType}}</div> <input type="submit" value="Reserve Now"> </div> \x3c!--cousines--\x3e </div> </div> \x3c!-- Specials / hardcoded --\x3e <div class="div-noodles" ng-controller="fakeSpecialsCtrl"> <div class="noodles-title">Specials</div> <div uib-carousel class="carousel-custom" active="0"> <div uib-slide ng-repeat="meal in meals" index="$index"> <div class="col-sm-4 specials-object"> <div class="random-restaurant-content"> <img class="specials-img" ng-src="{{meal.img}}"> <h1>{{meal.title}}</h1> <p>{{meal.city}} | {{meal.numRes}}</p> </div> </div> <div class="col-sm-4 specials-object"> <div class="random-restaurant-content"> <img class="specials-img" ng-src="{{meals[getSecondIndex($index+1)].img}}"> <h1>{{meals[getSecondIndex($index+1)].title}}</h1> <p>{{meals[getSecondIndex($index+1)].city}} | {{meals[getSecondIndex($index+1)].numRes}}</p> </div> </div> <div class="col-sm-4 specials-object"> <div class="random-restaurant-content"> <img class="specials-img" ng-src="{{meals[getSecondIndex($index+2)].img}}"> <h1>{{meals[getSecondIndex($index+2)].title}}</h1> <p>{{meals[getSecondIndex($index+2)].city}} | {{meals[getSecondIndex($index+2)].numRes}}</p> </div> </div> </div> </div> </div> \x3c!-- Locations / hardcoded --\x3e <div class="container locations" ng-controller="LocationCtrl"> <div class="text-center popular-locations-title">Popular locations</div> <div class="col-md-3 col-sm-4 col-xs-6 random-restaurant-content" ng-repeat="location in locations"> <div class="location-content"> <div class="loc-city-name">{{location.city}}</div> <div class="loc-restaurant-number">{{location.restaurantNum}} restaurants</div> </div> </div> </div>'),e.put("views/login.html",'<div class="gray-background row center-block"> <form name="form" ng-submit="loginFun()" role="form" class="validation-form"> <div class="error-div" ng-if="error">{{error}}</div> <div class="col-md-6 login-text-div">Login</div> <div class="col-md-6 text-right register-link-div"> <a ng-href="#/register" class="register-link">Create  Account</a></div> <div class="div-fields"> <input type="email" name="email" class="fields" id="email" placeholder="Email" ng-model="credentials.email" required> <span ng-show="form.email.$touched\n            && form.email.$invalid">Email is not valid</span> </div> <div class="div-fields"> <input type="password" class="fields" name="pass" id="pass" placeholder="Password" ng-model="credentials.pass" required> <span ng-show="form.pass.$touched\n            && form.pass.$invalid">Password is required</span> </div> <div class="div-btn-login"> <input type="submit" class="btn-login" ng-disabled="form.$invalid || credentials.dataLoading" value="Login"> </div> </form> </div>'),e.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.c582c4d1.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),e.put("views/register.html",'<div class="gray-background row center-block container" ng-controller="RegisterCtrl"> <form name="form" ng-submit="registerFun()" role="form" class="validation-form"> <div class="error-div" ng-if="error">{{error}}</div> <div class="col-md-6 login-text-div">Create Account</div> <div class="col-md-6 text-right register-link-div"> <a href="#/login" class="register-link">Login</a></div> \x3c!--first name--\x3e <div class="div-fields"> <input type="text" name="first" class="fields" id="first" placeholder="First Name" ng-model="info.first" required> <span ng-show="form.first.$touched\n            && form.first.$invalid">First Name is required</span> </div> \x3c!--last name--\x3e <div class="div-fields"> <input type="text" name="last" class="fields" name="last" placeholder="Last Name" ng-model="info.last" required> <span ng-show="form.last.$touched\n            && form.last.$invalid">Last Name is required</span> </div> \x3c!--email--\x3e <div class="div-fields"> <input type="email" name="email" class="fields" id="email" placeholder="Email" ng-model="info.email" required> <span ng-show="form.email.$touched\n            && form.email.$invalid">Email is not valid</span> </div> \x3c!--Phone Number--\x3e <div class="div-fields"> <input type="text" name="phone" class="fields" id="phone" placeholder="Phone Number" ng-model="info.phone" required> <span ng-show="form.phone.$touched\n            && form.phone.$invalid">Phone Number is required</span> </div> \x3c!--country & city --\x3e <div class="div-fields row"> <div class="col-md-7"> <select name="country" class="fields" ng-model="info.country" ng-options="item.id as item.country disable when item.disabled for item in countries" ng-change="updateCities()" required> </select> <span ng-show="form.country.$touched\n            && form.country.$invalid">Country is required</span> </div> <div class="col-md-5"> <select type="text" name="city" class="fields" ng-model="info.city" ng-options="item as item.city disable when item.disabled for item in cities" required> </select> <span ng-show="form.city.$touched\n            && form.city.$invalid">City is required</span> </div> </div> \x3c!--pass--\x3e <div class="div-fields"> <input type="password" class="fields" name="pass" id="pass" placeholder="Password" ng-model="info.pass" required> <span ng-show="form.pass.$touched\n            && form.pass.$invalid">Password is required</span> </div> \x3c!--confirm pass--\x3e <div class="div-fields"> <input type="password" class="fields" name="passConf" id="passConf" placeholder="Confirm Password" ng-model="info.passConf" required> <span ng-show="form.passConf.$touched\n            && info.passConf!=info.pass" class="password-match">Your password and confirmation password do not match.</span> </div> <div class="div-btn-login"> <input type="submit" class="btn-login" ng-disabled="form.$invalid || info.dataLoading" value="Create Account"> </div> </form> </div>'),e.put("views/reservation.html",'<h1 class="complete-reservation-txt">Complete your reservation</h1> <div> <form name="reservation-form" ng-submit="makeReservation()" ng-controller="ReservationCtrl"> <div class="reservation-details"> <div class="container"> <div class="row"> <div class="col-md-3"> <h2 class="details-reservation">Reservation details</h2> <img class="profile-image" ng-src="{{restaurant.imageFileName}}"> </div> <div class="col-md-4 move-col-below"> <h3 class="details-titles">RESTAURANT</h3> <p class="reservation-restaurant-name">{{restaurant.restaurantName}}</p> <h3 class="details-titles">GUESTS</h3> <p class="reservation-other">{{reservation.numGuests}}</p> </div> <div class="col-md-5 move-col-below"> <h3 class="details-titles">DATE</h3> <p class="reservation-other">{{reservation.date | date: \'dd/MM/yyyy\'}}</p> <h3 class="details-titles">TIME</h3> <p class="reservation-other">{{reservation.time}}</p> </div> </div> </div> </div> <input class="complete-reservation-btn" type="submit" value="Complete Reservation"> </form> </div> <p ng-if="!isAuthenticated">Log in to complete reservation!</p>'),e.put("views/restaurant.html",'<div class="cover-image"> <div class="content-profile"> </div> <div class="container profile-container" ng-controller="RestaurantCtrl as vm"> <div class="row"> <div class="col-md-3 hidden-xs hidden-sm"> <div class="random-restaurant-content"> <img class="profile-image" ng-src="{{restaurant.imageFileName}}"> <div class="list-group"> <a class="list-group-item">Reservation</a> <a class="list-group-item">About</a> <a class="list-group-item">Menu</a> <a class="list-group-item">Galery</a> </div> </div> </div> <div class="col-md-9"> <div class="profile-main"> <div id="header-name"><p>{{restaurant.restaurantName}}</p></div> <ul class="restaurant-info"> <rating-stars ratings="vm.ratings" average-rating="vm.averageRating" ratings-position="{{vm.ratingsPosition}}"> </rating-stars> \x3c!--li>{{restaurant.priceRange}}</li--\x3e <li class="food-type-restaurant">{{restaurant.foodType}}</li> </ul> <div class="review-btn"><button class="btn" type="submit" ng-click="review()"><i class="material-icons">star</i> <span>Rate this place</span></button></div> </div> \x3c!-- main part--\x3e <div class="profile-reservation"> <div class="container profile-filter-reservation"> <p>Make a free reservation</p> <form class="form-horizontal" ng-submit="findTables()"> <div class="row"> <div class="col-sm-3 input-holder guests-div"><i class="material-icons search">person</i><input ng-model="reservation.numGuests" type="number" placeholder="Guests" onfocus="isCollapsed=true" required></div> <div class="col-sm-3 input-holder"> <md-datepicker ng-model="reservation.date" md-hide-icons="triangle" md-placeholder="Insert Date" onfocus="isCollapsed=true" md-open-on-focus="true" md-min-date="todayDate" required></md-datepicker></div> <div class="col-sm-3 input-holder"><div class="timepicker-default" uib-timepicker ng-model="reservation.time" hour-step="1" minute-step="30" show-meridian="false" show-spinners="false" onfocus="isCollapsed=true" required></div> </div> <div class="col-sm-3 input-holder"> <input type="submit" value="Find a table" ng-click="isCollapsed = false"> </div> <div uib-collapse="isCollapsed"> <div class="collapsing-part"> <div class="availability-text"> Availability on {{reservation.date | date:\'MMM\'}} {{reservation.date | date:\'dd\'}}, {{reservation.date | date:\'yyyy\'}} around {{reservation.time | date:\'HH:mm\'}} for {{reservation.numGuests}} people: </div> <div class="collapsed-tables"> <i class="material-icons">restaurant</i> <p>{{tablesLeft}} tables left</p> </div> <div class="time-pick-table"> Select the best time that fits you: </div> <div class="col-xs-2" ng-repeat="times in bestTime"> <div id="{{$index}}"> <input type="submit" class="reservation-btns" value="{{times}}" ng-click="confirmReservation($event)"> </div> </div> </div> </div> </div> </form> </div> </div> \x3c!-- Map --\x3e <div class="profile-reservation div-map"> <h1>About {{restaurant.restaurantName}}</h1> <div map-lazy-load="https://maps.google.com/maps/api/js" class="map-holder"> <ng-map center="[43.8563, 18.4131]" zoom="10"> <marker position="[43.8563, 18.4131]"></marker> </ng-map> </div> <h2>Description</h2> <p>{{restaurant.description}}</p> </div> \x3c!-- Menu --\x3e <div class="profile-reservation"> <div class="restaurant-content"> <h3>Menu: </h3> <uib-tabset class="tabbable"> <uib-tab heading="Breakfast" ng-attr-active="tabs[0].active"> neki tekst </uib-tab> <uib-tab heading="Lunch" ng-attr-active="tabs[1].active"> neki tekst 2 </uib-tab> <uib-tab heading="Dinner" ng-attr-active="tabs[2].active"> neki tekst 3 </uib-tab> </uib-tabset> <div class="fade"></div> <input type="submit" ng-click="showMenu()" ng-style="{\'max-height\': \'{{heightMenu}}px\'}" value="{{btnShowMenu}}"> </div> </div> \x3c!-- Galery --\x3e </div> </div> <script id="rateRestaurant.html" type="text/ng-template" bindtocontroller="true"><form name="formModal" ng-submit="rateRestaurant()" role="form" class="validation-form">\n        <div class="modal-header">Rate this place</div>\n        <div class="modal-stars"><rating-stars ng-model="formData.myRating" ng-change="ratingChange()"\n                           ratings="0" average-rating="0" ratings-position=""></rating-stars></div>\n        <div class="modal-review-input"><textarea ng-model="comment" placeholder="Write a review"></textarea></div>\n        <input type="submit" value="Save">\n      </form><\/script> </div> </div>'),e.put("views/search.html",'<div ng-controller="SearchCtrl as vm"> <form class="form-horizontal form-search custom-form-search" ng-submit="searchHandler()"> <div class="shadow-form"> <div class="col-sm-8 input-holder guests-div"><i class="material-icons search loop">search</i> <input ng-model="reservation.nameRes" type="text" placeholder="Location, Restaurant or Cousine"></div> <div class="col-sm-2 input-holder"> <div class="btn-group" uib-dropdown is-open="status.isopen"> <button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled"> Filter by <span class="caret"></span> </button> <ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button"> <li role="menuitem"> <ul class="list-inline"> <li> <ul class="list-unstyled"> <li> <h2>PRICE</h2> </li> <li> <rating-dollars ng-model="formData.priceRange" ng-change="priceChange()" ratings="0" average-rating="0" ratings-position=""></rating-dollars> </li> </ul> </li> <li class="filter-snd-col"> <ul class="list-unstyled"> <li> <h2>RATING</h2> </li> <li> <rating-stars ng-model="formData.myRating" ng-change="ratingChange()" ratings="0" average-rating="0" ratings-position=""></rating-stars> </li> </ul> </li> </ul> </li><li role="menuitem"> </li><li class="divider"></li> <li class="filter-snd-col"> <h2>COUSINE</h2> <select ng-model="filterCousine" id="filter-cousine" multiple><option class="col-sm-6 options-cousine" ng-repeat="cousine in cousines" value="{{$index+1}}">{{cousine}}</option> </select> </li>  </ul> </div> </div> <div class="col-sm-2 input-holder"><input type="submit" value="Search"></div> </div> </form> \x3c!-- Searched restourants --\x3e <div class="container random-restaurants-container"> <div ng-show="noFilter" uib-alert class="search-alert" close="closeAlert()">Showing reasults for restaurants available on {{params.date | date:\'dd/MM/yyyy\'}} at {{params.time | date:\'hh:mm\'}} for {{params.guests}} people</div> <div ng-show="notEmpty" class="col-md-4 col-sm-6 col-xs-12 text-margin-random-restaurant" ng-repeat="item in restaurants"> <div class="random-restaurant-content" id="{{$index}}"> <img class="img-rand img-responsive" ng-src="{{item.imageFileName}}"> <div class="random-restaurant-name">{{item.restaurantName}}</div>\x3c!--item.name/rate/price--\x3e <div class="g"> <rating-stars ratings="vm.ratings[$index]" average-rating="vm.averageRating[$index]" ratings-position="{{vm.ratingsPosition}}"> </rating-stars></div> <div class="dollar-range"> <rating-dollars ratings="1" average-rating="vm.averageRatingDollar[$index]" ratings-position=""> </rating-dollars></div> <div class="random-restaurant-name search-food-type">{{item.foodType}}</div> <input type="submit" value="Reserve Now" ng-click="viewRestaurant($event)"> </div> \x3c!--cousines--\x3e </div> <div class="no-results-msg" ng-show="!notEmpty"><p>There are no results matching your search</p></div> </div> <div ng-show="notEmpty" class="pagination-sm pagination-custom" uib-pagination="" ng-model="currentPage" total-items="totalItems" items-per-page="9" ng-change="pageChanged()"> </div> </div> \x3c!-- Locations / hardcoded --\x3e <div class="container locations" ng-controller="LocationCtrl"> <div class="text-center popular-locations-title">Popular locations</div> <div class="col-md-3 col-sm-4 col-xs-6 random-restaurant-content" ng-repeat="location in locations"> <div class="location-content"> <div class="loc-city-name">{{location.city}}</div> <div class="loc-restaurant-number">{{location.restaurantNum}} restaurants</div> </div> </div> </div>')}]);