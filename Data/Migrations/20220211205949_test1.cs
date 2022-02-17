using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRST_Maintenance_Management_System.Data.Migrations
{
    public partial class test1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceLists_AspNetUsers_ApplicationUserId",
                table: "MaintenanceLists");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "MaintenanceLists",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceLists_AspNetUsers_ApplicationUserId",
                table: "MaintenanceLists",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceLists_AspNetUsers_ApplicationUserId",
                table: "MaintenanceLists");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "MaintenanceLists",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceLists_AspNetUsers_ApplicationUserId",
                table: "MaintenanceLists",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
