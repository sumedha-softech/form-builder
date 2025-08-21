using FormBuilder.Server.Application.Contracts;
using FormBuilder.Server.Models;
using FormBuilder.Server.Models.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace FormBuilder.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DynamicFormController(IDynamicFormService formService) : ControllerBase
{
    #region [Get All Forms]
    [HttpGet("")]
    public async Task<IActionResult> GetForms()
    {
        var response = await formService.GetFormAsync();
        return Ok(response);
    }
    #endregion [Get All Forms]

    #region [Get Form By Id]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetFormById(int id)
    {
        if (id <= 0)
            return BadRequest(ResponseModel.Fail("Invalid form ID."));

        var response = await formService.GetFormByIdAsync(id);
        if (response.IsSuccess)
            return Ok(response);

        return NotFound(response.Message);
    }
    #endregion [Get Form By Id]

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

    #region [Edit Form]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateForm(int id, [FromBody] UpdateFormRequestModel model)
    {
        if (model == null)
        {
            return BadRequest(ResponseModel.Fail("Request model cannot be null."));
        }

        var response = await formService.EditFormAsync(id, model);
        if (response.IsSuccess)
        {
            return Ok(response);
        }
        return BadRequest(response.Message);
    }
    #endregion [Edit Form]

    #region [Delete Form]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var response = await formService.DeleteFormAsync(id);
        if (!response.IsSuccess)
            return NotFound(response);
        return Ok(response);
    }
    #endregion [Delete Form]
}
