namespace BankSys.Dto
{
    public class TransitionDto
    {
        public int id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        [MaxLength(100)]
        public Double Quantity { get; set; }
        public int CustomerId { get; set; }
    }
}
