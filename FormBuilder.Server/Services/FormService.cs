using FormBuilder.Server.Context;
using FormBuilder.Server.Contracts;
using FormBuilder.Server.Models;
using FormBuilder.Server.Models.Entity;
using FormBuilder.Server.Models.RequestModels;
using Microsoft.EntityFrameworkCore;

namespace FormBuilder.Server.Services;

public class FormService(ApplicationDbContext context) : IFormService
{

    public async Task<ResponseModel> DeleteFormAsync(int formId)
    {
        var form = context.Forms.FirstOrDefault(f => f.FormId == formId && !f.IsDeleted);
        if (form == null)
        {
            return ResponseModel.Fail("Form not found!!");
        }
        form.IsDeleted = true;
        context.Forms.Update(form);
        await context.SaveChangesAsync();
        return ResponseModel.Success("Form deleted successfully!!");
    }

    public async Task<ResponseModel> GetFormAsync(bool isRequestForTemplates = false)
    {
        if (context.Forms == null)
        {
            return ResponseModel.Success("Forms not found!!");
        }

        var forms = isRequestForTemplates
            ?await context.Forms.Where(f => f.IsTemplate && !f.IsDeleted).ToListAsync()
            :await context.Forms.Where(f => !f.IsTemplate && !f.IsDeleted).ToListAsync();
        return ResponseModel.Success($"All {(isRequestForTemplates ? "Templates" : "Forms")} Successfully fetched!!" , forms);
    }
    public async Task<ResponseModel> SaveFormAsync(CreateFormRequestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.FormJson))
            return ResponseModel.Fail("Form JSON cannot be empty!");

        var form = new Form
        {
            FormName = model.FormName ?? "Untitled Form",
            IsTemplate = model.IsTemplate,
            TemplateName = model.TemplateName ?? "Untitled Template",
            FormJson = model.FormJson,
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false
        };

        await context.Forms.AddAsync(form);
        await context.SaveChangesAsync();
        return ResponseModel.Success("Form saved successfully!", form);
    }

    public Task<ResponseModel> GetFormJsonAsync(int formId)
    {
        throw new NotImplementedException();
    }

    public Task<ResponseModel> IsFormExistsAsync(int formId)
    {
        throw new NotImplementedException();
    }

}
