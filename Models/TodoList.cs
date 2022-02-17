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
        
        public ApplicationUser ApplicationUser { get; set; }
        public string ApplicationUserId { get; set; }

        public string Title { get; set; }

        public string Group { get; set; } = "";
        public List<ListItem> ListItems { get; set; } = new List<ListItem> { };
        public DateTime CreationDate { get; set; }
        public DateTime LastEditDate { get; set; }

    }

    public class ListItem
    {
        [Required]
        [Key]
        public int ListItemId { get; private set; }
        
        public MaintenanceList MaintenanceList { get; set; } = new MaintenanceList();
        public int MaintenanceListId { get; set; }
        public string Name { get; set; } = "";
        public Location Location { get; set; } = new Location();
        public int Cost { get; set; }
        public DateTime CostYear { get; set; }
        public MaintenanceSchedule MaintenanceSchedule { get; set; } = new MaintenanceSchedule();
        public string Comments { get; set; } = "";
        public List<Picture> Pictures { get; set; } = new List<Picture> { };
    }
    public class Picture
    {
        [Required]
        [Key]
        public int PictureId { get; private set; }
        public ListItem ListItem { get; set; } = new ListItem();
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

 
    
}
