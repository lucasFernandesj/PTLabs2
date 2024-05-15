namespace PTLabs2.Server.Models
{
    public class ChangePasswordDto
    {
        public string Email { get; set; }
        public string OTP { get; set; }
        public string? LastOTPSent {  get; set; }
        public string NewPassword { get; set; }
        public bool IsSuccessful {  get; set; }    
    }
}
