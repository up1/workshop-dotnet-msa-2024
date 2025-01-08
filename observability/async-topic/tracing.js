const opentelemetry = require("@opentelemetry/sdk-node");
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
    OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-proto');
const {
    OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-proto');
const { PeriodicExportingMetricReader, ConsoleMetricExporter } = require('@opentelemetry/sdk-metrics');
const { AmqplibInstrumentation } = require('@opentelemetry/instrumentation-amqplib');
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const sdk = new opentelemetry.NodeSDK({
    traceExporter: new OTLPTraceExporter({
        // optional - default url is http://localhost:4318/v1/traces
        //url: 'http://localhost:9193/v1/traces',
        url: process.env.OTEL_COLLECTOR_SERVER || 'http://localhost:4318/v1/traces', // Send to Jaeger (otel collector)
        // optional - collection of custom headers to be sent with each request, empty by default
        headers: {},
    }),
    // metricReader: new PeriodicExportingMetricReader({
    //     exporter: new ConsoleMetricExporter(),
    //     exportIntervalMillis: 1000,
    // }),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: 'http://localhost:14318/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
            headers: {}, // an optional object containing custom headers to be sent with each request
            concurrencyLimit: 1, // an optional limit on pending requests
        }),
    }),
    instrumentations: [
        getNodeAutoInstrumentations(),
        new AmqplibInstrumentation(),
        new HttpInstrumentation(),
        new ExpressInstrumentation()
    ],
    serviceName: process.env.SERVICE
});
sdk.start()