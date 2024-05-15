namespace PTLabs2.Server.Models
{
    public class APILab2LogInDto
    {
        public string Email {  get; set; }
        public string Password { get; set; }
        public string ActualOTP {  get; set; }
        public string AttemptedOTP {  get; set; }

    }
}
