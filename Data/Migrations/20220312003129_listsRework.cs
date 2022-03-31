using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRST_Maintenance_Management_System.Data.Migrations
{
    public partial class listsRework : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListItems_Locations_LocationId",
                table: "ListItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ListItems_Schedules_MaintenanceScheduleId",
                table: "ListItems");

            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceLists_AspNetUsers_ApplicationUserId",
                table: "MaintenanceLists");

            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceLists_Groups_GroupId",
                table: "MaintenanceLists");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceLists_GroupId",
                table: "MaintenanceLists");

            migrationBuilder.DropIndex(
                name: "IX_ListItems_LocationId",
                table: "ListItems");

            migrationBuilder.DropIndex(
                name: "IX_ListItems_MaintenanceScheduleId",
                table: "ListItems");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceLists_GroupId",
                table: "MaintenanceLists",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_LocationId",
                table: "ListItems",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_MaintenanceScheduleId",
                table: "ListItems",
                column: "MaintenanceScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ListItems_Locations_LocationId",
                table: "ListItems",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "LocationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ListItems_Schedules_MaintenanceScheduleId",
                table: "ListItems",
                column: "MaintenanceScheduleId",
                principalTable: "Schedules",
                principalColumn: "MaintenanceScheduleId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceLists_AspNetUsers_ApplicationUserId",
                table: "MaintenanceLists",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceLists_Groups_GroupId",
                table: "MaintenanceLists",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "GroupId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
