const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js"); //error handling
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedin,isReviewAuthor}=require("../middleware.js");
const controllerReview=require("../controllers/review.js");

 //-------------REVIEW ROUTE(post)-----------------

  router.post("/",isLoggedin,validateReview,wrapAsync(controllerReview.createReview));

  //--------------DELETE REVIEW ROUTE----------------

  router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(controllerReview.destroyReview));

  module.exports=router;

