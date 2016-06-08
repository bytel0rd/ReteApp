(function() {
  angular.module('iDeliver').controller('ordersCtrl', function($scope,
    $ionicModal, $ionicPopover, $timeout, ordersFactory, CacheFactory) {

      // get the created userOrdersCache and sets it as the default
      // value for $scope.ordersList if it's undefined assign new
      // array,if the http response is successfully done the cache
      // is updated and response is set for $scope.ordersList
      // if their was an err err mgs is showed to the user'sView
    var userOrdersCache = CacheFactory.get('userOrdersCache');
    // userOrdersCache.remove('userOrdersCache');
    if (!userOrdersCache.get('userOrdersCache')) userOrdersCache.put('userOrdersCache', []);
    $scope.ordersList = userOrdersCache.get('userOrdersCache');
    ordersFactory.getOrders()
      .then(function(resData) {
        console.log(resData);
        if (resData.data === []) {
          $scope.err = "looks like you got no pending Orders ";
        }
        $scope.ordersList = resData.data;
        userOrdersCache.put('userOrdersCache', resData.data);
      }, function(resData) {
        $scope.err = "looks like we got an error ";
      });
  });
})();
