const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
const upload = require("../middlewares/multerMiddleware");
const {
  registerUser,
  loginUser,
  forgotPassword,
  // emailForgotPassword,
  changePassword,
  getUserDetails,
  updateUserDetails,
  getAllServices,
  createServiceRequest,
  getAllUserRequest,
  cancelUserRequest,
  userRating,
  getSingleService,
  getSiteSettingsData,
  getUserRating
} = require("../controllers/userCtrl");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/reset/email", forgotPassword);
// router.get("/resetpassword/:token",emailForgotPassword);

router.put("/changepassword", authMiddleware, changePassword);

router.get("/profile", authMiddleware, getUserDetails);

router.put(
  "/profile/edit",
  upload.single("picture"),
  authMiddleware,
  updateUserDetails
);

router.get("/services", getAllServices);

router.post("/request", authMiddleware, createServiceRequest);

router.get("/request", authMiddleware, getAllUserRequest);
router.post("/request/cancel/:booking_id", authMiddleware, cancelUserRequest);
router.post("/rating/:booking_id", authMiddleware, userRating);

router.get("/rating/:booking_id", authMiddleware, getUserRating);
router.get("/services/:id", authMiddleware, getSingleService);

router.get("/setting", getSiteSettingsData);

module.exports = router;


