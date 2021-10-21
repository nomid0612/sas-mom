#Requirements:
- docker 
- nodeJS LST  
- RabbitMQ >= 3.9


#Structure: 
- amqp - realised methods for working with RabbitMQ
- config - test data 
- producerConsumer - realised direct and rpc connection
- test - tests for direct and rpc connection

#Run test
before running tests run: 
- npm i and docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

to run tests: 
- npm run runRpcTest 
- npm run directTest 


