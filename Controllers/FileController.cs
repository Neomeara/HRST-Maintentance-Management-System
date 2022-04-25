using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.IO;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace HRST_Maintenance_Management_System.Controllers
{
    [Authorize]
    [Route("api/files")]
    [ApiController]
    public class FileController : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        public FileController(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        [Authorize(Roles = "HRST_Admin, HRSG_Owner, HRSG_Editer")]
        [HttpPost]
        [Route("upload/{listId}")]
        public async Task<IActionResult> Upload(IFormFile file, string listId)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lists");
            uploads = Path.Combine(uploads, listId);
            if (!Directory.Exists(uploads))
            {
                Directory.CreateDirectory(uploads);
            }
            if (file.Length > 0)
            {
                var filePath = Path.Combine(uploads, file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            return Ok();
        }

        [Authorize(Roles = "HRST_Admin, HRST_Basic, HRSG_Owner, HRSG_Editer, HRSG_Viewer")]
        [HttpGet]
        [Route("download/{listId}")]
        public async Task<IActionResult> Download([FromQuery] string file, string listId)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lists");
            uploads = Path.Combine(uploads, listId);
            var filePath = Path.Combine(uploads, file);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(filePath), file);
        }

        [Authorize(Roles = "HRST_Admin, HRSG_Owner, HRSG_Editer")]
        [HttpDelete]
        [Route("delete/{listId}")]
        public async Task<IActionResult> Delete([FromQuery] string file, string listId)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lists");
            uploads = Path.Combine(uploads, listId);
            var filePath = Path.Combine(uploads, file);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            
            System.IO.File.Delete(filePath);

            return Ok();

            
        }

        [Authorize(Roles = "HRST_Admin, HRST_Basic, HRSG_Owner, HRSG_Editer, HRSG_Viewer")]
        [HttpGet]
        [Route("files/{listId}")]
        public IActionResult Files(string listId)
        {
            var result = new List<string>();

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "lists");
            uploads = Path.Combine(uploads, listId);
            if (Directory.Exists(uploads))
            {
                var provider = _hostingEnvironment.ContentRootFileProvider;
                foreach (string fileName in Directory.GetFiles(uploads))
                {
                    var fileInfo = provider.GetFileInfo(fileName);
                    result.Add(fileInfo.Name);
                }
            }
            return Ok(result);
        }


        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}
