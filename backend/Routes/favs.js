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

//devolver los favoritos
router.get('/show', isAuth, (req,res)=>{
    res.send({error:false, data:req.user.favs, msg:'Show favs'})
})
//añadir un favorito

router.put("/add", isAuth, (req, res) => {
      if(req.user.favs.indexOf(req.body.coin)>-1){res.send({error:true,data:err,msg:'Fav already added!'})}
      else{
        req.user.hasOwnProperty('favs') ? req.user.favs.push(req.body.coin) : req.user.favs = [req.body.coin]
        console.log(req.user.favs)
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{favs:req.user.favs}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:req.user,msg:'Fav correctly added.'})}
        })
      }
  });

//eliminar un favorito

router.put("/delete", isAuth, (req, res) => {
      if(req.user.favs.indexOf(req.body.coin)==-1){res.send({error:true,data:err,msg:'Cannot delete a fav that is not registered!'})}
      else{
        let pos = req.user.favs.indexOf(req.body.coin)
        req.user.favs.splice(pos,1)
        console.log(req.user.favs)
        req.app.locals.db
        .collection('users')
        .updateOne({email:req.body.email},{$set:{favs:req.user.favs}},
          (err2,data2)=>{
          if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
          else{res.send({error:false,data:req.user,msg:'Fav correctly deleted.'})}
        })
      }
  });

module.exports=router;