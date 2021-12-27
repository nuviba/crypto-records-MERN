const express = require('express');
const router = express.Router();
router.get('/show', (req,res)=>{
    req.app.locals.db 
    .collection('publications')
    .find()
    .toArray((err,data)=>{
        if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
        else if(data.length==0){res.send({error:true,data:err,msg:'There are no publications'})}
        else{
            res.send({error:false,data:data,msg:'Publications obtained'})
        }
        
    })
})
router.post('/post', (req,res)=>{
    req.app.locals.db 
    .collection('users')
    .find({username:req.body.username})
    .toArray((err,data)=>{
        if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
        else if(data.length==0){res.send({error:true,data:err,msg:'User not registered!'})}
        else{
            req.body.likes=[]
            req.app.locals.db
            .collection('publications')
            .insertOne(req.body,(err2,datos2)=>{
                if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
                else{ res.send({error:false,data:datos2,msg:'Publication saved'})}

            })
        }
    })
        
    
});

router.delete('/delete', (req,res)=>{
    req.app.locals.db 
    .collection('users')
    .find({username:req.body.username})
    .toArray((err,data)=>{
        if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
        else if(data.length==0){res.send({error:true,data:err,msg:'User not registered!'})}
        else{
            req.app.locals.db
            .collection('publications')
            .deleteOne({dated:req.body.dated},(err2,datos2)=>{
                if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
                else{ res.send({error:false,data:datos2,msg:'Publication deleted'})}
            })
        }
    }) 
});

router.put('/modify', (req,res)=>{
    req.app.locals.db 
    .collection('users')
    .find({username:req.body.username})
    .toArray((err,data)=>{
        if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
        else if(data.length==0){res.send({error:true,data:err,msg:'User not registered!'})}
        else{
            req.app.locals.db
            .collection('publications')
            .updateOne({dated:req.body.dated},{$set:{text:req.body.text}},(err2,datos2)=>{
                if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
                else{ res.send({error:false,data:datos2,msg:'Publication saved'})}

            })
        }
    })
        
    
});

router.post("/like", (req, res) => {
    req.app.locals.db
    .collection('publications')
    .find({dated:req.body.dated})
    .toArray((err,data)=>{
      if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
      else if(data.length==0){res.send({error:true,data:err,msg:'Publication not found!'})}
      else if(data[0].likes.indexOf(req.body.username)>-1){res.send({error:true,data:err,msg:'Publication already liked!'})}
      else{
        data[0].hasOwnProperty('likes') ? data[0].likes.push(req.body.username) : data[0].likes = [req.body.username]
        req.app.locals.db
        .collection('publications')
        .updateOne({dated:req.body.dated},{$set:{likes:data[0].likes}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:data[0],msg:'Like correctly added.'})}
        })
      }
  
    })
  });

router.delete("/dislike", (req, res) => {
    req.app.locals.db
    .collection('publications')
    .find({dated:req.body.dated})
    .toArray((err,data)=>{
      if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
      else if(data.length==0){res.send({error:true,data:err,msg:'Publication not found!'})}
      else if(data[0].likes.indexOf(req.body.username)==-1){res.send({error:true,data:err,msg:'Cannot dislike a not liked publication.'})}
      else{
        let pos = data[0].likes.indexOf(req.body.username)
        data[0].likes.splice(pos,1)
        req.app.locals.db
        .collection('publications')
        .updateOne({dated:req.body.dated},{$set:{likes:data[0].likes}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:data[0],msg:'Publication correctly disliked.'})}
        })
      }
  
    })
  });


module.exports=router;