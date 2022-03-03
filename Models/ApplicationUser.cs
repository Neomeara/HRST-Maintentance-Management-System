using Microsoft.AspNetCore.Identity;

namespace HRST_Maintenance_Management_System.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string firstname { get; set; } = "";
        public string lastname { get; set; } = "";
        public Group Group { get; set; } = new Group();

        public List<MaintenanceList> MaintenanceLists { get; set; } = new List<MaintenanceList> { };



    }
}