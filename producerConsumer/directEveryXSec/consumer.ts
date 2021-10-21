import {AMQP} from "../../amqp/amqp";
import {directConfig} from "../../config/directConfig";

async function directConsumer() {
    const exchange: string = 'directEveryXSec';
    const queue: string= 'directEveryXSec';
    const ROUTING_KEY = 'directMessage';
    const connection: any = await AMQP.createConnection(directConfig.url);
    const channel = await AMQP.createChannel(connection);
    await AMQP.assetQueueWithoutOptionsInChannel(channel, queue);
    await channel.bindQueue(queue, exchange, ROUTING_KEY);
    await channel.consume(queue, (message: any) => {
        console.log(message.content.toString());
        channel.ack(message)
    });
}

directConsumer();


