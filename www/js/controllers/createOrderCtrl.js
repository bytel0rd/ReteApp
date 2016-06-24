(function() {
  angular.module('iDeliver').controller('createOrderCtrl', function($scope, $ionicModal, $ionicPopover,
    $timeout, $state, iSocketFactory, CacheFactory) {

      // console.log(CacheFactory.get('profileDataCache').get('profile'));
    var userProfile = CacheFactory.get('profileDataCache').get('profile');
    $scope.createOrder = function(orderData) {
      // adding userBioDatas to the orderData
      // from the cached {@profileDataCache}
      orderData.owner_Id = userProfile.user._id;
      orderData.owner_userName = userProfile.user.profile.userName;
      // isocketFactory emit the orderData
      // to the sever which is then saved
      // then emitted to all connected users
      iSocketFactory.emit('serverReceiveOrder', orderData, function(err, data) {
        orderData.hint = '';
        orderData.details = '';
        orderData.reciever_UserName = '';
        if(!err) {
          $state.go('app.orders');
        }
        console.log(err, data);
        // $scope.err = err.errMgs;
      });
    };

  });
})();
