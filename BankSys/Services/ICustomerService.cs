using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace BankSys.Services
{
    public interface ICustomerService
    {
        Task<Customer> GetById(int id);
        Task<IEnumerable<Customer>> GetAll();
        Task<TransferProcess> Add(TransferProcess transition);
        Customer Update(Customer customer);
    }
}
