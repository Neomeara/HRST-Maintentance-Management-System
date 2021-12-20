using Duende.IdentityServer.Models;

namespace HRST_Maintenance_Management_System
{
    public class Config
    {

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
    {
        new ApiScope(name: "read",   displayName: "Read your data."),
        new ApiScope(name: "write",  displayName: "Write your data."),
        new ApiScope(name: "delete", displayName: "Delete your data.")
    };
        }
    }
}
