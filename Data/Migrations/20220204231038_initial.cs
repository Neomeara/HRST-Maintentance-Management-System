using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRST_Maintenance_Management_System.Data.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "MaintenanceLists",
                columns: table => new
                {
                    MaintenanceListId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Group = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastEditDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceLists", x => x.MaintenanceListId);
                    table.ForeignKey(
                        name: "FK_MaintenanceLists_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    MaintenanceScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenanceInterval = table.Column<int>(type: "int", nullable: false),
                    LastCompleted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NextScheduledEventForcasted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NextScheduledEventPlanned = table.Column<DateTime>(type: "datetime2", nullable: false),
                    YearsToDelay = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.MaintenanceScheduleId);
                });

            migrationBuilder.CreateTable(
                name: "ListItems",
                columns: table => new
                {
                    ListItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenanceListId = table.Column<int>(type: "int", nullable: false),
                    MaintenaceListId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Cost = table.Column<int>(type: "int", nullable: false),
                    CostYear = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaintenanceScheduleId = table.Column<int>(type: "int", nullable: false),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListItems", x => x.ListItemId);
                    table.ForeignKey(
                        name: "FK_ListItems_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "LocationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListItems_MaintenanceLists_MaintenanceListId",
                        column: x => x.MaintenanceListId,
                        principalTable: "MaintenanceLists",
                        principalColumn: "MaintenanceListId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListItems_Schedules_MaintenanceScheduleId",
                        column: x => x.MaintenanceScheduleId,
                        principalTable: "Schedules",
                        principalColumn: "MaintenanceScheduleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    PictureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListItemId = table.Column<int>(type: "int", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.PictureId);
                    table.ForeignKey(
                        name: "FK_Pictures_ListItems_ListItemId",
                        column: x => x.ListItemId,
                        principalTable: "ListItems",
                        principalColumn: "ListItemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_LocationId",
                table: "ListItems",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_MaintenanceListId",
                table: "ListItems",
                column: "MaintenanceListId");

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_MaintenanceScheduleId",
                table: "ListItems",
                column: "MaintenanceScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceLists_ApplicationUserId",
                table: "MaintenanceLists",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Pictures_ListItemId",
                table: "Pictures",
                column: "ListItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropTable(
                name: "ListItems");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "MaintenanceLists");

            migrationBuilder.DropTable(
                name: "Schedules");
        }
    }
}
