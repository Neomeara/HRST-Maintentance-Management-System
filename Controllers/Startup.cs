using HRST_Maintenance_Management_System.Data;
using HRST_Maintenance_Management_System.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRST_Maintenance_Management_System.Controllers
{
    public class CustomClaimTypes
    {
        public const string Permission = "HRST_MMS/permission";
    }
    public static class Startup
    {
        static Startup()
        {
            
        }

        public static async void Setup(WebApplication _app)
        {
            var scope = _app.Services.CreateScope();
            
            var _roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

            var _userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();

            

            ApplicationDbContext _dbcontext = scope.ServiceProvider.GetService<ApplicationDbContext>();

            // Seed HRST_Admin role and claims if not found
            var hrstAdminRole = await _roleManager.FindByNameAsync("HRST_Admin");
            if (hrstAdminRole == null)
            {
                // Create Role
                var _hrstAdminRole = new IdentityRole("HRST_Admin");
                await _roleManager.CreateAsync(_hrstAdminRole);
                
                //create and add claims
                 await _roleManager.AddClaimAsync(_hrstAdminRole, HRST_Claims.allClaims);

                
                 
            }


            //Create !DefaultGroup! for blank database
            var defaultGroup = _dbcontext.Groups.Where(x=>x.Name == "!DefaultGroup!").FirstOrDefault();
            if (defaultGroup == null)
            {
                Group _defaultGroup = new Group();
                _defaultGroup.Name = "!DefaultGroup!";
                _defaultGroup.Domain = "@!DefaultGroup!.com";
                _dbcontext.Groups.Add(_defaultGroup);
                _dbcontext.SaveChanges();
            }

            // Seed HRST_Basic and claims if not found
            var hrstBasicRole = await _roleManager.FindByNameAsync("HRST_Basic");
            if(hrstBasicRole == null)
            {
                // create role
                var _hrstBasicRole = new IdentityRole("HRST_Basic");
                await _roleManager.CreateAsync(_hrstBasicRole);

                //create and add claims
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.viewAllLists);
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.viewOneList);
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.getOneList);
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.getAllLists);

                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.viewListAccess);

                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.viewAllListItems);
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.viewOneListItem);
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.getAllListItems);
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.getOneListItem);

                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.getAllUsers);
                await _roleManager.AddClaimAsync(_hrstBasicRole, HRST_Claims.getOneUser);

            }

            // Seed HRSG_Owner role and claims if not found
            var hrsgOwnerRole = await _roleManager.FindByNameAsync("HRSG_Owner");
            if ( hrsgOwnerRole == null)
            {
                // Create Role
                var _hrsgOwnerRole = new IdentityRole("HRSG_Owner");
                await _roleManager.CreateAsync(_hrsgOwnerRole);

                // Create and Add claims
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.viewListAccess);
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.editListAccess);

                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.getAllLists);
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.viewAllLists);

                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.getOneList);
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.viewOneList);

                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.addList);
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.editList);
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.deleteList);

                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.addListItem);
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.editListItem);
                await _roleManager.AddClaimAsync(_hrsgOwnerRole, HRST_Claims.deleteListItem);
            }

            // Seed HRSG_Editer role and claims if not found
            var hrsgEditer = await _roleManager.FindByNameAsync("HRSG_Editer");
            if (hrsgOwnerRole == null)
            {
                // Create Role
                var _hrsgEditer = new IdentityRole("HRSG_Editer");
                await _roleManager.CreateAsync(_hrsgEditer);

                // Create and Add claims
                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.getAllLists);
                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.viewAllLists);

                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.getOneList);
                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.viewOneList);

                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.editList);

                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.addListItem);
                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.editListItem);
                await _roleManager.AddClaimAsync(_hrsgEditer, HRST_Claims.deleteListItem);
            }



            var basicRole = await _roleManager.FindByNameAsync("Basic");
            if (basicRole == null)
            {
                // Create Role
                var _basicRole = new IdentityRole("Basic");
                await _roleManager.CreateAsync(_basicRole);

                // Create and add claims
                await _roleManager.AddClaimAsync(_basicRole, HRST_Claims.getAllLists);
                await _roleManager.AddClaimAsync(_basicRole, HRST_Claims.viewAllLists);

                await _roleManager.AddClaimAsync(_basicRole, HRST_Claims.getOneList);
                await _roleManager.AddClaimAsync(_basicRole, HRST_Claims.viewOneList);
            }


            return;
        }

        public static class HRST_Claims
        {
            // SuperUser Claim

            public static readonly Claim allClaims = new Claim(CustomClaimTypes.Permission, "claims.all");
            
            // user claims
            public static readonly Claim editUser = new Claim(CustomClaimTypes.Permission, "users.edit");
            public static readonly Claim getOneUser = new Claim(CustomClaimTypes.Permission, "users.get.one");
            public static readonly Claim getAllUsers = new Claim(CustomClaimTypes.Permission, "users.get.all");
            public static readonly Claim deleteUser = new Claim(CustomClaimTypes.Permission, "users.delete");

            // list claims
            public static readonly Claim addList = new Claim(CustomClaimTypes.Permission, "lists.add");
            public static readonly Claim editList = new Claim(CustomClaimTypes.Permission, "lists.edit");
            public static readonly Claim deleteList = new Claim(CustomClaimTypes.Permission, "lists.delete");
            public static readonly Claim getOneList = new Claim(CustomClaimTypes.Permission, "lists.get.one");
            public static readonly Claim getAllLists = new Claim(CustomClaimTypes.Permission, "lists.get.all");
            public static readonly Claim viewOneList = new Claim(CustomClaimTypes.Permission, "lists.view.one");
            public static readonly Claim viewAllLists = new Claim(CustomClaimTypes.Permission, "lists.view.all");
            public static readonly Claim viewListAccess = new Claim(CustomClaimTypes.Permission, "lists.access.view");
            public static readonly Claim editListAccess = new Claim(CustomClaimTypes.Permission, "lists.access.edit");

            // list item claims
            public static readonly Claim addListItem = new Claim(CustomClaimTypes.Permission, "lists.items.add");
            public static readonly Claim editListItem = new Claim(CustomClaimTypes.Permission, "lists.items.edit");
            public static readonly Claim deleteListItem = new Claim(CustomClaimTypes.Permission, "lists.items.delete");
            public static readonly Claim getOneListItem = new Claim(CustomClaimTypes.Permission, "lists.items.get.one");
            public static readonly Claim getAllListItems = new Claim(CustomClaimTypes.Permission, "lists.items.get.all");
            public static readonly Claim viewOneListItem = new Claim(CustomClaimTypes.Permission, "lists.items.view.one");
            public static readonly Claim viewAllListItems = new Claim(CustomClaimTypes.Permission, "lists.items.view.all");

        }
    }
}
