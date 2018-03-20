const amqp = require('amqplib/callback_api');

class RabbitMQ {
    constructor() {
        this.connection_cache = null;
        this.channel_cache = null;
        this.queue_name = 'hello';

        this.connection().catch(err => {
            console.log(err);
            process.exit(2);
        });
    }

    connection() {
        return new Promise((resolve, reject) => {
            if (this.connection_cache !== null) {
                resolve(this.connection_cache);
                return;
            }

            amqp.connect('amqp://localhost', (err, conn) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                this.connection_cache = conn;
                resolve(this.connection_cache);
            });
        });
    }

    channel() {
        return new Promise((resolve, reject) => {
            if (this.channel_cache !== null) {
                resolve(this.channel_cache);
                return;
            }

            this.connection().then(conn => {
                conn.createChannel((err, ch) => {
                    ch.assertQueue(this.queue_name, {durable: false});

                    this.channel_cache = ch;
                    resolve(this.channel_cache);
                });
            });
        });
    }

    async disconnect() {
        let conn = await this.connection();
        conn.close();
        this.connection_cache = null
        this.channel_cache = null;
        return 'done';
    }
}

module.exports = new RabbitMQ