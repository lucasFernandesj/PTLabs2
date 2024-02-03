using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTLabs2.Server.Data;
using PTLabs2.Server.Services;
using System.Security.Claims;

namespace PTLabs2.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IUserService _userService;
        public UsersController(IUserService userService, DataContext dataContext)
        {
            _userService = userService;
            _dataContext = dataContext;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userService.GetUser(User); // Pass the User property
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            _userService.LogOut();
            return Ok();
        }

        [HttpGet("isLoggedIn")]
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Ok("isAuthenticated");
            }
            else
            {
                return Ok();
            }
        }

        [Authorize]
        [HttpPost("checkLab")]
        public async Task<IActionResult> CheckLab(LabDto labDto)
        {
            bool labIsCompleted = await _userService.CheckLab(User, labDto);
            if (labIsCompleted) { return Ok("LabIsCompleted"); }
            else { return Ok("Lab is NOT completed"); }
            var name = labDto.Name;
            return Ok(name);
        }


        [Authorize]
        [HttpPost("solveLab")]
        public async Task<IActionResult> SolveLab([FromBody] LabDto model)
        {
            try
            {
                string labName = model.Name;
                await _userService.SolveLab(User, labName);
                return Ok();
            }
            catch (Exception ex)
            {
                // Handle exception
                return BadRequest(ex.Message);
            }
        }

    }
}
