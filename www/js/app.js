// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('delo', ['ionic', 'ui.router', 'ngCordova','btford.socket-io', 'ionic-material', 'angular-cache', 'ion-floating-menu']);

app.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory
    //bar above the keyboard for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    // storage cache are created if they
    // do not exist before to hold various datas
    // TODO: turn this to a functio to avoid code duplicaTion
    if (!CacheFactory.get('profileDataCache')) {
      CacheFactory.createCache('profileDataCache', {
        storageMode: 'localStorage',
        deleteOnExpire: 'aggressive',
        recycleFreq: 6000
      });
    }
    if (!CacheFactory.get('deliveryFeedCache')) {
      CacheFactory.createCache('deliveryFeedCache', {
        storageMode: 'localStorage',
        deleteOnExpire: 'aggressive',
        recycleFreq: 6000
      });
    }
    if (!CacheFactory.get('userOrdersCache')) {
      CacheFactory.createCache('userOrdersCache', {
        storageMode: 'localStorage',
        deleteOnExpire: 'aggressive',
        recycleFreq: 6000
      });
    }
    if (!CacheFactory.get('negoListCache')) {
      CacheFactory.createCache('negoListCache', {
        storageMode: 'localStorage',
        deleteOnExpire: 'aggressive',
        recycleFreq: 6000
      });
    }
    if (!CacheFactory.get('negoItemCache')) {
      CacheFactory.createCache('negoItemCache', {
        storageMode: 'localStorage',
        deleteOnExpire: 'aggressive',
        recycleFreq: 6000
      });
    }
    if (!CacheFactory.get('negoChatCache')) {
      CacheFactory.createCache('negoChatCache', {
        storageMode: 'localStorage',
        deleteOnExpire: 'aggressive',
        recycleFreq: 6000
      });
    }
  });
});
