(function() {
  angular.module('iDeliver').controller('mainMenuCtrl', function($scope,
    $ionicModal, $ionicPopover, $timeout, authFactory, CacheFactory) {

    // everyTime the User Access the main-Menu the userBioData is updated
    // and put into the profileDataCache with the a valid response
    // gotten from the http Get request to biodatas
    (function () {
      authFactory.getUserBio()
        .then(function (resData) {
          CacheFactory.get('profileDataCache').put('profile', resData.data);
        });
    })();
  });
})();
