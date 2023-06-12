using BankSys.Dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankSys.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDBContext _context;

        public CustomerService(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Customer> GetById(int id)
        {
            return await _context.Customers.FindAsync(id);
            
        }
        public async Task<IEnumerable<Customer>> GetAll()
        {
            return await _context.Customers.ToListAsync();
        }
            
        public async Task<TransferProcess> Add(TransferProcess transition)
        {
             await _context.TransferProcesses.AddAsync(transition);
            _context.SaveChanges();
            return transition;
        }

        public Customer Update(Customer customer)
        {
            _context.Update(customer);
            _context.SaveChanges();
            return customer;
        }
    }
}
