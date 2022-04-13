using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HRST_Maintenance_Management_System.Models;
using HRST_Maintenance_Management_System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNet.Identity;

namespace HRST_Maintenance_Management_System.Controllers
{
    //[Authorize(Roles = ("Admin"))]
    [Route("api/users")]
    [ApiController]
    public class UserPageInfoController : ControllerBase
    {

    

        private readonly ILogger<UserPageInfoController> _logger;
        private readonly ApplicationDbContext _DbContext;
        private readonly Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> _userManager;
        private readonly Microsoft.AspNetCore.Identity.RoleManager<IdentityRole> _roleManager;
        public UserPageInfoController(ILogger<UserPageInfoController> logger, ApplicationDbContext DbContext, Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager, Microsoft.AspNetCore.Identity.RoleManager<IdentityRole> roleManager)
        {
            _logger = logger;
            _DbContext = DbContext;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [Authorize(Roles = "HRST_Admin, HRST_Basic, HRSG_Owner, Basic_Editer")]
        [HttpGet]
        [Route("userinfo")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Get()
        {
            IEnumerable<ApplicationUser> allUsers = Enumerable.Empty<ApplicationUser>();
            var user = await _userManager.GetUserAsync(HttpContext.User);
            user = await _DbContext.Users.Include(i => i.Group).FirstOrDefaultAsync(i => i.Id == user.Id);
            if (user != null)
            {
                var isHRST_Admin = await _userManager.IsInRoleAsync(user, "HRST_Admin");
                var isHRST_Basic = await _userManager.IsInRoleAsync(user, "HRST_Basic");



                if (isHRST_Admin || isHRST_Basic)
                {
                    allUsers = await _DbContext.Users.Include(x=> x.Group).ToListAsync();
                }
                else
                {
                    allUsers = await _DbContext.Users.Where(u => u.Group.GroupId == user.Group.GroupId).Include(x => x.Group).ToListAsync();

                }

            }

            
            return Ok(allUsers);

        }

        [Authorize(Roles = "HRST_Admin, HRST_Basic")]
        [HttpGet]
        [Route("edituser")]

        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Get(string id)
        {
            ApplicationUser user;
            user = await _DbContext.Users.Include(i=> i.Group ).FirstOrDefaultAsync(i=> i.Id == id);
            if (user == null)
            {
                return BadRequest();
                
            }
            return Ok(user);

        }

        [Authorize(Roles = "HRST_Admin")]
        [HttpPut]
        [Route("updateuser")] // firstnamelastname
        public async Task<ActionResult>UpdateUser(UpdateUser model)
        {
            ApplicationUser user;
            ApplicationUser user2;
            user =  await _DbContext.Users.SingleOrDefaultAsync(x=> x.Email == model.Email);
            if (user == null)
            {
                return BadRequest();

            }
            string domain = user.Email.Substring(user.Email.IndexOf('@'));
            string pt1 = user.Email.Substring(user.Email.IndexOf('@') + 1);
            string pt2 = pt1.Substring(pt1.IndexOf('.'));
            string name = pt1.Replace(pt2, "");
            Group group = _DbContext.Groups.Where(y => y.Domain == domain).FirstOrDefault();
            if (domain == null)
            {
                return BadRequest();
            }

            if (group == null)
            {
                Group newgroup = new Group();
                newgroup.Domain = domain;
                newgroup.Name = name;
                user.Group = newgroup;
                _DbContext.Groups.Add(newgroup);
                _DbContext.SaveChanges();
            }
            else
            {
                user.Group = group;

            }
            user2 = await _DbContext.Users.FirstOrDefaultAsync(x => x.UserName == model.UserName);
            if (user2 != null)
            {
                return BadRequest("hello");
            }
            
            user.UserName = model.UserName;
            user.firstname = model.FirstName;
            user.lastname = model.LastName;
            _DbContext.SaveChanges();

            return Ok(user);
        }

        [Authorize(Roles = "HRST_Admin")]
        [HttpPut]
        [Route("updateuser2")]

        public async Task<ActionResult<IEnumerable<ApplicationUser>>> updateUser(string id,UpdateUser model)
        {
            ApplicationUser user;
            user = await _DbContext.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest();

            }
            user.UserName = model.UserName;
            user.firstname = model.FirstName;
            user.lastname = model.LastName;
            user.Email = model.Email;
            user.Group = model.group;
            _DbContext.SaveChanges();

            return Ok(user);
        }

        [HttpGet]
        [Route("editfirstnamelastname")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Getusername(string username)
        {
            ApplicationUser user;
            user =  await _DbContext.Users.Where(x => x.Email == username).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest();

            }

            return Ok(user);



        }

        [Authorize(Roles = "HRST_Admin")]
        [Route("deleteUser")]
        [HttpDelete]
        public async Task<ActionResult> DeleteUser(string id)
        {


            ApplicationUser user;
            user = await _DbContext.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest();

            }
            var result = _DbContext.Users.Remove(user);
            if (result.State == EntityState.Deleted)
            {
                _DbContext.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }


        [HttpGet]
        [Route("getGroups")]
        public async Task<ActionResult<IEnumerable<Group>>> getGroups()
        {
            IEnumerable<Group> group;
            group = await _DbContext.Groups.Where(x=> x.Name != "!DefaultGroup!").ToListAsync();
            return Ok(group);

        }
        
        [Authorize]
        [HttpPost]
        [Route("userHasRoles")]
        public async Task<ActionResult<bool>> userHasRoles(string[] roles)
        {
            bool hasRoles = false;
            var user = await _userManager.GetUserAsync(HttpContext.User);

            foreach (var role in roles)
            {
               if(await _userManager.IsInRoleAsync(user, role))
                {
                    hasRoles = true;
                }
            }

            return hasRoles;
        }

    }
}
