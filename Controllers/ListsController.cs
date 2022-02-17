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
            lists = await _applicationDbContext.MaintenanceLists.Where(list => list != null).Include(user => user.ApplicationUser).ToListAsync();
         
            return Ok(lists);
        }

        [Route("getList")]
        [HttpGet]
        public async Task<ActionResult<MaintenanceList>> getList(int id)
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

        [Route("getListItem")]
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
                await _applicationDbContext.SaveChangesAsync();
                return CreatedAtAction(nameof(maintenanceList),new { id = maintenanceList.MaintenanceListId }, maintenanceList);
            }
            return BadRequest(listResult);



        }

        [Route("deleteList")]
        [HttpDelete]
        public async Task<ActionResult> deleteList(int id)
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
                await _applicationDbContext.SaveChangesAsync();
                
            }
          
            return Ok(list);

        }

    }
}
