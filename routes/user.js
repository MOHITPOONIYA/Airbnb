const express = require("express");
const router = express.Router();
const asyncWrap = require("../utilis/asyncWrap.js");
const User = require("../models/user.js");
const passport = require("passport");
const { isLoggedIn,saveRedirectUrl } = require("../middleware.js");

const controllerUser = require("../controllers/users.js");


//sign up
router.route("/signup")
      .get(controllerUser.renderSignupForm)
//       .post( controllerUser.signup)

router.post("/signup-request", controllerUser.signupRequest);

// show OTP page
router.get("/verify-otp", controllerUser.renderOtpPage);

// verify OTP → finally signup
router.post("/verify-otp", controllerUser.verifyOtp);


//login
router.route("/login")
      .get(controllerUser.renderLoginForm)
      .post(
        saveRedirectUrl,
        passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
        }),
        controllerUser.login
)

//logout
router.get("/logout",controllerUser.logout)
module.exports=router;