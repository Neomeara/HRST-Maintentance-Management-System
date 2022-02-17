using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRST_Maintenance_Management_System.Data.Migrations
{
    public partial class addTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "MaintenanceLists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "MaintenanceLists");
        }
    }
}
