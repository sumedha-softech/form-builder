using FormBuilder.Server.Models;
using FormBuilder.Server.Models.RequestModels;

namespace FormBuilder.Server.Contracts;

public interface IDynamicFormService
{
    Task<ResponseModel> GetFormAsync();
    Task<ResponseModel> GetFormByIdAsync(int id);
    Task<ResponseModel> SaveFormAsync(CreateFormRequestModel model);
    Task<ResponseModel> EditFormAsync(int id,UpdateFormRequestModel model);
    Task<ResponseModel> DeleteFormAsync(int formId);
}
