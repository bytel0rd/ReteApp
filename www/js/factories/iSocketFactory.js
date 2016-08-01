(function() {
  angular.module('delo').factory('iSocketFactory', function(socketFactory) {
    var myIoSocket = io.connect('http://delioserver-abizeus.rhcloud.com:8000/');
    // var myIoSocket = io.connect('http://localhost:3000');http://delioserver-abizeus.rhcloud.com/

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
