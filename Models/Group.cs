using System.ComponentModel.DataAnnotations;

namespace HRST_Maintenance_Management_System.Models
{
    public class Group
    {
        [Key]
        public int GroupId { get; set; }
        public string Name { get; set; } = "";
        public string Domain { get; set; }="";
        
    }
}
