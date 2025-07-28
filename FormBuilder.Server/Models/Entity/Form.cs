namespace FormBuilder.Server.Models.Entity;
public class Form
{
    public int FormId { get; set; }
    public string FormName { get; set; }
    public bool IsTemplate { get; set; }
    public string TemplateName { get; set; }
    public string FormJson { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }

}
