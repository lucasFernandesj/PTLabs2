using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PTLabs2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIOWASP : ControllerBase
    {
        [HttpGet("fetchEliTickets")]
        public IActionResult FetchEliTickets(int ticketsAccountID)
        {
            if (ticketsAccountID == 2)
            {
                var ticketData = new { Title = "Order #25326", Body = "I've ordered a white shirt but I got a blue one instead, this is unnaccetable!I demand a refund!" };
                return Ok(ticketData);
            }
            else if (ticketsAccountID == 5)
            {
                var ticketData = new { Title = "Order #7654", Body = "My coffee came cold" };
                return Ok(ticketData);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
