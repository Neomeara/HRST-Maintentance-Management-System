using Microsoft.AspNetCore.Mvc;
using HRST_Maintenance_Management_System.Models;
using HRST_Maintenance_Management_System.Data;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HRST_Maintenance_Management_System.Controllers
{
    [Route("api/lists")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private ApplicationDbContext _applicationDbContext;

        public ListsController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        // GET: api/<ListsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [Route("getAllLists")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceList>>> getAllLists()
        {
            IEnumerable<MaintenanceList> lists;
            lists = await _applicationDbContext.MaintenanceLists.ToListAsync();
            Console.Write(lists);
            return Ok(lists);

        }

        [Route("getList")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceList>>> getList(int id)
        {
            MaintenanceList list;
            list = await _applicationDbContext.MaintenanceLists.FindAsync(id);
            if (list == null)
            {
                return BadRequest();    
            }

            IEnumerable<ListItem> listItems = await _applicationDbContext.ListItems.ToListAsync();
            listItems = listItems.Where(x=> x.MaintenanceList == list);

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

            Console.Write(item);
            return Ok(item);

        }

        [Route("newlist")]
        [HttpPost]
        public async Task<ActionResult> AddList()
        {
            var newList = new MaintenanceList()
            {
                //ListId = 23,
                Group = "hrst",
                CreationDate = DateTime.Now,
                LastEditDate = DateTime.Now,
                

            };
            //var newOwner = new ApplicationUser();
            IEnumerable<ApplicationUser> users;
            users = await _applicationDbContext.Users.ToArrayAsync();

            //var newOwner = new ApplicationUser() { Email = "abc123@gmail.com" };
            newList.ApplicationUser = users.First();
            
            

            var listResult = await _applicationDbContext.MaintenanceLists.AddAsync(newList);

            if (listResult.State == EntityState.Added)
            {
                var dbResult = await _applicationDbContext.SaveChangesAsync();
                return Ok(dbResult);
            }
            return BadRequest(listResult);



        }
        // GET api/<ListsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ListsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ListsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ListsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
