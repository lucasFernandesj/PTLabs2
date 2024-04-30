
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PTLabs2.Server.Data;
using PTLabs2.Server.Models;
using PTLabs2.Server.Services;

namespace PTLabs2.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey
                });
            });
            builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<DataContext>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowMyOrigin",
                    builder => builder.WithOrigins("https://localhost:5173") 
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials()); 
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowMyOrigin");
            app.UseHttpsRedirection();
            app.MapIdentityApi<User>();
            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
