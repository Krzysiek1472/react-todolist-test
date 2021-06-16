using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class TodoService
    {
        private List<Task> _tasks = new List<Task>() {
            new Task() {
                Id = 1,
                Name = "Test first"
            }
        };

        public List<Task> GetAllTasks()
        {
            return _tasks;
        }

        public void AddTask(Task task)
        {
            if (_tasks.Any())
            {
                task.Id = _tasks.Select(x => x.Id).Max() + 1;
            }
            else
            {
                task.Id = 1;
            }
            _tasks.Add(task);
        }

        internal void RemoveTask(int id)
        {
            var task = _tasks.FirstOrDefault(x => x.Id == id);
            _tasks.Remove(task);
        }

        internal Task GetTask(int id)
        {
            return _tasks.FirstOrDefault(x => x.Id == id);
        }

        internal void EditTask(Task task)
        {
            var dbTask = _tasks.FirstOrDefault(x => x.Id == task.Id);
            dbTask.Name = task.Name;
        }
    }
}
