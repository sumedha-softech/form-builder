using FormBuilder.Server.Models;
using FormBuilder.Server.Models.RequestModels;

namespace FormBuilder.Server.Contracts;

public interface IFormService
{
    Task<ResponseModel> GetFormAsync(bool isRequestForTemplates= false);
    Task<ResponseModel> GetFormJsonAsync(int formId);
    Task<ResponseModel> SaveFormAsync(CreateFormRequestModel model);
    Task<ResponseModel> DeleteFormAsync(int formId);
    Task<ResponseModel> IsFormExistsAsync(int formId);
}
