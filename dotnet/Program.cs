using Data;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using Polly;
using Strategies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Http client
builder.Services.AddHttpClient("typicode-users", c =>
    {
        c.BaseAddress = new Uri(builder.Configuration.GetValue<string>("TypiCodeBaseUri") ??
                                throw new InvalidOperationException());
        c.DefaultRequestHeaders.Add("accept", "application/json");

    }).AddPolicyHandler(PollyResiliencePipelines.CreateCircuitBreakerStrategy().AsAsyncPolicy());

// OpenTelemetry
builder.Services.AddOpenTelemetry().WithMetrics(opts => opts
    .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("Pollyv8.WebApi"))
    .AddMeter("Polly")
    .AddOtlpExporter(options =>
    {
        options.Endpoint = new Uri(builder.Configuration.GetValue<string>("OtlpEndpointUri")
                                   ?? throw new InvalidOperationException());
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.MapControllers();
app.Run();
