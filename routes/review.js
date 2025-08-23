const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utilis/asyncWrap.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const controllerReviews = require("../controllers/reviews.js");

// Create a new review
router.post(
  "/", 
  isLoggedIn, 
  validateReview, 
  asyncWrap(controllerReviews.createReview)
);

// Delete a review
router.delete(
  "/:reviewId", 
  isLoggedIn, 
  isReviewAuthor, 
  asyncWrap(controllerReviews.destroyReview)
);

module.exports = router;




// const express = require("express");
// const router = express.Router({mergeParams:true});
// const Listing = require("../models/listing.js");
// const asyncWrap = require("../utilis/asyncWrap.js");
// const ExpressErorr = require("../utilis/ExpressErorr.js");
// const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")
// const Review = require("../models/review.js");




// router.post("/",isLoggedIn,validateReview,asyncWrap( async(req,res)=>{
//   let listing=await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);
//   newReview.author=req.user._id;
//   listing.reviews.push(newReview);
//   await newReview.save();
//   await listing.save();
//   req.flash("success","New review added successfully :)")
//   res.redirect(`/listings/${listing._id}`);   
// }))

// //review delete from listings and reviews
// router.delete("/:reviewId",isLoggedIn,isReviewAuthor,asyncWrap(async(req,res)=>{
//   let{id,reviewId} = req.params;
//   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
//   await Review.findByIdAndDelete(reviewId);
//   req.flash("success","Review deleted")
//   res.redirect(`/listings/${id}`);
// }))

// module.exports=router;

