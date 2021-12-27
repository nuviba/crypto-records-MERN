const express = require('express');
const router = express.Router();

router.post("/add", (req, res) => {
    req.app.locals.db
    .collection('users')
    .find({email:req.body.email})
    .toArray((err,data)=>{
      if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
      else if(data.length==0){res.send({error:true,data:err,msg:'User not found!'})}
      else if(data[0].friends.indexOf(req.body.friend)>-1){res.send({error:true,data:err,msg:'Friend already added!'})}
      else{
        data[0].hasOwnProperty('friends') ? data[0].friends.push(req.body.friend) : data[0].friends = [req.body.friend]
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{friends:data[0].friends}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:data[0],msg:'Friend correctly added.'})}
        })
      }
  
    })
  });

router.delete("/delete", (req, res) => {
    req.app.locals.db
    .collection('users')
    .find({email:req.body.email})
    .toArray((err,data)=>{
      if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
      else if(data.length==0){res.send({error:true,data:err,msg:'User not registered!'})}
      else if(data[0].friends.indexOf(req.body.friend)==-1){res.send({error:true,data:err,msg:'Cannot delete a friend that is not registered!'})}
      else{
        let pos = data[0].friends.indexOf(req.body.friend)
        data[0].friends.splice(pos,1)
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{friends:data[0].friends}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:data[0],msg:'Friend correctly deleted.'})}
        })
      }
  
    })
  });


module.exports=router;