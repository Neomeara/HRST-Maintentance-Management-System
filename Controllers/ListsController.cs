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
            //item = await _applicationDbContext.ListItems.Where(i => i.ListItemId == id)
            //    .Include(i => i.MaintenanceListId).ThenInclude(ml => ml.ApplicationUserId)
            //    .Include(i => i.Location)
            //    .Include(i => i.MaintenanceSchedule)
            //    .SingleOrDefaultAsync();
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
                return Ok();

            }
            return BadRequest();

        }

        public class AddListItemModel
        {
            public ListItem ListItem { get; set; } = new ListItem();
            public Location? Location { get; set; }
            public MaintenanceSchedule? MaintenanceSchedule { get; set; }
        };

        [Route("addItem")]
        [HttpPost]
        public async Task<ActionResult<FullListItem>> AddListItem(FullListItem model)
        {
            if(await _applicationDbContext.Schedules.FindAsync(model.ListItem.MaintenanceScheduleId) == null)
            {
                if(model.MaintenanceSchedule != null)
                {
                    await _applicationDbContext.Schedules.AddAsync(model.MaintenanceSchedule);

                }
            }

            if (await _applicationDbContext.Locations.FindAsync(model.ListItem.LocationId) == null)
            {
                if (model.Location != null)
                {
                await _applicationDbContext.Locations.AddAsync(model.Location);

                }
            }

            
                //foreach (var picture in model.ListItem.Pictures)
                //{
                //    await _applicationDbContext.AddAsync<Picture>(picture);

                //}
            
            _applicationDbContext.SaveChanges();

            Location loc = await _applicationDbContext.Locations.Where(l => l.Name == model.Location.Name).FirstOrDefaultAsync();
            MaintenanceSchedule ms = await _applicationDbContext.Schedules.Where(s =>
            s.MaintenanceInterval == model.MaintenanceSchedule.MaintenanceInterval &&
            s.LastCompleted == model.MaintenanceSchedule.LastCompleted &&
            s.NextScheduledEventForcasted == model.MaintenanceSchedule.NextScheduledEventForcasted &&
            s.NextScheduledEventPlanned == model.MaintenanceSchedule.NextScheduledEventPlanned &&
            s.YearsToDelay == model.MaintenanceSchedule.YearsToDelay).FirstOrDefaultAsync();

            model.Location = loc;
            model.MaintenanceSchedule = ms;

            MaintenanceList list = await _applicationDbContext.MaintenanceLists.FindAsync(model.ListItem.MaintenanceListId);
            if(list == null)
            {
                return NotFound();
            }

            var result = await _applicationDbContext.ListItems.AddAsync(model.ListItem);
            if (result.State == EntityState.Added)
            {
                _applicationDbContext.SaveChanges();
                return CreatedAtAction(nameof(model), new { id =model.ListItem.ListItemId }, model.ListItem);
            }
            return BadRequest(result);

        }

        [Route("editItem")]
        [HttpPost]
        public async Task<ActionResult> EditItem(ListItem item, int id)
        {
            
            ListItem currentItem = await _applicationDbContext.ListItems.FindAsync(id);
            if(currentItem != null)
            {
                item.MaintenanceListId = id;
                currentItem.Name = item.Name;
                currentItem.LocationId = item.LocationId;
                currentItem.Cost = item.Cost;
                currentItem.CostYear = item.CostYear;
                currentItem.MaintenanceScheduleId = item.MaintenanceScheduleId;
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

        // get a location
        [Route("getLocation/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<Location>> getLocation(int id)
        {
            Location item;
            item = await _applicationDbContext.Locations.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }

            return Ok(item);

        }

        // get alllocations
        [Route("getAllLocations")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> getAllLocations()
        {
            IEnumerable<Location> locations;
            locations = await _applicationDbContext.Locations.ToListAsync();
            if (locations == null)
            {
                return BadRequest();
            }

            return Ok(locations);

        }

        // get a MaintenanceSchedule
        [Route("getMaintenanceSchedule/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<MaintenanceSchedule>> getMaintenanceSchedule(int id)
        {
            MaintenanceSchedule item;
            item = await _applicationDbContext.Schedules.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }

            return Ok(item);

        }

        // get all MaintenanceSchedules
        [Route("getAllSchedules")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceSchedule>>> getAllSchedules()
        {

            IEnumerable<MaintenanceSchedule> schedules = await _applicationDbContext.Schedules.ToListAsync();
            if (schedules == null)
            {
                return BadRequest();
            }

            return Ok(schedules);

        }

        // get a Full List Item
        [Route("getFullListItem/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<FullListItem>> getFullListItem(int id)
        {
            FullListItem item = new FullListItem();
            item.ListItem = await _applicationDbContext.ListItems.FindAsync(id);
            if (item.ListItem == null)
            {
                return BadRequest();
            }
            else
            {
                item.Location = await _applicationDbContext.Locations.FindAsync(item.ListItem.LocationId);
                item.MaintenanceSchedule = await _applicationDbContext.Schedules.FindAsync(item.ListItem.MaintenanceScheduleId);
            }

            return Ok(item);

        }

        // get a Full List Item
        [Route("getFullList/{id:int}")]
        [HttpGet]
        public async Task<ActionResult<FullMaintenanceList>> getFullList(int id)
        {
            FullMaintenanceList item = new FullMaintenanceList();
            item.MaintenanceList = await _applicationDbContext.MaintenanceLists.FindAsync(id);
            if (item.MaintenanceList == null)
            {
                return BadRequest();
            }
            else
            {
                item.ApplicationUser = await _applicationDbContext.Users.FindAsync(item.MaintenanceList.ApplicationUserId);
                item.Group = await _applicationDbContext.Groups.FindAsync(item.MaintenanceList.GroupId);
                IEnumerable<ListItem> listItems = await _applicationDbContext.ListItems.ToListAsync();
                listItems = listItems.Where(x => x.MaintenanceListId == item.MaintenanceList.MaintenanceListId);

                item.MaintenanceList.ListItems = listItems.ToList();
            }

            return Ok(item);

        }


        // get all Full Lists
        [Route("getAllFullLists")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FullMaintenanceList>>> getAllFullLists()
        {
            IEnumerable<FullMaintenanceList> fullMaintenanceLists = new List<FullMaintenanceList>();

            var allLists = _applicationDbContext.MaintenanceLists.ToList();
            foreach (MaintenanceList item in allLists)
            {
                FullMaintenanceList tmp = new FullMaintenanceList();
                tmp.MaintenanceList = item;
                tmp.ApplicationUser = await _applicationDbContext.Users.FindAsync(item.ApplicationUserId);
                tmp.Group = await _applicationDbContext.Groups.FindAsync(item.GroupId);
                IEnumerable<ListItem> listItems = await _applicationDbContext.ListItems.ToListAsync();
                listItems = listItems.Where(x => x.MaintenanceListId == item.MaintenanceListId);

                tmp.MaintenanceList.ListItems = listItems.ToList();

               fullMaintenanceLists = fullMaintenanceLists.Append(tmp);
                

            }


            return Ok(fullMaintenanceLists);

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

    }
}
