using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
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

        private readonly Dictionary<string, string> UsersAuthenticationLab1 = new Dictionary<string, string>
        {
            {"admin", "password1"},
            {"Lucas", "password2"},
            {"Maor", "password3"},
            {"Tzion", "password4"},
            {"Haim", "password5"},
            {"Tuvia", "password6"},
            {"Avi", "password7"}
        };

        [HttpPost("logInAuthenticationLab1")]
        public IActionResult LogInAuthenticationLab1([FromBody] VulnerableLogInDto vulnerableLogInDto)
        {
            string username = vulnerableLogInDto.UserName;
            string password = vulnerableLogInDto.Password;

            if (UsersAuthenticationLab1.ContainsKey(username))
            {
                if (UsersAuthenticationLab1[username] != password)
                {
                    return Ok("Wrong password");
                }
                else
                {
                    return Ok($"Welcome {username}");
                }
            }
            else
            {
                return Ok("User not registered");
            }
        }

        [HttpPost("SolveAuthenticationLab1")]
        public IActionResult SolveAuthenticationLab1([FromBody] ListOfNamesDto listOfNamesDto)
        {
            List<string> namesToCheck = UsersAuthenticationLab1.Keys.ToList();
            bool containsAllNames = namesToCheck.All(name => listOfNamesDto.Names.Contains(name));

            if (containsAllNames)
            {
                return Ok("All of the names that you entered are registered on the app");
            }
            else
            {
                return Ok("Not all names from the dictionary are present in the list.");
            }
        }

        [HttpPost("logInAuthenticationLab2")]
        public IActionResult LogInAuthenticationLab2([FromBody] AuthenticationLab2Token token)
        {
            Console.WriteLine("logInAuthenticationLab2 endpoint");
            try
            {
                String[] payloadArr = token.Token.Split('.');
                String payload = payloadArr[1];

                int paddingLength = payload.Length % 4;
                if (paddingLength > 0)
                {
                    payload += new string('=', 4 - paddingLength);
                }

                byte[] payloadDecoded = Convert.FromBase64String(payload);
                string decodedString = System.Text.Encoding.UTF8.GetString(payloadDecoded);

                if (decodedString == "{\"name\":\"Ira\"}")
                {
                    var userIra = new AuthenticationLab2Response
                    {
                        Name = "Ira",
                        Data = new List<string> { "IMac", "HeadPhones", "Mouse" },
                        LabSolved = false
                    };
                    return Ok(userIra);
                }
                else if (decodedString == "{\"name\":\"Yair\"}")
                {
                    var userYair = new AuthenticationLab2Response
                    {
                        Name = "Yair",
                        Data = new List<string> { "Shoes", "Shirt", "Socks" },
                        LabSolved = true
                    };
                    return Ok(userYair);
                }
                else
                {
                    var someBodyElse = new AuthenticationLab2Response
                    {
                        Name = "404",
                        Data = new List<string> { "404" }
                    };
                    return Ok(someBodyElse);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("passwordsList")]
        public IActionResult GetPasswordsFile([FromServices] IWebHostEnvironment hostingEnvironment)
        {
            string filePath = Path.Combine(hostingEnvironment.ContentRootPath, "App_Data", "Passwords.txt");

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(); // File not found
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;

            return File(memory, "text/plain", "Passwords.txt");
        }

        [HttpPost("AuthenticationLab3LogIn")]
        public IActionResult AuthenticationLab3LogIn([FromBody] VulnerableLogInDto vulnerableLogInDto)
        {


            if (vulnerableLogInDto.UserName=="Gidi" && vulnerableLogInDto.Password =="sunscreen")
            {
                var userGidi = new AuthenticationLab2Response
                {
                    Name = "Gidi",
                    Data = new List<string> { "Sunscreen", "Flip flops", "Ball" },
                    LabSolved = true
                };

                return Ok(userGidi);

            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet("friendsListIDORLab3")]
        public IActionResult friendsIDORLab3()
        {
            var Eli = new
            {
                Name = "Eli",
                Address = "Petah Tikwa",
                NumberOfPictures = 5,
                CreditCardNumber = "1234 5678 9012 3456"
            };

            var Javier = new
            {
                Name = "Javier",
                Address = "Ramat Gan",
                NumberOfPictures = 10,
                CreditCardNumber = "9876 5432 1098 7654"
            };

            var Micha = new
            {
                Name = "Micha",
                Address = "Bnei Barak",
                NumberOfPictures = 7,
                CreditCardNumber = "2468 1357 3690 2587"
            };

            // Return the objects as JSON
            return Ok(new List<object> { Eli, Javier, Micha });
        }

        [HttpPost("submitAnswerIDORLab3")]
        public IActionResult submitAnswerIDORLab3([FromBody] AnswerIDOLab3Dto answer)
        {
            if(answer.answer== "9876 5432 1098 7654")
            {
                return Ok("Conagratulations, you have solved the lab!");
            }
            else
            {
                return BadRequest("Wrong, try again");
            }
        }


    }
}
