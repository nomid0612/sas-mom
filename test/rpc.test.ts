import {AMQP} from "../amqp/amqp";
import {rpcConfig} from "../config/rpc";
import {rpcConsumer} from "../producerConsumer/rpc/consumer";
const url: string =  'amqp://localhost';
describe('RPC Tests', () => {

    let connection: any;
    afterEach(async () => {
        await connection.close();
    });

    test('(RPC) verify connection creation', async () => {
        connection = await AMQP.createConnection(rpcConfig.url);
        expect(Boolean(connection)).toEqual(true);
    });

    test('(RPC) verify channel creation', async () => {
        connection = await AMQP.createConnection(rpcConfig.url);
        const channel: any = await AMQP.createChannel(connection);
        expect(Boolean(channel)).toEqual(true);
    });

    test('(RPC) verify queue', async () => {
        connection = await AMQP.createConnection(rpcConfig.url);
        const channel: any = await AMQP.createChannel(connection);
        const queue: any = await AMQP.assetQueueInChannel(channel, '');
        expect(Boolean(queue.queue)).toEqual(true);
        expect(queue.queue.length).toBeGreaterThan(10);
        expect(queue.messageCount).toEqual(0);
        expect(queue.consumerCount).toEqual(0);
    });

    test('(RPC) verify consume', async () => {
        connection = await AMQP.createConnection(rpcConfig.url);
        const channel: any = await AMQP.createChannel(connection);
        const queue: any = await AMQP.assetQueueInChannel(channel, '');
        const consume: any = await AMQP.consumerConsume(channel, queue,{
            noAck: true
        });
        expect(consume.consumerTag.length).toBeGreaterThan(10);
    });

});

describe('RPC Tests', () => {

    test('(RPC) verify uppercase message', async () => {
        const sentMessage: string = 'test';
        // @ts-ignore
        expect((await rpcConsumer(sentMessage)).toString()).toEqual(sentMessage.toUpperCase(), 'producer did not sent message in upper case');
    });
});
