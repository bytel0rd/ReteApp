(function() {
  angular.module('iDeliver').factory('iSocketFactory', function(socketFactory) {
    var myIoSocket = io.connect('http://localhost:3000');

    // initalizung a connection to socket.io on the server;
    ioSocketFactory = socketFactory({
      ioSocket: myIoSocket
    });
    // forwarding socket,io events from
    // the server to differnt controllers.
    ioSocketFactory.forward('connection');
    ioSocketFactory.forward('joinFeed');
    // ioSocketFactory.forward('receiveOrder');
    // ioSocketFactory.forward('sendFeedOrder');
    // receiveOrder
    // console.log(ioSocketFactory);
    return ioSocketFactory;
  });
})();
