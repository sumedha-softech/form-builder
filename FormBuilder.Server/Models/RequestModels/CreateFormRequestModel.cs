namespace FormBuilder.Server.Models.RequestModels;

public class CreateFormRequestModel
{
    public string FormName { get; set; }
    public bool IsTemplate { get; set; }
    public string TemplateName { get; set; }
    public string FormJson { get; set; }
}
