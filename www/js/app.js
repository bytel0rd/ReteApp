// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('iDeliver', ['ionic', 'ui.router', 'ngCordova','btford.socket-io', 'ionic-material', 'angular-cache']);

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

app.config(function($stateProvider, $urlRouterProvider) {

      //app routes
      $stateProvider.state('home', {
        url: '/home',
        abstract: true,
        controller: 'homeCtrl',
        templateUrl: 'templates/home.html'
      })

      .state('home.login', {
        url: '/login',
        views: {
          'menuContent': {
            controller: 'loginViewCtrl',
            templateUrl: 'templates/loginView.html'
          }
        }
      })

      .state('home.signUp', {
        url: '/signup',
        views: {
          'menuContent': {
            controller: 'signUpViewCtrl',
            templateUrl: 'templates/signUpView.html'
          }
        }
      })

      .state('app', {
        url: '/parent',
        abstract: true,
        controller: 'parentViewCtrl',
        templateUrl: 'templates/parentView.html'
      })

      .state('app.mainMenu', {
          url: '/mainmenu',
          views: {
            'menuContent': {
              controller: 'mainMenuCtrl',
              // templateUrl: 'templates/createOrderView.html'
              // templateUrl: 'templates/createOrderView.html'
              // templateUrl: 'templates/createOrderView.html'
              // templateUrl: 'templates/pendingOrderedView.html'
              // templateUrl: 'templates/orderedView.html'
              // templateUrl: 'templates/deliveredView.html'
              templateUrl: 'templates/mainMenuView.html'
            }
          }
        })
        .state('app.feed', {
          url: '/deliveryfeed',
          views: {
            'menuContent': {
              controller: 'deliveryFeedCtrl',
              templateUrl: 'templates/deliveryFeedView.html'
            }
          }
        })
        .state('app.feedItem', {
            url: '/feeditem/:id',
            views: {
              'menuContent': {
                controller: 'feedItemCtrl',
                templateUrl: 'templates/feedItemView.html'
              }
            }
          })
        .state('app.orders', {
          url: '/orders',
          views: {
            'menuContent': {
              controller: 'ordersCtrl',
              templateUrl: 'templates/ordersView.html'
            }
          }
        })
        .state('app.negotiaitions', {
          url: '/negotiaitions',
          views: {
            'menuContent': {
              controller: 'negotiaitionsCtrl',
              templateUrl: 'templates/negotiaitionsView.html'
            }
          }
        })
        .state('app.negotiate',{
          url: '/negotiaitions/:id',
          views: {
            'menuContent': {
              controller: 'chatCtrl',
              templateUrl: 'templates/chatView.html'
            }
          }
        })
        .state('app.deliveries', {
          url: '/deliveries',
          views: {
            'menuContent': {
              controller: 'deliveriesCtrl',
              templateUrl: 'templates/deliveriesView.html'
            }
          }
        })
        .state('app.pendingOrders', {
          url: '/pendingorders',
          views: {
            'menuContent': {
              controller: 'pendingOrdersCtrl',
              templateUrl: 'templates/pendingOrdersView.html'
            }
          }
        })
        .state('app.createOrder', {
            url: '/createorder',
            views: {
              'menuContent': {
                controller: 'createOrderCtrl',
                templateUrl: 'templates/createOrderView.html'
              }
            }
          })
          .state('app.agentReq', {
            url: '/agentReq',
            views: {
              'menuContent': {
                controller: 'agentReqCtrl',
                templateUrl: 'templates/agentReqView.html'
              }
            }
          });

          // if none of the above states are matched, use this as the fallback
          // $urlRouterProvider.otherwise('/parent/mainmenu');
          $urlRouterProvider.otherwise('/home/login');

        });
