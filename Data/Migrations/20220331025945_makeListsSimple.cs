using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRST_Maintenance_Management_System.Data.Migrations
{
    public partial class makeListsSimple : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pictures_ListItems_ListItemId",
                table: "Pictures");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pictures",
                table: "Pictures");

            migrationBuilder.RenameTable(
                name: "Pictures",
                newName: "Picture");

            migrationBuilder.RenameColumn(
                name: "MaintenanceScheduleId",
                table: "ListItems",
                newName: "TotalCost");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "ListItems",
                newName: "MaintenanceInterval");

            migrationBuilder.RenameColumn(
                name: "CostYear",
                table: "ListItems",
                newName: "NextScheduledEvent");

            migrationBuilder.RenameColumn(
                name: "Cost",
                table: "ListItems",
                newName: "CostPerYear");

            migrationBuilder.RenameIndex(
                name: "IX_Pictures_ListItemId",
                table: "Picture",
                newName: "IX_Picture_ListItemId");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastCompleted",
                table: "ListItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "ListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MaintenanceIntervalType",
                table: "ListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "ListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Picture",
                table: "Picture",
                column: "PictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Picture_ListItems_ListItemId",
                table: "Picture",
                column: "ListItemId",
                principalTable: "ListItems",
                principalColumn: "ListItemId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Picture_ListItems_ListItemId",
                table: "Picture");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Picture",
                table: "Picture");

            migrationBuilder.DropColumn(
                name: "LastCompleted",
                table: "ListItems");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "ListItems");

            migrationBuilder.DropColumn(
                name: "MaintenanceIntervalType",
                table: "ListItems");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "ListItems");

            migrationBuilder.RenameTable(
                name: "Picture",
                newName: "Pictures");

            migrationBuilder.RenameColumn(
                name: "TotalCost",
                table: "ListItems",
                newName: "MaintenanceScheduleId");

            migrationBuilder.RenameColumn(
                name: "NextScheduledEvent",
                table: "ListItems",
                newName: "CostYear");

            migrationBuilder.RenameColumn(
                name: "MaintenanceInterval",
                table: "ListItems",
                newName: "LocationId");

            migrationBuilder.RenameColumn(
                name: "CostPerYear",
                table: "ListItems",
                newName: "Cost");

            migrationBuilder.RenameIndex(
                name: "IX_Picture_ListItemId",
                table: "Pictures",
                newName: "IX_Pictures_ListItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pictures",
                table: "Pictures",
                column: "PictureId");

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    LocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.LocationId);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    MaintenanceScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastCompleted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaintenanceInterval = table.Column<int>(type: "int", nullable: false),
                    NextScheduledEventForcasted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NextScheduledEventPlanned = table.Column<DateTime>(type: "datetime2", nullable: false),
                    YearsToDelay = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.MaintenanceScheduleId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Pictures_ListItems_ListItemId",
                table: "Pictures",
                column: "ListItemId",
                principalTable: "ListItems",
                principalColumn: "ListItemId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
