using HRST_Maintenance_Management_System.Data;
using HRST_Maintenance_Management_System.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRST_Maintenance_Management_System.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("weather")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationDbContext _applicationDbContext;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ApplicationDbContext context )
        {
            _logger = logger;
            _applicationDbContext = context;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
        //[Route("getlists")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<MaintenanceList>>> getList()
        //{
        //    IEnumerable<MaintenanceList> lists;
        //    lists = await _applicationDbContext..ToArrayAsync();
        //    var a = lists.Select(list => new { list.Owner });
        //    Console.Write(lists);
        //    return Ok(a);

        //}

        //[Route("newlist")]
        //[HttpPost]
        //public async Task<ActionResult> AddList()
        //{
        //    var newList = new MaintenanceList()
        //    {
        //        //ListId = 23,
        //        Company = "hrst",
                
        //    };
        //    //var newOwner = new ApplicationUser();
        //    IEnumerable<ApplicationUser> users;
        //    users = await _applicationDbContext.Users.ToArrayAsync();

        //    var newOwner = new ApplicationUser() { Email = "abc123@gmail.com"};

        //    if(newOwner != null)
        //    {
        //        newList.Owner = newOwner;

        //    }

        //    var listResult = await _applicationDbContext.todoLists.AddAsync(newList);

        //    if(listResult.State == EntityState.Added)
        //    {
        //        var dbResult = await _applicationDbContext.SaveChangesAsync();
        //        return Ok(dbResult);
        //    }
        //    return BadRequest(listResult);



        //}
    }
}