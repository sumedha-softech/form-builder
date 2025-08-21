using FormBuilder.Server.Application.Contracts;
using FormBuilder.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FormBuilder.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TemplateController(ITemplateService templateService) : ControllerBase
{
    #region [Get All Templates]
    [HttpGet]
    public async Task<IActionResult> GetTemplates()
    {
        var response = await templateService.GetTemplatesAsync();

        if (!response.IsSuccess)
            return StatusCode(204, response);

        return Ok(response);
    }
    #endregion [Get All Templates]

    #region [Get Template By Id]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTemplateById(int id)
    {
        if (id <= 0)
            return BadRequest(ResponseModel.Fail("Invalid template ID."));

        var response = await templateService.GetTemplateByIdAsync(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);

        return Ok(response);
    }
    #endregion [Get Template By Id]
}

