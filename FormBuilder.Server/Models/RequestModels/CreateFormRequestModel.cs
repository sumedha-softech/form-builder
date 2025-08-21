using System.ComponentModel.DataAnnotations;

namespace FormBuilder.Server.Models.RequestModels;

public class CreateFormRequestModel
{
    [Required(ErrorMessage = "Form Name is required!!")]
    public string? Name { get; set; }

    public string? Description { get; set; }

    [Required(ErrorMessage = "Form Fields is required!!")]
    public string? Fields { get; set; }
}
