# Microservices workshop
* Technology stack
    * [x] Net 8
    * [ ] Docker
    * [ ] PostgreSQL
    * [ ] APISIX
* Resilience patterns
  * [x] Circuit breaker
    * [x] Alert system + Application metric
* Observability
  * [ ] Application metric
  * [ ] Distributed tracing
  * [ ] Centralized log


## Workshop :: Circuit Breaker
* Polly
* OpenTelemetry
* Prometheus
* Grafana

## Step to run with .NET (dev mode)
```
$dotnet restore
$dotnet run
```
Run in browser
* App
  * http://localhost:5163/Users?userId=1
* Swagger
  * http://localhost:5163/swagger/index.html

### Step to run with Docker
```
// Build image
docker compose build app

// Start container
docker compose up -d otel-collector
docker compose up -d prometheus
docker compose up -d grafana
docker compose up -d db
docker compose up -d app

// Status of container
docker compose up -d app
docker compose logs --follow
```

### Try to use in web browser
* App
  * http://localhost:5001/Users?userId=1
* Swagger
  * http://localhost:5001/Users?userId=1
* Prometheus
  * http://localhost:9090
* Grafana
  * http://localhost:3000
