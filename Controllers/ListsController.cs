using Microsoft.AspNetCore.Mvc;
using HRST_Maintenance_Management_System.Models;
using HRST_Maintenance_Management_System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HRST_Maintenance_Management_System.Controllers
{
    [Route("api/lists")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private ApplicationDbContext _applicationDbContext;
        private UserManager<ApplicationUser> _userManager;

        public ListsController(ApplicationDbContext applicationDbContext, UserManager<ApplicationUser> userManager)
        {
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
        }


        [Route("getAllLists")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceList>>> getAllLists()
        {
            IEnumerable<MaintenanceList> lists;
            lists = await _applicationDbContext.MaintenanceLists.Where(list => list != null).Include(user => user.ApplicationUser).Include(user => user.Group).ToListAsync();
         
            return Ok(lists);
        }

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
            listItems = listItems.Where(x => x.MaintenanceList == list);

            list.ListItems = listItems.ToList();

            Console.Write(list);

            return Ok(list);

        }

        [Route("getListItem/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceList>>> getListItem(int id)
        {
            ListItem item;
            item = await _applicationDbContext.ListItems.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }

            return Ok(item);

        }

        [Route("deleteItem")]
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

            }

            return Ok();
        }

        [Route("addItem")]
        [HttpPost]
        public async Task<ActionResult<ListItem>> AddListItem(ListItem item)
        {
            if(await _applicationDbContext.Schedules.FindAsync(item.MaintenanceSchedule.MaintenanceScheduleId) == null)
            {
                await _applicationDbContext.Schedules.AddAsync(item.MaintenanceSchedule);
            }

            if (await _applicationDbContext.Locations.FindAsync(item.Location.LocationId) == null)
            {
                await _applicationDbContext.Locations.AddAsync(item.Location);
            }

            
                foreach (var picture in item.Pictures)
                {
                    await _applicationDbContext.AddAsync<Picture>(picture);

                }
            
            _applicationDbContext.SaveChanges();

            MaintenanceList list = await _applicationDbContext.MaintenanceLists.FindAsync(item.MaintenanceListId);
            if(list != null)
            {
                item.MaintenanceList = list;
            }

            var result = await _applicationDbContext.ListItems.AddAsync(item);
            Console.Write("\n\n\n RESULT\n");
            Console.Write(result.ToString());
            if (result.State == EntityState.Added)
            {
                _applicationDbContext.SaveChanges();
                return CreatedAtAction(nameof(item), new { id =item.ListItemId }, item);
            }
            return BadRequest(result);

        }


        //[Authorize]
        [Route("newlist")]
        [HttpPost]
        public async Task<ActionResult<MaintenanceList>> AddList(MaintenanceList maintenanceList)
        {


            ApplicationUser currentUser = null;

            if (User.Identity.Name != null)
            {

                currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            }

            if (currentUser == null)
            {
                //return NotFound();
                maintenanceList.ApplicationUser = await _userManager.Users.FirstAsync();
                maintenanceList.ApplicationUserId = maintenanceList.ApplicationUser.Id;
            }
            else
            {
                maintenanceList.ApplicationUser = currentUser;
                maintenanceList.ApplicationUserId = currentUser.Id;

            }



            var listResult = await _applicationDbContext.MaintenanceLists.AddAsync(maintenanceList);

            if (listResult.State == EntityState.Added)
            {
                _applicationDbContext.SaveChanges();
                return CreatedAtAction(nameof(maintenanceList),new { id = maintenanceList.MaintenanceListId }, maintenanceList);
            }
            return BadRequest(listResult);



        }

        [Route("deleteList")]
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
                
            }
          
            return Ok();

        }

    }
}
