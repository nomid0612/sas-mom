import {AMQP} from "../../amqp/amqp";
const url: string =  'amqp://localhost';
const queueName: string = 'rpc';
export async function rpcProducer() {
    const connection: any = await AMQP.createConnection(url);
    const channel: any = await AMQP.createChannel(connection);
    const queue: any = await AMQP.assetQueueInChannel(channel, queueName);
    await channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    await channel.consume(queueName, function reply(msg: any) {
        console.log('message', msg.content.toString());
        const seconds  = 2;
        setTimeout(function() {
            console.log(" Delay in %d seconds", seconds);
            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(convertStrToUpperCase(msg.content.toString())), {
                }
            );
        }, seconds * 1000);
        channel.ack(msg);
    });
}

rpcProducer();

function convertStrToUpperCase(str: string): string {
    return str.toUpperCase();
}
