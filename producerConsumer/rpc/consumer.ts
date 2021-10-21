import {AMQP} from "../../amqp/amqp";
const url: string =  'amqp://localhost';

export async function rpcConsumer(transformText: string) {
    return new Promise(async (resolve, reject) => {
        const array: string[] = [];
        let args: any = process.argv.slice(2);
        args = transformText;
        const connection: any = await AMQP.createConnection(url);
        const channel: any = await AMQP.createChannel(connection);
        const queue: any = await AMQP.assetQueueInChannel(channel, '');
        await channel.consume(queue.queue, function(msg: any) {
                console.log(' [.] Got %s', msg.content.toString());
                array.push(msg.content.toString());
                setTimeout(function() {
                    connection.close();
                    resolve(array)
                }, 1000)}
            ,
            {
                noAck: true
            });
        // @ts-ignore
        console.log('Message sent %s', args);
        await channel.sendToQueue('rpc',  Buffer.from(args), {replyTo: queue.queue });
    })


}

// consumer('typescript');
