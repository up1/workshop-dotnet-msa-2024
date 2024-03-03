const opentelemetry = require('@opentelemetry/api');
const {
  MeterProvider,
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
const {
    OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-proto');

const metricReader = new PeriodicExportingMetricReader({
  exporter: new ConsoleMetricExporter(),
  exportIntervalMillis: 1000,
});

const myServiceMeterProvider = new MeterProvider({
  readers: [metricReader],
});

// Set this MeterProvider to be global to the app being instrumented.
opentelemetry.metrics.setGlobalMeterProvider(myServiceMeterProvider);