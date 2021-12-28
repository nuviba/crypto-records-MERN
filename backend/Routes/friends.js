const express = require('express');
const router = express.Router();

//middleware para chequear si el usuario tiene iniciada sesion
function isAuth(req,res,next){
  //console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
    //console.log("not authentified");
    res.send({error:true,message:"User not authentified!"});
  }
}

//añadir un amigo
router.put("/add", isAuth, (req, res) => {
      if(req.user.friends.indexOf(req.body.friend)>-1){res.send({error:true,data:err,msg:'Friend already added!'})}
      else{
        req.user.hasOwnProperty('friends') ? req.user.friends.push(req.body.friend) : req.user.friends = [req.body.friend]
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{friends:req.user.friends}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:req.user,msg:'Friend correctly added.'})}
        })
      }
  });


//eliminar un amigo
router.put("/delete", isAuth, (req, res) => {
    
      if(req.user.friends.indexOf(req.body.friend)==-1){res.send({error:true,data:err,msg:'Cannot delete a friend that is not registered!'})}
      else{
        let pos = req.user.friends.indexOf(req.body.friend)
        req.user.friends.splice(pos,1)
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{friends:req.user.friends}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:req.user,msg:'Friend correctly deleted.'})}
        })
      }
  });


module.exports=router;