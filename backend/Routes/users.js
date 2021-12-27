const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const passport= require ('passport');

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
    console.log('entrando al sign-in')
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

    //ruta para eliminar un usuario
    router.delete("/delete", (req, res) => {
      req.app.locals.db
      .collection('users')
      .find({$or:[{email:req.body.email},{username:req.body.username}]})
      .toArray((err,data)=>{
        if(err){res.send({error:true,data:err,msg:'Connection to DB failed!'})}
        else if(data.length==0){res.send({error:true,data:err,msg:'User does not exists!'})}
        else{
          req.app.locals.db
          .collection('users')
          .deleteOne({email:req.body.email},(err2,data2)=>{
            if(err2){res.send({error:true,data:err2,msg:'Connection to DB failed!'})}
            else{res.send({error:false,data:data2,msg:'User correctly deleted.'})}
          })
        }
  
      })
    });

    module.exports=router;