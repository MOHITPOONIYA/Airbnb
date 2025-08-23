if(process.env.NODE_ENV!= "production"){
  require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const ExpressErorr = require("./utilis/ExpressErorr.js");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User =  require("./models/user.js");

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))
app.engine("ejs",ejsMate);

const dbUrl = process.env.ATLAS_URL;

async function main(){
  await mongoose.connect(dbUrl);
}
main().then((res)=>{console.log("connection of mongoose successfull")})
.catch((err)=>{
  console.log(err);
})

const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
})

store.on("error",()=>{
  console.log("ERROR in MOngo SESSION STORE", err)
})

const sessionOption = {
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
}



app.use(session(sessionOption));
app.use(flash());
//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser=req.user;
  next();
})
//listings
app.use("/listings",listingRouter);
///Review route
app.use("/listings/:id/reviews",reviewRouter);
///User router
app.use("/",userRouter);

// app.use("*", (req, res, next) => {
//   next(err);
// })
 


app.listen(8080,()=>{
  console.log("server working properly");
})

app.use((err,req,res,next)=>{
  let{status=505,message="error"}=err;
  res.status(status).render("error.ejs",{message});
  // res.status(status).send(message);
})

//testing
// app.get("/test",async (req,res)=>{
//   let sample = new Listing({
//     title:"mohit ghar",
//     description:"By mohit",
//     price:100000,
//     location:"Ram nagar",
//     country:"India",
//   })

//   await sample.save().then((res)=>{
//     console.log("data save DB")
//   }).catch((err)=>{console.log(err)});
// })