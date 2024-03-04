# API gateway with Kong
* Kong
* Database = postgresql
* [Kong UI](https://github.com/Kong/kong-manager)

## Install Kong
* [Reference](https://github.com/Kong/docker-kong/blob/master/compose/README.md)

### Build image with custom plugin
```
$docker compose build kong
```

### With [db-less](https://docs.konghq.com/gateway/latest/production/deployment-topologies/db-less-and-declarative-config/#main)
```
$docker compose up -d
$docker compose ps
```

### With PostgreSQL
```
$KONG_DATABASE=postgres docker compose --profile database up -d kong
$docker compose ps
$docker compose logs --follow
```

Access to Kong Manage (UI)
* http://localhost:8002/

## Start Auth service
Build image for auth api
```
$docker compose build auth-api
$docker compose up -d auth-api
$docker compose ps
$docker compose logs --follow
```

Login url with GET `http://localhost:3000/login`

## Config Kong
* Add service
* Add routes to service
* Add plugin to service
* Call target api from Kong

```
curl -i -X POST \
 --url http://localhost:8001/services/ \
 --data 'name=demo-service' \
 --data 'url=http://konghq.com'

curl -i -X POST \
 --url http://localhost:8001/services/demo-service/routes \
 --data 'hosts[]=example.com'

curl -i -X POST \
 --url http://localhost:8001/services/demo-service/plugins/ \
 --data 'name=custom-auth' \
 --data 'config.url=http://auth-api:3000/login'

curl -I -H "Host: example.com" http://localhost:8000/
```