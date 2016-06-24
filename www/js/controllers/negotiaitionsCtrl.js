(function() {
  angular.module('iDeliver').controller('negotiaitionsCtrl', function($scope,
    $ionicModal, $ionicPopover, $timeout, ordersFactory, CacheFactory) {
    $scope.negotiations = [];
    $scope.err;

    var negoListCache = CacheFactory.get('negoListCache');
    // negoListCache.remove('negoListCache');
    // console.log(negoListCache.get('negoListCache'));
    // if (!negoListCache.get('negoListCache')) negoListCache.put('negoListCache', []);
    // $scope.negotiations = negoListCache.get('negoListCache');

    ordersFactory.getNegotiations()
      .then(function (resData) {
        $scope.negotiations = resData.data;
        negoListCache.put('negoListCache', resData.data);
      },function (resData) {
        $scope.err = 'error while connection to the server';
      });

  });
})();
