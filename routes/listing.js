const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

//----can use router.route to make it more compact----//

//--INDEX ROUTE--
router.get("/", wrapAsync(listingController.index));

//-----------NEW ROUTE----------------------
router.get("/new", isLoggedin, listingController.renderNewForm);

//----------SHOW ROUTE----------------------
router.get("/:id", wrapAsync(listingController.showListing));

//-----------CREATE ROUTE--------------------
router.post("/", isLoggedin,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));


//----------EDIT ROUTE--------------------------
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.editListing));

//---------UPDATE ROUTE-------------------------
router.put("/:id", isLoggedin, isOwner,upload.single('listing[image]') ,validateListing, wrapAsync(listingController.updateListing));

//----------DELETE ROUTE-------------------------
router.delete("/:id", isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
