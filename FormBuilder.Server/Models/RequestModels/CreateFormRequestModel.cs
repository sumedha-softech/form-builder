using System.ComponentModel.DataAnnotations;

namespace FormBuilder.Server.Models.RequestModels;

public class CreateFormRequestModel
{
    [Required(ErrorMessage = "Name is required!!")]
    [StringLength(256, ErrorMessage = "Name cannot exceed 256 characters.")]
    public string? Name { get; set; }

    [StringLength(512, ErrorMessage = "Description cannot exceed 512 characters.")]
    public string? Description { get; set; }

    [Required(ErrorMessage = "Fields is required!!")]
    public string? Fields { get; set; }
}
