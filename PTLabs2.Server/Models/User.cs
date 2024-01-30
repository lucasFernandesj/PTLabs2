﻿using Microsoft.AspNetCore.Identity;

namespace PTLabs2.Server.Models
{
    public class User : IdentityUser
    {
        public string? Name { get; set; }
    }
}
