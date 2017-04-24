// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('map', {
        url: '/',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      });

    $urlRouterProvider.otherwise("/");

  })

  .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation) {
    var options = { timeout: 10000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function () {

        console.log('Markers: ' + latLng);

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Tu sam!"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

        loadMarkers();

      });

    }, function (error) {
      console.log("Could not get location");

      loadMarkers();
    });


    function loadMarkers() {

      var records = [
        {
          name: 'Dvorana A',
          desc: 'Opis dvorane A',
          image: '../img/map_pins/darkgreen_MarkerA.png',
          lat: 45.79151,
          long: 15.9458971
        }, {
          name: 'Dvorana B',
          desc: 'Opis dvorane B',
          image: '../img/map_pins/darkgreen_MarkerB.png',
          lat: 45.79051,
          long: 15.9468971
        }, {
          name: 'Dvorana C',
          desc: 'Opis dvorane C',
          image: '../img/map_pins/darkgreen_MarkerC.png',
          lat: 45.78801,
          long: 15.9438971
        }, {
          name: 'Dvorana D',
          desc: 'Opis dvorane D',
          image: '../img/map_pins/darkgreen_MarkerD.png',
          lat: 45.78691,
          long: 15.9411971
        },
      ];

      for (var i = 0; i < records.length; i++) {

        var record = records[i];
        var markerPos = new google.maps.LatLng(record.lat, record.long);

        // Add the markerto the map
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          icon: record.image,
          position: markerPos
        });

        var infoWindowContent = "<h4>" + record.name + "</h4>" + "<p>" + record.desc + "</p>";

        addInfoWindow(marker, infoWindowContent, record);

      }
    }

    function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
        content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });

    }
  });