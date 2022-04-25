using Microsoft.AspNetCore.Mvc;
using HRST_Maintenance_Management_System.Models;
using HRST_Maintenance_Management_System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System.Net.Http.Headers;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HRST_Maintenance_Management_System.Controllers
{
    [Route("api/lists")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private ApplicationDbContext _applicationDbContext;
        private Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> _userManager;
        private HttpContextAccessor _httpContext;
        private IHostingEnvironment _hostingEnvironment;

        public ListsController(IHostingEnvironment environment,ApplicationDbContext applicationDbContext, Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager, HttpContextAccessor httpContext)
        {
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
            _httpContext = httpContext;
            _hostingEnvironment = environment;

        }

        [Authorize(Roles ="HRST_Admin, HRST_Basic, HRSG_Owner, HRSG_Editer, Basic")]
        [Route("getAllLists")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceList>>> getAllLists()
        {
            IEnumerable<MaintenanceList> lists = Enumerable.Empty<MaintenanceList>();

            var user = await _userManager.GetUserAsync(HttpContext.User);
            user = await _applicationDbContext.Users.Include(i => i.Group).FirstOrDefaultAsync(i => i.Id == user.Id);
            if (user != null)
            {
                var isHRST_Admin = await _userManager.IsInRoleAsync(user, "HRST_Admin");
                var isHRST_Basic = await _userManager.IsInRoleAsync(user, "HRST_Basic");

                

                if (isHRST_Admin || isHRST_Basic)
                {
                    lists = await _applicationDbContext.MaintenanceLists.ToListAsync();
                }
                else
                {
                    lists = await _applicationDbContext.MaintenanceLists.Where(l => l.GroupId == user.Group.GroupId).ToListAsync();

                }

            }

            return Ok(lists);

         
        }

        [Authorize(Roles = "HRST_Admin, HRST_Basic, HRSG_Owner, HRSG_Editer, Basic")]
        [Route("getList/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<MaintenanceList>> GetList(int id)
        {
            
            MaintenanceList list;
            list = await _applicationDbContext.MaintenanceLists.FindAsync(id);
            if (list == null)
            {
                return BadRequest();    
            }
            IEnumerable<ListItem> listItems = await _applicationDbContext.ListItems.ToListAsync();
            listItems = listItems.Where(x => x.MaintenanceListId == list.MaintenanceListId);

            list.ListItems = listItems.ToList();

            Console.Write(list);

            return Ok(list);

        }

        [Authorize(Roles = "HRST_Admin, HRST_Basic, HRSG_Owner, HRSG_Editer, Basic")]
        [Route("getListItem/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<ListItem>> getListItem(int id)
        {
            ListItem item;
            item = await _applicationDbContext.ListItems.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }

            return Ok(item);

        }

        [Authorize(Roles = "HRST_Admin, HRSG_Owner, HRSG_Editer")]
        [Route("deleteItem/{id}")]
        [HttpDelete]
        public async Task<ActionResult> deleteListItem(int id)
        {
            ListItem item;
            item = await _applicationDbContext.ListItems.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }
            var result = _applicationDbContext.ListItems.Remove(item);
            if (result.State == EntityState.Deleted)
            {
                _applicationDbContext.SaveChanges();
                return Ok();

            }
            return BadRequest();

        }


        [Authorize(Roles = "HRST_Admin, HRSG_Owner, HRSG_Editer")]
        [Route("addItem")]
        [HttpPost]
        public async Task<ActionResult<ListItem>> AddListItem(ListItem model)
        {
            MaintenanceList list = await _applicationDbContext.MaintenanceLists.FindAsync(model.MaintenanceListId);
            if(list == null)
            {
                return NotFound();
            }
            var result = await _applicationDbContext.ListItems.AddAsync(model);
            if (result.State == EntityState.Added)
            {
                list.LastEditDate = DateTime.Now;
                _applicationDbContext.SaveChanges();
                return CreatedAtAction(nameof(model), new { id =model.ListItemId }, model);
            }
            return BadRequest(result);

        }


        [Authorize(Roles = "HRST_Admin, HRSG_Owner, HRSG_Editer")]
        [Route("editItem")]
        [HttpPost]
        public async Task<ActionResult> EditItem(ListItem item, int id)
        {
            MaintenanceList list = await _applicationDbContext.MaintenanceLists.FindAsync(item.MaintenanceListId);
            ListItem currentItem = await _applicationDbContext.ListItems.FindAsync(id);
            if(currentItem != null)
            {
                list.LastEditDate= DateTime.Now;
                currentItem.Name = item.Name;
                currentItem.Location = item.Location;
                currentItem.Priority = item.Priority;
                currentItem.TotalCost = item.TotalCost;
                currentItem.CostPerYear = item.CostPerYear;
                currentItem.MaintenanceInterval = item.MaintenanceInterval;
                currentItem.MaintenanceIntervalType = item.MaintenanceIntervalType;
                currentItem.LastCompleted = item.LastCompleted;
                currentItem.NextScheduledEvent = item.NextScheduledEvent;
                currentItem.Comments = item.Comments;
                
          
                _applicationDbContext.SaveChanges();
                return Ok();
            }
            return BadRequest(new { id = item.ListItemId });
        }


        [Authorize(Roles = "HRST_Admin, HRSG_Owner")]
        [Route("newlist")]
        [HttpPost]
        public async Task<ActionResult<MaintenanceList>> AddList(MaintenanceList maintenanceList )
        {
            maintenanceList.CreationDate = DateTime.Now;
            var listResult = await _applicationDbContext.MaintenanceLists.AddAsync(maintenanceList);

            if (listResult.State == EntityState.Added)
            {
                _applicationDbContext.SaveChanges();
                return CreatedAtAction(nameof(maintenanceList),new { id = maintenanceList.MaintenanceListId }, maintenanceList);
            }
            return BadRequest(listResult);
        }

        [Authorize(Roles = "HRST_Admin, HRSG_Owner")]
        [Route("deleteList/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteList(int id)
        {


            MaintenanceList list;
            list = await _applicationDbContext.MaintenanceLists.FindAsync(id);
            if (list == null)
            {
                return BadRequest();
            }
            var result = _applicationDbContext.MaintenanceLists.Remove(list);
            if(result.State == EntityState.Deleted)
            {
                _applicationDbContext.SaveChanges();
                var folderName = Path.Combine(_hostingEnvironment.WebRootPath, "lists");
                folderName = Path.Combine(folderName, id.ToString());

                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                Directory.Delete(pathToSave, true);

            }
          
            return Ok();

        }


        // get all Groups
        [Authorize(Roles = "HRST_Admin, HRST_Basic, HRSG_Owner, HRSG_Editer, Basic")]
        [Route("getAllGroups")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> getAllGroups()
        {
            IEnumerable<Group> groups = Enumerable.Empty<Group>();

            var user = await _userManager.GetUserAsync(HttpContext.User);
            user = await _applicationDbContext.Users.Include(i => i.Group).FirstOrDefaultAsync(i => i.Id == user.Id);
            if (user != null)
            {
                var isHRST_Admin = await _userManager.IsInRoleAsync(user, "HRST_Admin");
                var isHRST_Basic = await _userManager.IsInRoleAsync(user, "HRST_Basic");

                if (isHRST_Admin || isHRST_Basic)
                {
                    groups = await _applicationDbContext.Groups.Where(x => x.Name != "!DefaultGroup!").ToListAsync();
                }
                else
                {
                    groups = await _applicationDbContext.Groups.Where(g => g == user.Group && g.Name != "!DefaultGroup!").ToListAsync();

                }

            }

            if (groups == null)
            {
                return BadRequest();
            }

            return Ok(groups);

        }

        [Authorize(Roles = "HRST_Admin, HRST_Basic, HRSG_Owner, HRSG_Editer, Basic")]
        [Route("getGroup/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<Group>> getGroup(int id)
        {
            Group item;
            item = await _applicationDbContext.Groups.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }

            return Ok(item);

        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("upload/{id}")]
        public async Task<IActionResult> Upload(int id)
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("StaticFiles", "Images");
                folderName = Path.Combine(folderName, id.ToString());
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                Directory.CreateDirectory(pathToSave);


                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpGet]
        [Route("getImage/{id}/{name}")]
        public IActionResult GetImage(int id,string name)
        {
            //var folderName = Path.Combine("StaticFiles", "Images");
            //folderName = Path.Combine(folderName, id.ToString());
            //folderName = Path.Combine(folderName, name);
            //var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            //FileStream file = new FileStream(pathToSave, FileMode.Open);
            

            //file.CopyTo(result);

            ////Byte[] b = System.IO.File.ReadAllBytes(pathToSave);   // You can use your own method over here.         
            //return File(result, "image/png");
            return Ok(new { id, name });
        }
    }
}
