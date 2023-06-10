using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankSys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public CustomersController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpGet("viewAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            var customer =await _context.Customers.ToListAsync(); 
            return Ok(customer);
        }

    }
}
