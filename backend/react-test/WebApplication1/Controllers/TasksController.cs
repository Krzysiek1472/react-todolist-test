using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TasksController: ControllerBase
    {
        private readonly TodoService _todoService;
        public TasksController(TodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            return Ok(_todoService.GetAllTasks());
        }

        [HttpPost]
        public IActionResult AddTask([FromBody] Task task)
        {
            _todoService.AddTask(task);
            return Ok();
        } 
        
        [HttpDelete]
        public IActionResult RemoveTask([FromQuery] int id)
        {
            _todoService.RemoveTask(id);
            return Ok();
        }
    }
}
