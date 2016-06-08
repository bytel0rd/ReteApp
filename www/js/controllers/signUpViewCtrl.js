(function() {
  angular.module('iDeliver').controller('signUpViewCtrl', function($scope, $ionicModal, $ionicPopover,
    $timeout, $state, authFactory, CacheFactory) {


      // chained the promises from the authFactory response
      // from the success promise response transition to the
      // main app page is done and failed promise response
      // issuses an error $ warning message to the current user
      // if a successfully response is made the @{user} profile data is
      // stored at the @{profileDataCache} CacheFactory.
      $scope.signUpUser = function (signUpData) {
        var authRes = authFactory.signUp(signUpData);
        authRes.then(function (resData) {
          CacheFactory.get('profileDataCache').put('profile', resData.data);
          $state.go('app.mainMenu');
        }, function (resData) {
          $scope.err = "please fill valid signUp details";
        });
      };

      $scope.goSignIn = function () {
        $state.go('home.login');
      }
  });
})();
