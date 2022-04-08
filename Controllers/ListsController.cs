using Microsoft.AspNetCore.Mvc;
using HRST_Maintenance_Management_System.Models;
using HRST_Maintenance_Management_System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

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
            lists = await _applicationDbContext.MaintenanceLists.ToListAsync();
         
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
            listItems = listItems.Where(x => x.MaintenanceListId == list.MaintenanceListId);

            list.ListItems = listItems.ToList();

            Console.Write(list);

            return Ok(list);

        }

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


        //[Authorize]
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
                
            }
          
            return Ok();

        }


        // get all Groups
        [Route("getAllGroups")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> getAllGroups()
        {
            IEnumerable<Group> groups;
            groups = await _applicationDbContext.Groups.ToListAsync();
            if (groups == null)
            {
                return BadRequest();
            }

            return Ok(groups);

        }

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

    }
}
