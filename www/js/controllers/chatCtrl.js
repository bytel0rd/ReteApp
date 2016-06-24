(function() {
  angular.module('iDeliver').controller('chatCtrl', function($scope, $ionicModal, $ionicPopover,
    $timeout, $stateParams, iSocketFactory, CacheFactory, ordersFactory) {

    // console.log(moment());
    $scope.chats = [];
    $scope.newMgs = {};
    var negoChatCache = CacheFactory.get('negoChatCache');
    var negoItemCache = CacheFactory.get('negoItemCache');
    var userProfile = CacheFactory.get('profileDataCache').get('profile');
    var userId = userProfile.user._id;

    //get the $scope.negotiaiton details from the server.
    //or retives from the cache if server request fails.
    ordersFactory.getNegotiate($stateParams.id)
      .then(function(resData) {
        getFormerChats(resData.data);
      }, function(resData) {
        $scope.err = 'error while retrieving , check internet conncetion';

      });

    // @{ng has nego}
    function getFormerChats(ng) {
      // updates negoItemCache of item
      negoItemCache.put($stateParams.id, ng);
      // gets already made sent chats from the server
      // and a callback is recieved in which sets
      iSocketFactory.emit('formerChats', {
        negoId: $stateParams.id
      }, function(err, data) {
        if (err) $scope.err = err.errMgs;
        setChatFeed(ng, data);
      });

    }

    function setChatFeed(ng, chats) {
      if (!chats) {
        $scope.err = 'chats not found';
        return null;
      }
      // console.log(ng);
      console.log(chats[0]);
      $scope.chats = chats;
      $scope.newMgs.Nego_Id = ng._id;
      $scope.newMgs.From = userId;
      setChatRecieversId(ng);

      $scope.dispChatSender = function (id) {
        return getChatSender(ng, id);
      }

      negoChatCache.put($stateParams.id, chats);
    }

    // assign the reciever of the emmitted chats
    function setChatRecieversId(ng) {
      if (userId === ng.owner_Id) {
        return $scope.newMgs.To = [ng.reciever_Id, ng.agent_Id];
      }

      if (userId === ng.reciever_Id) {
        return $scope.newMgs.To = [ng.owner_Id, ng.agent_Id];
      }

      if (ng.reciever_Id === ng.owner_Id) {
        return $scope.newMgs.To = [ng.reciever_Id];
      }

      return $scope.newMgs.To = [ng.reciever_Id, ng.owner_Id];
    }

    // sends the message  the server which sends
    // it to other connected users on the server.
    $scope.sendMessage = function(mgsData) {
      console.log(mgsData);
      mgsData.Mgs = $scope.mgsInput;
      iSocketFactory.emit('sendNegoMgs', mgsData);
      mgsData.dataCreated = moment();
      $scope.chats.push(mgsData);
      $scope.mgsInput = '';
    }

    // any subsiquent new mgs recieved are
    //  also added to the $scope.chats
    //  and cached into the @{$scope.negoChatCache with $stateParams.id}
    //  has the key for retrival.
    iSocketFactory.on('recieveNegoMgs', function(newMgs) {
      console.log(newMgs);
      negoChatCache.remove($stateParams.id);
      $scope.chats.push(newMgs);
      negoChatCache.put($stateParams.id, $scope.feedData);
    });

    function getChatSender(ng, senderId) {
      if (senderId === ng.owner_Id) {
        return ng.owner_userName
      }
      if (senderId === ng.agent_Id) {
        return ng.agent_userName;
      }

      return owner_userName;
    }

    $scope.getChatTime = function(time) {
      return moment(time).fromNow();
    }
  });
})();
