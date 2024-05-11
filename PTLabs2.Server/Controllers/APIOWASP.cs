using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTLabs2.Server.Models;

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

        [HttpPost("Lab1Answer")]
        public IActionResult Lab1Answer([FromBody] AnswerDto answer)
        {
            if (answer.Answer == "5")
            {
                AnswerDto rightAnswer = new AnswerDto
                {
                    Answer = answer.Answer,
                    isRight = true
                };
            return Ok(rightAnswer);
            }
            else
            {
                return Ok();
            }
        }

        [HttpPost("ChangePasswordAPILab2")]
        public IActionResult ChangePasswordAPILab2([FromBody] ChangePasswordDto changePasswordDto)
        {
            if(changePasswordDto.Email == "john@test.com")
            {
                if(changePasswordDto.LastOTPSent ==changePasswordDto.OTP)
                {
                    return Ok("all right john");
                }
                else
                {
                    return Unauthorized();
                }


            }else if(changePasswordDto.Email == "test@test.com")
            {
                if(changePasswordDto.LastOTPSent == changePasswordDto.OTP)
                {
                    return Ok("all right test");
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return NotFound();
            }



        }
    }
}
