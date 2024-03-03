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
* OpenTelemetry
* Tracing
  * Jaeger
* Metrics
  * Prometheus
  * Grafana

### 1. Start Jaeger
```
$docker compose up -d jaeger
```
Access to jaeger = http://localhost:16686/

### 2. Start `service a`
```
$npm install

$export OTEL_SERVICE_NAME="service-a"
$npm start
```

Access to service a
* http://localhost:3002
* http://localhost:3002/metrics

