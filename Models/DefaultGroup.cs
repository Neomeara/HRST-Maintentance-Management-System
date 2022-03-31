using HRST_Maintenance_Management_System.Data;
using Microsoft.AspNetCore.Identity;

namespace HRST_Maintenance_Management_System.Models
{
    public class DefaultGroup
    {
        private static ApplicationDbContext _applicationDbContext;
        public DefaultGroup(ApplicationDbContext DbContext)
        {
            _applicationDbContext = DbContext;

        }
        public static Group defaultGroup(ApplicationDbContext db) {
            Group group;
            group = db.Groups.Where(x => x.Name == "!DefaultGroup!").Single();
            if (group != null)
            {
                return group;
            }
            else
            {
                return new Group();
            }
        }
    }

}
