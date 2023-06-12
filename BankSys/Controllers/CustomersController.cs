using AutoMapper;
using BankSys.Dto;
using BankSys.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace BankSys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly IMapper _mapper;

        public CustomersController(ICustomerService customerService, IMapper mapper)
        {
            _customerService = customerService;
            _mapper = mapper;
        }

        [HttpGet("viewAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            var customers =await _customerService.GetAll();
            var data = _mapper.Map<IEnumerable<CustomerDto>>(customers);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var customer =await _customerService.GetById(id);

            if(customer == null)
            {
                return NotFound();
            }
            var data= _mapper.Map<CustomerDto>(customer);
            var dto = new CustomerDto
            {
                id = customer.id,
                Name = customer.Name,
                Email = customer.Email,
                Balance = customer.Balance  
            };
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> TransferAsync([FromForm]int SenderId,[FromForm]int RecevierId,[FromForm] double quantity)
        {
            if(SenderId==RecevierId)
            {
                return BadRequest("invalid operation");
            }
            var firstcustomer =await _customerService.GetById(SenderId);
            var secondcustomer = await _customerService.GetById(RecevierId);
            if(firstcustomer == null || secondcustomer ==null)
            {
                return NotFound();
            }
            
            if(quantity <= 0)
            {
                return BadRequest("Quantity is not valid");
            }
            if(firstcustomer.Balance < quantity  ) {
                return BadRequest("sender account doesnot have money");
            }
            firstcustomer.Balance -= quantity;
            secondcustomer.Balance += quantity;
            _customerService.Update(firstcustomer);
            _customerService.Update(secondcustomer);
            
            var transition = new TransferProcess
            {
                From = firstcustomer.Name,
                To = secondcustomer.Name,
                Quantity = quantity,
                CustomerId=firstcustomer.id
            };
            await _customerService.Add(transition);
            return Ok("Transition completed");
        }

    }
}
