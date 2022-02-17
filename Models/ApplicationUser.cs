using Microsoft.AspNetCore.Identity;

namespace HRST_Maintenance_Management_System.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string firstname { get; set; } = "";
        public string lastname { get; set; } = "";
        public string group { get; set; } = "";

        public List<MaintenanceList> MaintenanceLists { get; set; } = new List<MaintenanceList> { };



    }
}