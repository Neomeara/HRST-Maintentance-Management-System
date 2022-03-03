using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HRST_Maintenance_Management_System.Models;
using HRST_Maintenance_Management_System.Data;
using Microsoft.EntityFrameworkCore;

namespace HRST_Maintenance_Management_System.Controllers
{
    //[Authorize]
    [Route("api/users")]
    [ApiController]
    public class UserPageInfoController : ControllerBase
    {

    

        private readonly ILogger<UserPageInfoController> _logger;
        private readonly ApplicationDbContext _DbContext;
        public UserPageInfoController(ILogger<UserPageInfoController> logger, ApplicationDbContext DbContext)
        {
            _logger = logger;
            _DbContext = DbContext;
        }
        

        [HttpGet]
        [Route("userinfo")]

        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Get()
        {
            IEnumerable<ApplicationUser> user;
            
            user = await _DbContext.Users.Include(x=> x.Group).ToListAsync();
            return Ok(user);

        }

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

        [HttpPut]
        [Route("updateuser")]
        public async Task<ActionResult>UpdateUser(UpdateUser model)
        {
            ApplicationUser user;
            user =  await _DbContext.Users.SingleOrDefaultAsync(x=> x.Email == model.Email);
            if (user == null)
            {
                return BadRequest();

            }
            
            user.UserName = model.UserName;
            user.firstname = model.FirstName;
            user.lastname = model.LastName;
            _DbContext.SaveChanges();
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
            return Ok(user);
        }

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
            _DbContext.SaveChanges();



            return Ok(user);
        }

        [HttpGet]
        [Route("editfirstnamelastname")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Getusername(string username)
        {
            ApplicationUser user;
            user =  _DbContext.Users.Where(x => x.Email == username).FirstOrDefault();
            if (user == null)
            {
                return BadRequest();

            }

            return Ok(user);



        }


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
    }
}
