(function() {
  angular.module('iDeliver').controller('agentReqCtrl', function($scope, $ionicModal, $ionicPopover,
    $timeout, $state, authFactory, CacheFactory) {

      $scope.agent = {};
      // chained the promises from the authFactory response
      // from the success promise response transition to the
      // main app page is done and failed promise response
      // issuses an error $ warning message to the current user
      // if a successfully response is made the @{user} profile data is
      // stored at the @{profileDataCache} CacheFactory.
      $scope.agentReq = function (agentData) {
        var authRes = authFactory.agentReq(agentData);
        authRes.then(function (resData) {
          CacheFactory.get('profileDataCache').put('profile', resData.data);
          $scope.agent = {};
          $state.go('app.mainMenu');
        }, function (resData) {
          $scope.agent = {};
          $scope.err = "please fill valid agent details";
        });
      };

  });
})();
