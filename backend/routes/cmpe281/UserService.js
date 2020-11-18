const express = require("express");
const router = express.Router();
var passwordHash = require("password-hash");
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get("/test", (req, res) => res.json({ msg: "backend connection works" }));

// user register and login api
router.post("/register", (req, res) => {
  console.log("Inside register api");
  var email = req.body.email;
  var uid = req.body.uid;
  var password = req.body.password;
  var displayName= req.body.displayName;
  var usertype;
  if(email.substring(email.indexOf('@')+1)=="sjsu.edu"){
      usertype ="admin";
  }
  else{
      usertype="customer";
  }
  console.log("user details:  " +uid,displayName,email,password,usertype);

  db.query ('select * from user where email =? and uid=?', [email,uid], function(error, results){
    if (results.length>0){
      console.log(results[0]);
      console.log("User already exists");
      res.send({email,displayName,usertype});
       
    }
    else{
      console.log("insert the user record");
           db.query('INSERT INTO user (uid,displayName,email,password,usertype) VALUES (?,?,?,?,?)',[uid,displayName,email,password,usertype],
          function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            res.send({email,displayName,usertype});
          }
        );
    }
    });
    });



module.exports = router;