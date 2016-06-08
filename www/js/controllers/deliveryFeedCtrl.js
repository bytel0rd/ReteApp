(function() {
  angular.module('iDeliver').controller('deliveryFeedCtrl', function($scope, $ionicModal, $ionicPopover,
    $timeout, iSocketFactory, CacheFactory, ordersFactory) {

    var deliveryFeedCache = CacheFactory.get('deliveryFeedCache');
    // deliveryFeedCache.remove('deliveryFeedCache');
    // console.log(deliveryFeedCache.get('deliveryFeedCache'));
    if (!deliveryFeedCache.get('deliveryFeedCache')) deliveryFeedCache.put('deliveryFeedCache', []);
    $scope.feedData = deliveryFeedCache.get('deliveryFeedCache');

    // on user connection orders already in
    //  the feed are sent from the server
    //  as a list is the individually added
    //  to the $scope.feedData and it is cached into
    //  the @{deliveryFeedCache}
    iSocketFactory.on('clientReceiveOrders', function(data) {
      $scope.feedData = [];
      for (var i = 0; i < data.length; i++) {
        $scope.feedData.unshift(data[i]);
      }
    });


    // any subsiquent new orders recieved are
    //  also added to the $scope.feedData
    //  and cached into the @{deliveryFeedCache}
    iSocketFactory.on('clientReceiveNewOrder', function(data) {
      deliveryFeedCache.remove('deliveryFeedCache');
      $scope.feedData.unshift(data);
      deliveryFeedCache.put('deliveryFeedCache', $scope.feedData);
    });
  });
})();
