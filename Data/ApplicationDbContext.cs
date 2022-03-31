using Duende.IdentityServer.EntityFramework.Options;
using HRST_Maintenance_Management_System.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HRST_Maintenance_Management_System.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<MaintenanceList> MaintenanceLists { get; set;}
        public DbSet<ListItem> ListItems { get; set;}
        public DbSet<Group> Groups { get; set; }

    }
}