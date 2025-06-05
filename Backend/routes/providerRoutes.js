const express = require("express");
const providerCtrl = require("../controllers/providerCtrl");
const providerAuthMiddlewares = require("../middlewares/providerAuthMiddlewares");
const upload = require("../middlewares/multerMiddleware");

const router = express.Router();

router.post("/register", providerCtrl.registerProvider);
router.post("/login", providerCtrl.loginProvider);
router.post("/password/reset/email", providerCtrl.forgotPassword);

router.get(
  "/profile",
  providerAuthMiddlewares,
  providerCtrl.getProviderDetails
);

router.put(
  "/profile",
  upload.single("avatar"),
  providerAuthMiddlewares,
  providerCtrl.updateProviderDetails
);

router.post(
  "/update-location",
  providerAuthMiddlewares,
  providerCtrl.updateLocation
);
router.get(
  "/update-location",
  providerAuthMiddlewares,
  providerCtrl.getLocationData
);

router.put(
  "/changepassword",
  providerAuthMiddlewares,
  providerCtrl.chnagePassword
);

router.post(
  "/status",
  providerAuthMiddlewares,
  providerCtrl.provider_online_offline_status
);
router.get(
  "/status",
  providerAuthMiddlewares,
  providerCtrl.get_provider_online_offline_status
);

router.get(
  "/service",
  providerAuthMiddlewares,
  providerCtrl.get_service_providing_by_id
);

router.get(
  "/list-documents",
  providerAuthMiddlewares,
  providerCtrl.getAllDocumentsType
);

router.post(
  "/upload-document",
  upload.array("url", 10),
  providerAuthMiddlewares,
  providerCtrl.uploadDocuments
);

router.get(
  "/get-upload-document",
  providerAuthMiddlewares,
  providerCtrl.getUploadedDocument
);

router.get("/setting", providerCtrl.getSiteSettingsData);

// UPCOMING SERVICE PAGE

// PENDING SERVICE PAGE

router.get("/request", providerAuthMiddlewares, providerCtrl.getRequestData);
router.get(
  "/status-service",
  providerAuthMiddlewares,
  providerCtrl.getProviderStatusAndService
);
router.post(
  "/reject-service",
  providerAuthMiddlewares,
  providerCtrl.rejectServiceByProviders
);
router.post(
  "/accept-service",
  providerAuthMiddlewares,
  providerCtrl.acceptService
);

// ACCEPTED SERVICE PAGE

router.get(
  "/accepted-request",
  providerAuthMiddlewares,
  providerCtrl.getAcceptedRequestData
);

router.post(
  "/start-service",
  providerAuthMiddlewares,
  providerCtrl.startService
);

router.post("/end-service", providerAuthMiddlewares, providerCtrl.endService);
router.post(
  "/service-cancel/:booking_id",
  providerAuthMiddlewares,
  providerCtrl.cancelService
);
router.post(
  "/service-complate",
  providerAuthMiddlewares,
  providerCtrl.complateService
);

router.post(
  "/otp-send",
  providerAuthMiddlewares,
  providerCtrl.service_otp_verification
);
router.post("/otp-verify", providerAuthMiddlewares, providerCtrl.otpVerify);


// COMPLATED SERVICE PAGE

router.get(
  "/complated-request",
  providerAuthMiddlewares,
  providerCtrl.getComplatedRequestData
);

// CANCELLED SERVICE PAGE

router.get(
  "/cancelled-request",
  providerAuthMiddlewares,
  providerCtrl.getCancelledRequestData
);

// Partner Earning 


router.get(
  "/total-earning",
  providerAuthMiddlewares,
  providerCtrl.getTotalProviderEarning
);

router.get(
  "/total-service-count",
  providerAuthMiddlewares,
  providerCtrl.getProviderServiceCount
);
router.get(
  "/daily-service",
  providerAuthMiddlewares,
  providerCtrl.getDailyServiceData
);
router.get(
  "/weekly-service-count",
  providerAuthMiddlewares,
  providerCtrl.getWeeklyServiceCount
);
router.get(
  "/weekly-service",
  providerAuthMiddlewares,
  providerCtrl.getWeeklyServiceEarningData
);
router.get(
  "/service-location",
  providerAuthMiddlewares,
  providerCtrl.getProviderServiceLocation
);


module.exports = router;
