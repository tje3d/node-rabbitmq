const rabbitmq = require('./rabbitmq');

rabbitmq.channel().then(ch => {
    ch.consume(rabbitmq.queue_name, function(msg) {
        console.log("[x] Received %s %s", msg.content.toString());
    }, {
        noAck: true
    });
}).catch(err => {
    console.log(err);
});