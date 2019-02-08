//using EmployeeCRUDAPI.Models;
using EmployeeCRUDAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
//using System.Web.Http.Cors;
using System.Web.Mvc;

namespace EmployeeCRUDAPI.Controllers
{
    public class HomeController : ApiController
    {
        private EmployeeMgntDBEntities db = new EmployeeMgntDBEntities();
        
        public IEnumerable<Employee> GetAllEmployees()
        {
            IList<Employee> employees = db.Employees.ToList();
            return employees;
        }

        public IHttpActionResult GetEmployeeById(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        public IHttpActionResult Post(Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            db.Employees.Add(employee);
            db.SaveChanges();
            return Ok();
        }

        public IHttpActionResult Put(Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            db.Entry(employee).State = EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }

        public IHttpActionResult Delete(int id)
        {

            if (id <= 0)
                return BadRequest("Not a valid student id");

            Employee employee = db.Employees.Find(id);
            db.Employees.Remove(employee);
            db.SaveChanges();
            return Ok();
        }

    }
}

