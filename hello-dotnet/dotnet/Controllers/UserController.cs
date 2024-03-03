using System.Net;
using Microsoft.AspNetCore.Mvc;
using Prometheus;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        // Custom metrics
        private static readonly Counter counter = Metrics.CreateCounter("myapp_getuser_total", "Number of request.", labelNames: new[] { "status" });
                private readonly IHttpClientFactory _httpClientFactory;
        public UsersController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet()]
        public async Task<IActionResult> Get(int userId, CancellationToken ct)
        {
            var client = _httpClientFactory.CreateClient("typicode-users");
            
            var response = await client.GetAsync(
                $"users/{userId}", ct);

            if (response.IsSuccessStatusCode){
                counter.WithLabels("success").Inc();
                return Ok(await response.Content.ReadAsStringAsync());
            }
            if (response.StatusCode == HttpStatusCode.NotFound){
                counter.WithLabels("notfound").Inc();
                return NotFound();
            }

            counter.WithLabels("error").Inc();
            return StatusCode(500);
        }
    }
}