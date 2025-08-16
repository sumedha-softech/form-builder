using FormBuilder.Server.Context;
using FormBuilder.Server.Contracts;
using FormBuilder.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FormBuilder.Server.Services
{
    public class TemplateService(ApplicationDbContext context) : ITemplateService
    {
        public async Task<ResponseModel> GetTemplatesAsync()
        {
            var templates = await context.Templates.Where(f => !f.IsDeleted).ToListAsync();
            if (templates == null || !templates.Any())
                return ResponseModel.Fail("No templates found!");

            return ResponseModel.Success("Templates fetched successfully!", templates);
        }

        public async Task<ResponseModel> GetTemplateByIdAsync(int id)
        {
            var template = await context.Templates.FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
            if (template == null)
                return ResponseModel.Fail("Template not found!");
            return ResponseModel.Success("Template fetched successfully!", template);
        }

    }
}
