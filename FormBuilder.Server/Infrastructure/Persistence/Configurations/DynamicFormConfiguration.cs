using FormBuilder.Server.Infrastructure.Persistence.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FormBuilder.Server.Infrastructure.Persistence.Configurations;

public class DynamicFormConfiguration : IEntityTypeConfiguration<DynamicForm>
{
    public void Configure(EntityTypeBuilder<DynamicForm> builder)
    {
        builder.ToTable("DynamicForms");

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id)
               .ValueGeneratedOnAdd()
               .IsRequired();

        builder.Property(e => e.Name).HasMaxLength(256).IsRequired();
        builder.Property(e => e.Description).HasMaxLength(512).IsRequired(false);
        builder.Property(e => e.Fields).IsRequired();

        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.UpdatedAt).IsRequired(false);
        builder.Property(e => e.DeletedAt).IsRequired(false);
        builder.Property(e => e.IsDeleted).IsRequired();
    }
}
