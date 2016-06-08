(function() {
  angular.module('iDeliver').controller('loginViewCtrl', function($scope,
    $ionicModal, $ionicPopover, $state, $timeout, authFactory, CacheFactory) {

      // checks if the user s already loginIn
      // if not the app displays the login page
      if (CacheFactory.get('profileDataCache').get('profile').user) {
        $state.go('app.mainMenu');
      }

    //loginUser fuction takes the parameter of
    // @ {login.email} as the email for authetification
    // and also @{login.password} as the pass for authetification
    //by the server.
    //the button for Sign In is disable by the invalid data
    // from both parameters using "ng-disabled" directive
    //and also "ng-click" for request processing.

    $scope.loginUser = function(login) {

      // chained the promises from the authFactory response
      // from the success promise response transition to the
      // main app page is done and failed promise response
      // issuses an error $ warning message to the current user
      // if a successfully response is made the @{user} profile data is
      // stored at the @{profileDataCache} CacheFactory.
      var authRes = authFactory.login(login);
      authRes.then(function(resData) {
        CacheFactory.get('profileDataCache').put('profile', resData.data);
        // console.log(CacheFactory.get('profileDataCache').get('profile'));
        $state.go('app.mainMenu');
      }, function(resData) {
        $scope.err = "invalid username or password";
      });


    }

    //goSignUp method is used for transition
    // from the signIn Page to the signUp Page

    $scope.goSignUp = function() {
      $state.go('home.signUp');
    }

  });
})();
