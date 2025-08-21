using FormBuilder.Server.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace FormBuilder.Server.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

     public DbSet<DynamicForm> DynamicForms { get; set; }
     public DbSet<Template> Templates { get; set; }
}
