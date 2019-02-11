using EmployeeCRUDAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;

namespace EmployeeCRUDAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        private EmployeeMgntDBEntities db = new EmployeeMgntDBEntities();

        public IEnumerable<DepartmentTbl> GetAllDepartments()
        {
            IList<DepartmentTbl> departments = db.DepartmentTbls.ToList();
            return departments;
        }

        public IHttpActionResult GetDepartmentById(int id)
        {
            DepartmentTbl department = db.DepartmentTbls.Find(id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }

        public IHttpActionResult Post(DepartmentTbl department)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            db.DepartmentTbls.Add(department);
            db.SaveChanges();
            return Ok();
        }

        public IHttpActionResult Put(DepartmentTbl department)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            db.Entry(department).State = EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }

        public IHttpActionResult Delete(int id)
        {

            if (id <= 0)
                return BadRequest("Not a valid student id");

            DepartmentTbl department = db.DepartmentTbls.Find(id);
            db.DepartmentTbls.Remove(department);
            db.SaveChanges();
            return Ok();
        }

    }
}
