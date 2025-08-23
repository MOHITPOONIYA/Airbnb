const User = require("../models/user.js");

module.exports.renderSignupForm= (req,res)=>{
  res.render("users/signup.ejs")
}


module.exports.signup = async (req,res)=>{
try{
    let {username,email,password}=req.body;
  const newUSer= new User({username,email});
  const registerUser = await User.register(newUSer,password);
  console.log(registerUser);
  //automatically login
  req.login(registerUser,(err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","Welcome to Wonderlust")
    return res.redirect("/listings");
  }); 
  }
  catch(e)  {
    req.flash("error",e.message);
    res.redirect("/signup")
  }
}

module.exports.renderLoginForm = (req,res)=>{
  res.render("users/login.ejs")
}

module.exports.login = async (req,res)=>{
    req.flash("success","Welcome back to Wonderlust");
    let redirectUrl = res.locals.redirectUrl;
    if(redirectUrl){
      res.redirect(redirectUrl);
    }else{
      res.redirect("/listings");
    }
   
  }

module.exports.logout = (req,res,next)=>{
  req.logout((err)=>{
   if (err){ 
    return next(err);
   }
   req.flash("success","!! You are logged out !!");
   res.redirect("/listings");
  })
}