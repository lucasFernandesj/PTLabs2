using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTLabs2.Server.Models;

namespace PTLabs2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VulnerableController : ControllerBase
    {
        
        [HttpPost("changeEmail")]
        public async Task<IActionResult> ChangeEmail([FromBody] VulnerableEmailDto vulnerableEmailDto)
        {
            Console.WriteLine($"Controller - {vulnerableEmailDto.Name}");
            Console.WriteLine($"Controller - {vulnerableEmailDto.Email}");
            return Ok(vulnerableEmailDto);
        }
    }
}
