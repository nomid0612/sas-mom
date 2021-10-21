import {directConfig} from "../../config/directConfig";
import {AMQP} from "../../amqp/amqp";

export async function directEveryXSecondsProducer(seconds: number) {

    const exchange = 'directEveryXSec';
    const ROUTING_KEY = 'directMessage';
    const message: string = 'Test';
    const connection: any = await AMQP.createConnection(directConfig.url);
    const channel: any = await AMQP.createChannel(connection);
    await channel.assertExchange(exchange);
    let i: number = 0;
    setInterval(async () => {
        await channel.publish(exchange, ROUTING_KEY, Buffer.from((message + i++).toString()));
    }, seconds)
}

directEveryXSecondsProducer(2);
