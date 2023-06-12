using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<TransferProcess> TransferProcesses { get; set; }
    }
}
