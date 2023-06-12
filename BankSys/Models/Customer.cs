﻿namespace WebApplication1.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Double Balance { get; set; }
        public List<TransferProcess> Transition { get; set; }
    }
}
