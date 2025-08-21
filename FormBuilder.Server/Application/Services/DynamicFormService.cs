using FormBuilder.Server.Application.Contracts;
using FormBuilder.Server.Infrastructure.Persistence;
using FormBuilder.Server.Infrastructure.Persistence.Entity;
using FormBuilder.Server.Models;
using FormBuilder.Server.Models.RequestModels;
using Microsoft.EntityFrameworkCore;

namespace FormBuilder.Server.Application.Services;

public class DynamicFormService(ApplicationDbContext context) : IDynamicFormService
{
 

    public async Task<ResponseModel> GetFormByIdAsync(int id)
    {
        var form = await context.DynamicForms.FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);
        if (form == null)
            return ResponseModel.Fail("Form not found!!");

        return ResponseModel.Success("Form fetched successfully!!", form);
    }

    public async Task<ResponseModel> DeleteFormAsync(int formId)
    {
        var form = context.DynamicForms.FirstOrDefault(f => f.Id == formId && !f.IsDeleted);
        if (form == null)
            return ResponseModel.Fail("Form not found!!");

        form.IsDeleted = true;
        form.DeletedAt = DateTime.UtcNow;
        form.UpdatedAt = DateTime.UtcNow;

        context.DynamicForms.Update(form);
        await context.SaveChangesAsync();
        return ResponseModel.Success("Form deleted successfully!!");
    }

    public async Task<ResponseModel> GetFormAsync()
    {
        if (context.DynamicForms == null)
            return ResponseModel.Success("Forms not found!!");

        var forms = await context.DynamicForms.Where(f => !f.IsDeleted).ToListAsync();
        return ResponseModel.Success($"Forms Fetched Successfully !!", forms);
    }

    public async Task<ResponseModel> SaveFormAsync(CreateFormRequestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Fields))
            return ResponseModel.Fail("Form JSON cannot be empty!");

        var form = new DynamicForm
        {
            Name = model.Name ?? "Untitled Form",
            Description= model.Description,
            Fields = model.Fields,
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false
        };

        await context.DynamicForms.AddAsync(form);
        await context.SaveChangesAsync();
        return ResponseModel.Success("Form saved successfully!", form);
    }

    public async Task<ResponseModel> EditFormAsync(int id, UpdateFormRequestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Fields))
            return ResponseModel.Fail("Form fields cannot be empty!");

        var form = await context.DynamicForms.FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);
        if (form == null)
            return ResponseModel.Fail("Form not found!");

        form.Name = model.Name ?? form.Name;
        form.Fields = model.Fields;
        form.Description = model.Description ?? form.Description;
        form.UpdatedAt = DateTime.UtcNow;
        context.DynamicForms.Update(form);
        await context.SaveChangesAsync();

        return ResponseModel.Success("Form updated successfully!", form);
    }
}
