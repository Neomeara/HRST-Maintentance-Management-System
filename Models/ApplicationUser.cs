using HRST_Maintenance_Management_System.Data;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace HRST_Maintenance_Management_System.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string firstname { get; set; } = "";
        public string lastname { get; set; } = "";
        public Group Group { get; set; }
        public List<MaintenanceList> MaintenanceLists { get; set; } = new List<MaintenanceList> { };

        public ApplicationUser(ApplicationDbContext db)
        {
      
            //ApplicationDbContext application = default!;
            //DefaultGroup group  = new DefaultGroup(application);
            Group = DefaultGroup.defaultGroup(db);
        }

        [JsonConstructor]
        public ApplicationUser() { }
    }

}