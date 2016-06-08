(function() {
  angular.module('iDeliver').controller('deliveriesCtrl',
    function($scope, $ionicModal, $ionicPopover,
      $timeout, ordersFactory, ordersFactory ,CacheFactory) {
      // $scope.deliveryList = ordersFactory.getDeliveries();

      // get the created userOrdersCache and sets it as the default
      // value for $scope.deliveryList if it's undefined assign new
      // array,if the http response is successfully done the cache
      // is updated and response is set for $scope.deliveryList
      // if their was an  err mgs is showed to the user'sView
    var userOrdersCache = CacheFactory.get('userOrdersCache');
    // userOrdersCache.remove('userDeliveriesCache');
    if (!userOrdersCache.get('userDeliveriesCache')) userOrdersCache.put('userDeliveriesCache', []);
    $scope.ordersList = userOrdersCache.get('userDeliveriesCache');
    ordersFactory.getDeliveries()
      .then(function(resData) {
        console.log(resData);
        if (resData.data === []) {
          $scope.err = "looks like you got no pending Orders ";
        }
        $scope.deliveryList = resData.data;
        userOrdersCache.put('userDeliveriesCache', resData.data);
      }, function(resData) {
        $scope.err = "looks like you got no deliveries ";
      });


    });
})();
