using FormBuilder.Server.Contracts;
using FormBuilder.Server.Models;
using FormBuilder.Server.Models.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace FormBuilder.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FormController(IFormService formService) : ControllerBase
{
    #region [Get All Forms or Templates]
    [HttpGet("{isRequestForTemplates?}")]
    public async Task<IActionResult> GetForms(bool? isRequestForTemplates = false)
    {
       var response = await formService.GetFormAsync(isRequestForTemplates ?? false);
        return Ok(response);
    }
    #endregion [Get All Forms or Templates]

    #region [Save Form]
    [HttpPost("")]
    public async Task<IActionResult> SaveForm([FromBody] CreateFormRequestModel model)
    {
        if (model == null)
        {
            return BadRequest(ResponseModel.Fail("Request model cannot be null."));
        }

        var response = await formService.SaveFormAsync(model);
        if (response.IsSuccess)
        {
            return Ok(response);
        }
        return BadRequest(response.Message);
    }
    #endregion [Save Form]
}
