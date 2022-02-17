using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRST_Maintenance_Management_System.Data.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "firstname",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "group",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "lastname",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "firstname",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "group",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "lastname",
                table: "AspNetUsers");
        }
    }
}
