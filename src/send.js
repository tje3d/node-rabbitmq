const rabbitmq = require('./rabbitmq');

rabbitmq.channel().then(ch => {
    ch.sendToQueue(rabbitmq.queue_name, new Buffer('Hello world!'));
    
    setTimeout(()=>{
        rabbitmq.disconnect();
        process.exit(0);
    }, 1000);
}).catch(err => {
    console.log(err);
});