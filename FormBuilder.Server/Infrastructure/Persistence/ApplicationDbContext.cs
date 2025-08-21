using FormBuilder.Server.Infrastructure.Persistence.Entity;
using Microsoft.EntityFrameworkCore;

namespace FormBuilder.Server.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext() { }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public virtual DbSet<DynamicForm> DynamicForms { get; set; } = default!;
    public virtual DbSet<Template> Templates { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
    }
}
