const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const passport= require ('passport');

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

//devolver lista de usuarios
router.get("/get", function(req,res){
  req.app.locals.db 
  .collection("users")
  .find()
  .toArray(function(err,datos){
      if(err){
          res.send({
              error:true,
              data:err,
              mensaje:"Connection failed with database."
          })
      }
      else{
          if(datos.length==0){
              res.send({
                  error:true,
                  data:err,
                  mensaje:"No user has been found!"
                  })
          }
          else{
              res.send({
                  error:false,
                  data:datos,
                  mensaje:"Succesful!"
              })
          }
      }
  })
})

//ruta para autentificar al usuario utilizando estrategia locald de passport
router.post("/sign-in", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send({message:"User does not exist!",user:null,isAuth:false});
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({message:"Successfully Authenticated",user:user,isAuth:true});
          console.log(req.user.firstName);
        });
      }
    })(req, res, next);
  });
  
  //ruta para registrar un usuario
  router.post("/sign-up", (req, res) => {
      req.app.locals.db
      .collection('users')
      .find({$or:[{email:req.body.email},{username:req.body.username}]})
      .toArray((err,data)=>{
        if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
        else if(data.length>0){res.send({error:true,data:err,msg:'User already exists!'})}
        else{
          req.body.password = bcrypt.hashSync(req.body.password,10)
          req.body.favs=[]
          req.body.friends=[]
          req.app.locals.db
          .collection('users')
          .insertOne(req.body,(err2,data2)=>{
            if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
            else{res.send({error:false,data:data2,msg:'User correctly registered.'})}
          })
        }
  
      })
    });

    //Ruta para hacer logout
    router.post("/logout", isAuth, (req,res)=>{
      req.logout();
      res.send({message:"session closed.",error:false})
    })

    //ruta para eliminar un usuario
    router.delete("/delete", isAuth, (req, res) => {
                req.app.locals.db
                .collection('users')
                .deleteOne({email:req.user.email},(err2,data2)=>{
                  if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
                  else{res.send({error:false,data:data2,msg:'User correctly deleted.'})}
                })
              });

    module.exports=router;