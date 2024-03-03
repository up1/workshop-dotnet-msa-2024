# Workshop :: Async with NodeJS and RabbitMQ
* Queue

## 1. Start rabbitmq server
```
$docker run -d --hostname my-rabbit --name my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Access to RabbitMQ admin page
* http://localhost:15672
  * user=guest
  * password=guest

## 2. Start order service
```
$npm run order-service
```

Access to order server
* http://localhost:3001/purchase/:id

## 3. Start stock service as consumer
```
$npm run stock-service
```
