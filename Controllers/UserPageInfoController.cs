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
            user = await _DbContext.Users.ToListAsync();
            return Ok(user);

        }

        [HttpGet]
        [Route("edituser")]

        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Get(string id)
        {
            ApplicationUser user;
            user = await _DbContext.Users.FindAsync(id);
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
    }
}
