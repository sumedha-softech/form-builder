using FormBuilder.Server.Models;

namespace FormBuilder.Server.Contracts
{
    public interface ITemplateService
    {
        Task<ResponseModel> GetTemplatesAsync();
        Task<ResponseModel> GetTemplateByIdAsync(int id);
    }
}
