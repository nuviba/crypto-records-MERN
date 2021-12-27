const express = require('express');
const router = express.Router();

router.post('/' , (req,res)=>{
    req.app.locals.db 
    .collection('users')
    .find({email:req.body.email})
    .toArray((err,data)=>{
        if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
        else if(data.length==0){res.send({error:true,data:err,msg:'User not registered!'})}
        else{
            res.send({error:false,data:data[0].favs,msg:'Show favs'})
        }
    })
})
router.post("/add", (req, res) => {
    req.app.locals.db
    .collection('users')
    .find({email:req.body.email})
    .toArray((err,data)=>{
      if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
      else if(data.length==0){res.send({error:true,data:err,msg:'User not registered!'})}
      else if(data[0].favs.indexOf(req.body.coin)>-1){res.send({error:true,data:err,msg:'Fav already added!'})}
      else{
        data[0].hasOwnProperty('favs') ? data[0].favs.push(req.body.coin) : data[0].favs = [req.body.coin]
        console.log(data[0].favs)
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{favs:data[0].favs}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:data[0],msg:'Fav correctly added.'})}
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
      else if(data[0].favs.indexOf(req.body.coin)==-1){res.send({error:true,data:err,msg:'Cannot delete a fav that is not registered!'})}
      else{
        let pos = data[0].favs.indexOf(req.body.coin)
        data[0].favs.splice(pos,1)
        console.log(data[0].favs)
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{favs:data[0].favs}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:data[0],msg:'Fav correctly deleted.'})}
        })
      }
  
    })
  });

module.exports=router;