const express = require("express");
const adminCtrl = require("../controllers/adminCtrl");
const adminMiddlewares = require("../middlewares/adminMiddlewares");
const upload = require("../middlewares/multerMiddleware");

const router = express.Router();

//------> REGISTER & LOGINgetSiteSettingsData

router.post("/register", adminCtrl.registerAdmin);
router.post("/login", adminCtrl.loginAdmin);
router.post("/password/reset/email", adminCtrl.forgotPassword);

//-----> MEMBERS

// USER
router.get("/user", adminCtrl.getUserDetails);

router.put("/user/:id/edit", upload.single("picture"), adminCtrl.editUser);

router.delete("/user/:id/delete", adminCtrl.deleteUser);

router.post("/user/create", upload.single("picture"), adminCtrl.createUser);

router.get("/user/:id/request", adminCtrl.getUserRequestData);

// PROVIDER
router.get("/provider", adminCtrl.getProviderDetails);

router.put(
  "/provider/:id/edit",
  upload.single("avatar"),
  adminCtrl.editProvider
);

router.delete("/provider/:id/delete", adminCtrl.deleteProvider);

router.post(
  "/provider/create",
  upload.single("avatar"),
  adminCtrl.createProvider
);

router.get("/provider/:id/request", adminCtrl.getProviderRequestData);

//PROVIDERS DOCUMENTS AND SERVICES ALLOCATION RELATED
router.get("/services", adminCtrl.getAllServices);

router.post("/service-Allocation", adminCtrl.serviceAllocation);

router.get("/services/:id", adminCtrl.getServicesById);

router.delete(
  "/service-allocation/:provider_id/:service_type_id",
  adminCtrl.deleteAllocatedService
);

router.get("/allocated-service", adminCtrl.getProviderAllocatedService);

router.post("/provider-status/:id", adminCtrl.setProviderStatus);

// DOCUMENTS

router.get("/get-upload-document/:id", adminCtrl.getUploadedDocument);

router.post("/document-status/:id", adminCtrl.setDocumentStatus);

//----->  General

// Service Types

router.post(
  "/service/create",
  upload.single("image"),
  adminCtrl.createServiceType
);

router.delete("/service/:id/delete", adminCtrl.deleteService);

router.put("/service/:id/edit", upload.single("image"), adminCtrl.editService);

// Documents

router.get("/documents", adminCtrl.getAllDocuments);
router.post("/documents/create", adminCtrl.createDocuments);
router.put("/documents/:id/edit", adminCtrl.editDocuments);
router.delete("/documents/:id/delete", adminCtrl.deleteDocuments);

//----->  Services

// Services History
router.get("/request", adminCtrl.getAllRequestData);
router.get("/scheduled/request", adminCtrl.getAllScheduleRequestData);

//-----> Account

//  AccountSettings

router.get("/profile", adminMiddlewares, adminCtrl.getAdminDetails);

router.put(
  "/profile/edit",
  upload.single("picture"),
  adminMiddlewares,
  adminCtrl.editAdmin
);

//  ChangePassword
router.put("/password", adminMiddlewares, adminCtrl.changePassword);

//-----> Account

// Get Card Data (Total count of all)

router.get("/total-count", adminCtrl.getTotalCount);
router.get("/top-user", adminCtrl.getTopUser);
router.get("/top-provider", adminCtrl.getTopProvider);
router.get("/request-time", adminCtrl.getUserRequestTime);
router.get("/latest-service", adminCtrl.getLetestRequestData);
router.get("/cancellations-request", adminCtrl.getRequestCancellationRate);
router.get("/total-revenue", adminCtrl.getTotalRevenue);

//-----> Settings

//  Site Settings
router.get("/setting", adminCtrl.getSiteSettingsData);
router.put(
  "/editSetting",
  upload.fields([
    { name: "site_icon", maxCount: 1 },
    { name: "site_logo", maxCount: 1 },
  ]),
  adminCtrl.editSiteSettingsData
);

// -----> Statements
// OverallServiceStatements

router.get("/overallstatement-count", adminCtrl.getOverallStatementsCount);
router.get("/overallstatement-data", adminCtrl.getOverallStatementsData);
// ProviderStatements
router.get("/providerstatement-data", adminCtrl.getProviderStatementsData);
//Today Statement

router.get("/dailystatement-count", adminCtrl.getDailyStatementsCount);
router.get("/dailystatement-data", adminCtrl.getDailyStatementsData);

// Monthly Statement
router.get("/monthlystatement-count", adminCtrl.getMonthlyStatementsCount);
router.get("/monthlystatement-data", adminCtrl.getMonthlyStatementsData);

//Yearly Statement

router.get("/yearlystatement-count", adminCtrl.getYearlyStatementsCount);
router.get("/yearlystatement-data", adminCtrl.getYearlyStatementsData);

//-----> Details
// Ratings
router.get("/ratings", adminCtrl.getRatingsData);
// Provider Location
router.get("/provider-location", adminCtrl.getProviderLocationData);

module.exports = router;


