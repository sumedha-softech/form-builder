using FormBuilder.Server.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace FormBuilder.Server.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

     public DbSet<Form> Forms { get; set; }
}
