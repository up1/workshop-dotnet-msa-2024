# Observability workshop
* [Grafana cloud](https://grafana.com/docs/grafana-cloud/)
* [OpenTelemetry](https://opentelemetry.io/)
* LGTM stack
  * Logs with Loki
  * Grafana
  * Tracing with Tempo
  * Metrics storage with Mimir

## Workshop with Tracing and Metrics
* NodeJS 20
* Database PostgreSQL
* OpenTelemetry
* Tracing
  * Jaeger
* Metrics
  * Prometheus
  * Grafana

### 1. Start Jaeger and Database
```
$docker compose up -d jaeger
$docker compose up -d db
$docker compose ps
```
Access to jaeger = http://localhost:16686/

### 2. Start `service a` with simple command
```
$npm install

$export OTEL_SERVICE_NAME="service-a"
$npm start
```

Access to service a
* http://localhost:3002
* http://localhost:3002/metrics

More endpoints
* Connect to db
  * http://localhost:3002/call-db
* More steps (custom spans)
  * http://localhost:3002/steps

### 3. Start `service a` with Docker compose
```
$docker compose build service-a
$docker compose up -d service-a
$docker compose ps
```

### 4. Start prometheus
```
$docker compose up -d prometheus
$docker compose ps
```

Access to prometheus = http://localhost:9090
* Go to menu Status => Targets