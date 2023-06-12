using AutoMapper;
using BankSys.Dto;

namespace BankSys.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
           // CreateMap<Customer,IEnumerable<CustomerDto>>();
            CreateMap<Customer,CustomerDto>();
        } 
    }
}
