import {AMQP} from "../amqp/amqp";
import {rpcConfig} from "../config/rpc";
import {rpcConsumer} from "../producerConsumer/rpc/consumer";
import {directConfig} from "../config/directConfig";
const url: string =  'amqp://localhost';

describe('Direct Tests', () => {

    let connection: any;
    afterEach(async () => {
        await connection.close();
    });


    test('(Direct) verify receiving message from producer', async () => {
        const sentMessage: string = 'Test';
        const exchange: string = 'directEveryXSec';
        const ROUTING_KEY = 'directMessage';
        connection = await AMQP.createConnection(directConfig.url);
        const channel: any = await AMQP.createChannel(connection);
        const queue: any = await AMQP.assetQueueInChannel(channel, '');

        await channel.bindQueue(queue.queue, exchange, ROUTING_KEY);
        const message: any = await new Promise(resolve => {
            channel.consume(queue.queue, (message: any) => {
                channel.ack(message);
                resolve(message.content.toString())
            });
        });
        expect(message).toContain('Test');
    });
});
