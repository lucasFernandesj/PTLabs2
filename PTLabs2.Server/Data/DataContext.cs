using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PTLabs2.Server.Models;

namespace PTLabs2.Server.Data
{
    public class DataContext : IdentityDbContext
    {
        public DbSet<User> Users { get; set; }
        //public DbSet<Lab> Labs { get; set; }
        public  DataContext(DbContextOptions<DataContext> options):base(options)
            {
            
            }

    }
}
