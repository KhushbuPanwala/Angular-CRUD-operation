using EmployeeCRUDAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace EmployeeCRUDAPI.Controllers
{
    public class UserController : ApiController
    {
        private EmployeeMgntDBEntities db = new EmployeeMgntDBEntities();

        public IEnumerable<UserTbl> GetAllUsers()
        {
            IList<UserTbl> users = db.UserTbls.ToList();
            return users;
        }
        public IHttpActionResult GetUserById(string id)
        {
            //UserTbl user = db.UserTbls.Find(id);
            IList<UserTbl> users = db.UserTbls.ToList();
            UserTbl user = users.SingleOrDefault(u => u.UserName.ToLower() == id.ToLower());

            //UserTbl user = db.UserTbls.Find();

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        public IHttpActionResult Post(UserTbl user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");
            //string ErrorMessage = "";
            IList<UserTbl> users = db.UserTbls.ToList();
            bool checkExist = users.Any(cus => cus.UserName == user.UserName);
            if (!checkExist)
            {
                db.UserTbls.Add(user);
                db.SaveChanges();
                return Ok();
                //try
                //{
                //    db.UserTbls.Add(user);
                //    db.SaveChanges();
                //    return Ok();
                //}
                //catch (Exception ex)
                //{
                //    var sqlException = ex.InnerException as System.Data.SqlClient.SqlException;

                //    if (sqlException.Number == 2601 || sqlException.Number == 2627)
                //    {
                //        ErrorMessage = "Cannot insert duplicate values.";
                //    }
                //    else
                //    {
                //        ErrorMessage = "Error while saving data.";
                //    }
                //    return BadRequest(ErrorMessage);
                //}
            }
            else
            {
                return BadRequest("Invalid data.");
            }
        }

        public IHttpActionResult Put(UserTbl user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();
            return Ok();
        }

        public IHttpActionResult Delete(int id)
        {

            if (id <= 0)
                return BadRequest("Not a valid student id");

            UserTbl user = db.UserTbls.Find(id);
            db.UserTbls.Remove(user);
            db.SaveChanges();
            return Ok();
        }
    }
}
