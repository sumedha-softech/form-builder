using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormBuilder.Server.Migrations;

/// <inheritdoc />
public partial class Migration2 : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "FormName",
            table: "Forms",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddColumn<bool>(
            name: "IsTemplate",
            table: "Forms",
            type: "bit",
            nullable: false,
            defaultValue: false);

        migrationBuilder.AddColumn<string>(
            name: "TemplateName",
            table: "Forms",
            type: "nvarchar(max)",
            nullable: false,
            defaultValue: "");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "FormName",
            table: "Forms");

        migrationBuilder.DropColumn(
            name: "IsTemplate",
            table: "Forms");

        migrationBuilder.DropColumn(
            name: "TemplateName",
            table: "Forms");
    }
}
