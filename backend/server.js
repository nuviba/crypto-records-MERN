///_____IMPORTS________________________
const express =require('express');
const dotenv=require('dotenv');
const mongodb= require ('mongodb');
var ObjectID = require('mongodb').ObjectID
const cors = require('cors');
const passport= require ('passport');
const bcrypt = require ('bcryptjs');
const cookieParser=require ('cookie-parser');
const session =require('express-session');
const bodyParser =require('body-parser');
const localStrategy =require ('passport-local').Strategy;

///_____END-IMPORTS________________________

const app = express();
dotenv.config();

///_____CONNECTING_DATABASE_____________-
const MongoClient=mongodb.MongoClient; 

MongoClient.connect(process.env.MONGO_URI,(err,client)=>{
  if(err!=null){
    console.log(err);
    console.log('connection with Mongo has failed!');
  }
  else{
    app.locals.db = client.db('CryptoRecordsDB');
    console.log(`Mongo DB Connected ✅`);
  }
})

//____MIDDLEWARE_______________________
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    {usernameField:'email',
    passwordField:'password'},
    (email,password,done)=>{
      
      app.locals.db
      .collection("users")
      .findOne({email:email},(err,user)=>{
          if(err) throw err;
          if (!user) return done (null, false);
          bcrypt.compare(password, user.password, (err,result)=>{
              if(err) throw err;
              result===true ? done(null,user) : done(null,false);
          })
      })
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);

});

passport.deserializeUser(function(user, done) {
  const userID = new ObjectID(user);
  app.locals.db
  .collection("users")
  .findOne({_id:userID}, function(err, user) {
  done(err, user);
});
});

//____END-MIDDLEWARE_______________________

//____ROUTES____________________________
app.get('/', (req,res)=>{
    res.send("API is 🏃🏻‍♂️");
});

let users=require('./Routes/users');
let favs=require('./Routes/favs');
let friends=require('./Routes/friends');
let publications=require('./Routes/publications');

app.use('/users',users);
app.use('/favs',favs);
app.use('/friends',friends);
app.use('/publications',publications);

//____END-ROUTES____________________________


//____________SERVER
const path = require("path")

//extra lines for heroku
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT =process.env.PORT || 4000;

app.listen(4000,console.log(`💩Server started on PORT ${PORT}`));
