# Microservices workshop
* Technology stack
    * .Net 8
    * PostgreSQL
    * APISIX
    * Docker
* Resilience patterns
  * Circuit breaker
    * Alert system + Application metric
* Observability
  * Application metric
  * Distributed tracing
  * Centralized log


## Workshop :: Circuit Breaker
* Polly
* OpenTelemetry
* Prometheus
* Grafana

### Step to run
```
// Build image
docker compose build app

// Start container
docker compose up -d otel-collector
docker compose up -d prometheus
docker compose up -d grafana
docker compose up -d app

// Status of container
docker compose up -d app
docker compose logs --follow
```

### Try to use in web browser
* Prometheus
  * http://localhost:9090
* Grafana
  * http://localhost:3000
* App
  * http://localhost:5001/Users?userId=1
