const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapboxToken });
console.log("9");
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  console.log(req.user)
  res.render("listings/index.ejs", { allListings , activeCategory:null });
}

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}


module.exports.showListing=async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
  .populate({
    path:"reviews",
    populate:{
      path:"author",
    },
  }).populate("owner");


  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings"); // FIX: return here
  }

  res.render("listings/show.ejs", { listing });
}


module.exports.createListing=async (req, res) => {
  let coordinates =await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
  }).send()

  let url = req.file.path;
  let filename = req.file.filename;
  let data = new Listing(req.body.listing);
  data.owner=req.user._id;
  data.image = {url,filename};
  data.geometry= coordinates.body.features[0].geometry;
  console.log(data.geometry);
  await data.save();
  req.flash("success", "New listing created successfully :)");
  res.redirect("/listings");
}



module.exports.renderEditForm=async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings"); // FIX: return here
  }
  //to decrease size of img 
  let originalImageUrl=listing.image.url;
  console.log(originalImageUrl);
 if (originalImageUrl.includes("cloudinary")) {
    // Cloudinary URL → apply transformation
    originalImageUrl = originalImageUrl.replace(
      "/upload",
      "/upload/h_250,w_250"
    );
  } else if (originalImageUrl.includes("unsplash")) {
    // Unsplash URL → append resize query params
    originalImageUrl = originalImageUrl + "&w=250&h=250&fit=crop";
  }
  console.log(originalImageUrl);

  res.render("listings/edit.ejs", { listing,originalImageUrl });
  
}



// In controllers/listing.js

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    // 1. Update the basic listing data (title, description, location name, etc.)
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // 2. If a new location was provided, geocode it and update the geometry
    if (req.body.listing.location) {
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();
        listing.geometry = response.body.features[0].geometry;
    }
    
    // 3. If a new file was uploaded, update the image
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    // 4. Save all the updates (geometry and/or image)
    await listing.save();

    req.flash("success", "Listing updated successfully :)");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
}