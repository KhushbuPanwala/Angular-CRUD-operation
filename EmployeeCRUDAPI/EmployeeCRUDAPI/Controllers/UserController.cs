using EmployeeCRUDAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        //public IHttpActionResult GetUserById(int id)
        //{
        //    UserTbl user = db.UserTbls.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(user);
        //}

        //[Route("Api/UserController/GetString/{username}")]
        
        public IHttpActionResult GetUserById(string id)
        {
            //UserTbl user = db.UserTbls.Find(id);
            IList<UserTbl> users = db.UserTbls.ToList();
            UserTbl  user = users.SingleOrDefault(u => u.UserName == id);

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

            db.UserTbls.Add(user);
            db.SaveChanges();
            return Ok();
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
