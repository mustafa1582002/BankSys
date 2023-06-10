
namespace WebApplication1.Models
{
    public class TransferProcess
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        [MaxLength(100)]
        public Double Quantity { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
