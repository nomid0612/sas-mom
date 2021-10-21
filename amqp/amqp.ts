const amqp = require('amqplib');
export class AMQP {
    public static async createConnection(url: string): Promise<any> {
        return (await amqp.connect(url))
    }

    public static async createChannel(connection: any): Promise<any> {
        return (await connection.createChannel())
    }

    public static async assetQueueInChannel(channel: any, queueName: string) {
        return await channel.assertQueue(queueName, {
            exclusive: true
        });
    };
    public static async assetQueueWithoutOptionsInChannel(channel: any, queueName: string) {
        return await channel.assertQueue(queueName)
    }

    public static async assetDurableQueueInChannel(channel: any, queueName: string) {
        return await channel.assertQueue(queueName, {
            exclusive: true
        });
    }


    public static async consumerConsume(channel: any, queueResponse: any,  options: any) {
        return (await channel.consume(queueResponse.queue, function(msg: any) {
            console.log(' [.] Print message %s', msg.content.toString());
           }, options))
    }
}
