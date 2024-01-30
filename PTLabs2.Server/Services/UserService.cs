using Microsoft.AspNetCore.Identity;
using PTLabs2.Server.Data;
using PTLabs2.Server.Models;
using System.Security.Claims;

namespace PTLabs2.Server.Services
{
    public interface IUserService
    {
        Task<User> GetUser(ClaimsPrincipal userClaims);
        Task LogOut();
        
    }


    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly DataContext _dataContext;
        private readonly SignInManager<User> _signInManager;

        public UserService(UserManager<User> userManager, DataContext dataContext, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _dataContext = dataContext;
            _signInManager = signInManager;
        }



        public async Task<User> GetUser(ClaimsPrincipal userClaims)
        {
            var userId = userClaims.FindFirstValue(ClaimTypes.NameIdentifier); // Get user ID from token
            var user = await _userManager.FindByIdAsync(userId);
            return user;
        }

        public async Task LogOut()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
