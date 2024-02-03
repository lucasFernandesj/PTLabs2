using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PTLabs2.Server.Data;
using PTLabs2.Server.Models;
using System.Security.Claims;

namespace PTLabs2.Server.Services
{
    public interface IUserService
    {
        Task<User> GetUser(ClaimsPrincipal userClaims);
        Task LogOut();
        Task<bool> CheckLab(ClaimsPrincipal userClaims, LabDto labDto);
        Task SolveLab(ClaimsPrincipal userClaims, string labName);
        
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

        public async Task<bool> CheckLab(ClaimsPrincipal userClaims, LabDto labDto)
        {
            var userId = userClaims.FindFirstValue(ClaimTypes.NameIdentifier);
            var User = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);

            return User?.Labs.Any(lab => lab == labDto.Name) ?? false;
        }


        public async Task SolveLab(ClaimsPrincipal userClaims, string labName)
        {
            var userId = userClaims.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            //If the user havent completede that lab, add it
            if (user.Labs == null)
            {
                user.Labs = new List<string>();
            }
            // Check if the lab name already exists in the user's Labs list
            if (!user.Labs.Contains(labName))
            {
                user.Labs.Add(labName);

                // Save changes to the database
                await _dataContext.SaveChangesAsync();
            }
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
