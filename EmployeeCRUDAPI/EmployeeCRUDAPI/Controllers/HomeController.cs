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
        
        public IEnumerable<EmployeeTbl> GetAllEmployees()
        {
            //var employees = db.EmployeeTbls.Include(a => a.DepartmentTbl).AsNoTracking().ToListAsync();
            IList<EmployeeTbl> employees = db.EmployeeTbls.ToList();
            return employees;
        }

        public IHttpActionResult GetEmployeeById(int id)
        {
            EmployeeTbl employee = db.EmployeeTbls.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        public IHttpActionResult Post(EmployeeTbl employee)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            db.EmployeeTbls.Add(employee);
            db.SaveChanges();
            return Ok();
        }

        public IHttpActionResult Put(EmployeeTbl employee)
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

            EmployeeTbl employee = db.EmployeeTbls.Find(id);
            db.EmployeeTbls.Remove(employee);
            db.SaveChanges();
            return Ok();
        }

    }
}

