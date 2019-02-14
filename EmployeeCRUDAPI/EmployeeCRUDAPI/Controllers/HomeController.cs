using EmployeeCRUDAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;

using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;


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
            EmployeeTbl employee = new EmployeeTbl();
            if (id != 0)
            {
                employee = db.EmployeeTbls.Find(id);
            }
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

            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + employee.ImageName);
            employee.Image = Convert.ToBase64String(File.ReadAllBytes(filePath));

            string ext = Path.GetExtension(filePath);

            if (ext == ".jpg")
                employee.Image = "data:image/jpeg;base64," + employee.Image;
            else if (ext==".bmp")
                employee.Image = "data:image/bmp;base64," + employee.Image;            
            else if (ext == ".png")
                employee.Image = "data:image/png;base64," + employee.Image;
            
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

