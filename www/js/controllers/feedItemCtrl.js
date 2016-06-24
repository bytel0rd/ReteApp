(function() {
  angular.module('iDeliver').controller('feedItemCtrl',
    function($scope, $state, $stateParams, $ionicModal, $ionicPopover,
      $timeout, ordersFactory, ordersFactory, CacheFactory) {

      // comparing userId ids to prevent creator of a particular order from responding to the the in the feed
      var userId = CacheFactory.get('profileDataCache').get('profile').user._id;
      var isAgent = CacheFactory.get('profileDataCache').get('profile').user.isAgent;
      var feedItemId = $stateParams.id;
      // this controls the visibilty of buttons
      // used to cancel and accept orders by agents
      $scope.hideButtons = true;

      // an http request is sent to
      // retrive the orders details from the server.
      ordersFactory.getFeedItem(feedItemId)
        .then(function(resData) {
          $scope.feed = resData.data;
          console.log(resData.data);
          if(!resData.data){
            $scope.err = 'order not found in the database';
            $scope.hideButtons = false;
            return null;
          }
          // userId === $scope.feed.owner_Id ||
          if ($scope.feed.awaiting || userId === $scope.feed.owner_Id) {
            $scope.showAbort = true;
            $scope.err = "can't respond to your own created order";
          } else {
            $scope.showAbort = false;
          }
        }, function(resData) {
          $scope.err = 'error when requesting for item details';
        });

      // an http request is made to by an agent to confirm
      // if someOne has already become an agent or to become the agent
      // simulanenoulsy.
      $scope.acceptOrder = function(order_Id) {
        ordersFactory.acceptOrder(order_Id)
          .then(function Success(resData) {
            $state.go('app.negotiaitions');
            $scope.hideButtons = true;
          }, function Error(resData) {
            $scope.err = 'Error Accepting Order';
            $scope.hideButtons = true;
          });
      };

    });
})();
