const User = require("../models/user.js");
const nodemailer = require("nodemailer");


// setup nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "airbnb.yourplace@gmail.com",
    pass: "fkrpumpjzmkoqvip"        // use App Password, not real password
  }
});

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registerUser = await User.register(newUser, password);

    // automatically login after signup
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wonderlust");
      return res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to Wonderlust");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "!! You are logged out !!");
    res.redirect("/listings");
  });
};



// STEP 1 - signup request
module.exports.signupRequest = async (req, res) => {
  const { username, email, password } = req.body;

  // generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // temporarily save details in session
  req.session.tempUser = { username, email, password, otp };

  // send OTP mail
  await transporter.sendMail({
    from: "yourEmail@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`
  });

  res.redirect("/verify-otp");
};

// STEP 2 - render OTP page
module.exports.renderOtpPage = (req, res) => {
  res.render("users/verifyOtp");  // make verifyOtp.ejs
};

// STEP 3 - verify OTP
module.exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;

  if (!req.session.tempUser) {
    return res.redirect("/signup");
  }

  if (otp === req.session.tempUser.otp) {
    const { username, email, password } = req.session.tempUser;

    const newUser = new User({ username, email, isVerified: true });
    await User.register(newUser, password);

    delete req.session.tempUser;
    req.flash("success", "Signup successful, email verified!");
    res.redirect("/login");
  } else {
    req.flash("error", "Invalid OTP, try again.");
    res.redirect("/verify-otp");
  }
};