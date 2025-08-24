const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const asyncWrap = require("../utilis/asyncWrap.js");
const { isLoggedIn,validatelisting ,isOwner} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

const controllerListing = require("../controllers/listings.js")

// Validation middleware


// GET all listings
router.route("/")
      .get(asyncWrap(controllerListing.index))
      .post(isLoggedIn, 
            upload.single("listing[image]"), 
            validatelisting,
            asyncWrap(controllerListing.createListing))// Create new listing
      


// New listing form
router.get("/new",isLoggedIn, controllerListing.renderNewForm);


router.route("/:id")
      .get(asyncWrap(controllerListing.showListing)) // Show listing
      .put(isLoggedIn,isOwner,upload.single("listing[image]"),  validatelisting, asyncWrap(controllerListing.updateListing)) // Update listing
      .delete(isLoggedIn,isOwner, asyncWrap(controllerListing.destroyListing)) // Delete listing

// Edit listing form
router.get("/:id/edit", isLoggedIn,isOwner,asyncWrap(controllerListing.renderEditForm));

// Route to show listings by category
router.get('/category/:categoryName', asyncWrap( async (req, res) => {
  const { categoryName } = req.params;
  const allListings = await Listing.find({ category: categoryName });
  
  if (allListings.length === 0) {
    // Handle case where no listings are found for the category
    req.flash('error', `No listings found for the category: ${categoryName}`);
    return res.redirect('/listings');
  }

  res.render('listings/index.ejs', { allListings ,activeCategory: categoryName});
}));

module.exports = router;
