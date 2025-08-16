namespace FormBuilder.Server.Models.Entity;

public class Template
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string Fields { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
}

