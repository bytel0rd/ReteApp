(function() {
  angular.module('delo').factory('ordersFactory', function($http, $q, CacheFactory) {

    var userProfile = CacheFactory.get('profileDataCache').get('profile');

    var ordersFactory = {};


    // takes a url and perform a get request
    function getDataFromUrl(url) {
      var defer = $q.defer();
      $http.get(url)
        .then(function reqSuccess(resData) {
          // ths first callback responds to the success of
          //  the request performed

          defer.resolve(resData);
        }, function reqError(resData) {
          // ths first callback responds to the success of the
          //  request performed

          defer.reject(resData);
        });

      return defer.promise;
    }

    //returns all orders specific to the current user
    ordersFactory.getOrders = function() {
      var url = '/api/orders';
      return getDataFromUrl(url);
    }

    ordersFactory.getDeliveries = function() {
      var url = '/api/deliveries';
      return getDataFromUrl(url);
    }

    // ordersFactory.getPendingOrders = function () {
    //   return ordersList;
    // }

    // note the http request with @{orderID} params
    // is made from angular which it is response
    // already returns a promise value
    // "getOrderDetails" returns details about a particular Order
    ordersFactory.getOrderDetails = function(orderID) {
      var url = '/api/orders/' + orderID;
      return $http.get(url);
    }

    // an http request is made to the server
    // to get the ordersDetails in th deliveryfeed.
    ordersFactory.getFeedItem = function(orderItem) {
      var url = '/api/itemDetail/' + orderItem;
      return $http.get(url);
    }

    // an http  Post request is made to update a
    // the order object consist of the orderId
    // particular order and set the agentId for the order
    ordersFactory.acceptOrder = function(_id) {
      var url = '/api/acceptOrder/';
      var defer = $q.defer();
      $http.post(url, {
          orderId: _id
        })
        .then(function success(resData) {
          // ths first callback responds to the success of
          //  the request performed

          defer.resolve(resData);
        }, function error(resData) {
          // ths first callback responds to the success of the
          //  request performed

          defer.reject(resData);
        });

      return defer.promise;
    }

    // sends a post request with the
    // with orderId has params to cancelOrder
    // the order.

    ordersFactory.cancelOrder = function(_id) {
      var url = '/api/cancelOrder/';
      var defer = $q.defer();
      $http.post(url, {
          orderId: _id
        })
        .then(function success(resData) {
          // ths first callback responds to the success of
          //  the request performed

          defer.resolve(resData);
        }, function error(resData) {
          // ths first callback responds to the success of the
          //  request performed

          defer.reject(resData);
        });

      return defer.promise;
    }

    // sends a post request with the
    // with orderId has params to confirm the order.

    ordersFactory.confirmOrder = function(_id) {
      var url = '/api/confirmOrder/';
      var defer = $q.defer();
      $http.post(url, {
          orderId: _id
        })
        .then(function success(resData) {
          // ths first callback responds to the success of
          //  the request performed

          defer.resolve(resData);
        }, function error(resData) {
          // ths first callback responds to the success of the
          //  request performed

          defer.reject(resData);
        });

      return defer.promise;
    }

    // returns all negotiations in which
    // the current user is involved in from the server.
    ordersFactory.getNegotiations = function() {
      var url = '/api/negotiations/'
      return $http.get(url);
    }

    // returns a negotiations from the server.
    ordersFactory.getNegotiate = function(id) {
      var url = '/api/negotiations/' + id;
      return $http.get(url);
    }

    return ordersFactory;
  });
})();
