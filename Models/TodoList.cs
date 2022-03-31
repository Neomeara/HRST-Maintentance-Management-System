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

        public string Title { get; set; } = "";

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
        public string Name { get; set; } = "";
        public string Location { get; set; } = "";
        public string Priority { get; set; } = "";
        public int TotalCost { get; set; }
        public int CostPerYear { get; set; }
        public int MaintenanceInterval { get; set; }
        public string MaintenanceIntervalType { get; set; } = "";
        public DateTime LastCompleted { get; set; }
        public DateTime NextScheduledEvent { get; set; }
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

}
