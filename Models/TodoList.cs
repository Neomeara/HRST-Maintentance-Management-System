using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
namespace HRST_Maintenance_Management_System.Models
{
    public class MaintenanceList
    {
        
        [Required]
        [Key]
        public int MaintenanceListId { get; private set; }
        
        public string? ApplicationUserId { get; set; }

        public string Title { get; set; }

        public int GroupId { get; set; }
        public List<ListItem> ListItems { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastEditDate { get; set; }

    }

    public class ListItem
    {
        [Required]
        [Key]
        public int ListItemId { get; private set; }
        
        public int MaintenanceListId { get; set; }
        public string Name { get; set; }
        public int LocationId { get; set; }
        public int Cost { get; set; }
        public DateTime CostYear { get; set; }
        public int MaintenanceScheduleId { get; set; }
        public string Comments { get; set; } = "";
        public List<Picture> Pictures { get; set; } = new List<Picture> { };
    }
    public class Picture
    {
        [Required]
        [Key]
        public int PictureId { get; private set; }
        public int ListItemId { get; set; }

        public string url { get; set; } = "";

    }
    
    public class Location
    {
        [Required]
        [Key]
        public int LocationId { get; private set; }
        public string Name { get; set; } = "";
    }

    public class MaintenanceSchedule
    {
        [Required, Key]
        public int MaintenanceScheduleId { get; private set; }
        [Required]
        public string Name { get; set; } 

        public Dictionary<string, string> IntervalTypes = new Dictionary<string, string>() {
            { "calendarYear", "Calendar Year" },
            { "operationHours", "Operation Hours" },
            { "offlineHours", "Offline Hours" },
        };
        public int MaintenanceInterval { get; set; }
        public DateTime LastCompleted { get; set; }
        public DateTime NextScheduledEventForcasted { get; set; }
        public DateTime NextScheduledEventPlanned { get; set; }
        public int YearsToDelay { get; set; }


    }

    public class FullListItem
    {
        public ListItem ListItem { get; set; }
        public Location Location { get; set; }
        public MaintenanceSchedule MaintenanceSchedule { get; set; }
    }

    public class FullMaintenanceList
    {
        public MaintenanceList MaintenanceList { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Group Group { get; set; }
    }


}
