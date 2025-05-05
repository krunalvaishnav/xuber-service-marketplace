const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const adminModel = require("../models/adminModel");

//------> REGISTER & LOGIN

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, created_at } = req.body;

    // Check if user already exists
    const existingUser = await adminModel.findAdminByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "The email has already been taken." });
    }

    // Password validation
    // const passwordRegex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{4,32}$/;
    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({ error: "Password must be strong!" });
    // }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.registerAdmin(name, email, hashedPassword, created_at);

    res.status(201).json({ message: "Signup successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const admin = await adminModel.findAdminByEmail(email);
    // console.log(admin);

    if (!admin) {
      return res
        .status(400)
        .json({ error: "Admin not found! Please Create a account" });
    }
    // console.log("Stored:", typeof admin.password);
    // console.log("Entered:", typeof password);
    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    // console.log(password, admin.password);

    //  Makeing token
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    // console.log("Generated Token:", token);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await adminModel.findAdminByEmail(email);
    if (!oldUser) {
      return res.status(400).json({ error: "This email is not exist!" });
    }

    const newPassword = uuidv4().slice(0, 8);

    // console.log(newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await adminModel.updatePasswordByEmail(email, hashedPassword);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset.Hear is your new password:</p>
              <p> <strong>${newPassword} </strong> </p>
             <p>Use this password to login.</p>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log("Error sending email:", error);
        return res.status(500).json({ error: "Error sending email" });
      }
      // console.log("Email sent");
      res
        .status(200)
        .json({ message: "Password reset link sent successfully!" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//-----> MEMBERS

// USERS
exports.getUserDetails = async (req, res) => {
  try {
    // const id = req.adminId

    const user = await adminModel.getUserDetails();
    // console.log("userdata", user);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const picture = req.file ? req.file.filename : null;
    // console.log(picture);

    const updateUser = await adminModel.editUser(id, req.body, picture);

    if (updateUser.affectedRows > 0) {
      res.status(200).json({ message: "User details updated successfully!" });
    } else {
      res.status(400).json({ message: "Enable to update the details!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await adminModel.deleteUser(id);

    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, mobile } = req.body;
    const picture = req.file ? req.file.filename : null;

    // console.log("body", req.body);

    const existingUser = await adminModel.findUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "The email has already been taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      picture,
      mobile
    );
    res.status(201).json({ message: "User Created successfully!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.getUserRequestData = async (req, res) => {
  try {
    const { id } = req.params;

    const userRequest = await adminModel.getUserRequestData(id);

    res.status(200).json({ userRequest });
  } catch (error) {
    console.error(error);
  }
};

// PROVIDERS
exports.getProviderDetails = async (req, res) => {
  try {
    const provider = await adminModel.getProviderDetails();

    res.status(200).json({ provider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

exports.editProvider = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const avatar = req.file ? req.file.filename : null;
    // console.log(req.body);

    const updateProvider = await adminModel.editProvider(id, req.body, avatar);

    if (updateProvider.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Provider details updated successfully!" });
    } else {
      res.status(400).json({ message: "Unable to update the detailss!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProvider = await adminModel.deleteProvider(id);

    res.status(200).json({ message: "Provider Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.createProvider = async (req, res) => {
  try {
    const { first_name, last_name, email, password, mobile } = req.body;
    const avatar = req.file ? req.file.filename : null;

    // console.log("body", req.body);

    const existingProvider = await adminModel.findProviderByEmail(email);

    if (existingProvider) {
      return res
        .status(400)
        .json({ error: "The email has already been taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.createProvider(
      first_name,
      last_name,
      email,
      hashedPassword,
      avatar,
      mobile
    );
    res.status(201).json({ message: "Provider Created successfully!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.getProviderRequestData = async (req, res) => {
  try {
    const { id } = req.params;

    const providerRequest = await adminModel.getProviderRequestData(id);

    res.status(200).json({ providerRequest });
  } catch (error) {
    console.error(error);
  }
};

// PROVIDER DOCUMENTS AND SERVICES ALLOCATION RELATED

exports.getAllServices = async (req, res) => {
  try {
    const services = await adminModel.getAllServices();

    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

exports.serviceAllocation = async (req, res) => {
  try {
    const values = await adminModel.serviceAllocation(req.body);
    res.status(200).json({ message: "Service Allocated Successfully" });
  } catch (error) {
    console.error("Service Allocation Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getServicesById = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log(id);

    const data = await adminModel.getServicesById(id);

    res.status(200).json({ services: data });
  } catch (error) {
    console.error("Service Getting Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteAllocatedService = async (req, res) => {
  const { provider_id, service_type_id } = req.params;
  // console.log(provider_id);
  // console.log(service_type_id);

  try {
    const result = await adminModel.deleteAllocatedService(
      provider_id,
      service_type_id
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Service Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Service Not Found" });
    }
  } catch (error) {
    console.error("Error deleting service", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProviderAllocatedService = async (req, res) => {
  // const { id } = req.params;
  try {
    const data = await adminModel.getProviderAllocatedService();
    res.status(200).json({ serviceAllocation: data });
  } catch (error) {
    console.error("Error fetching service", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.setProviderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // console.log(id, status);

  try {
    const result = await adminModel.setProviderStatus(id, status);

    if (result.affectedRows > 0) {
      res.json({ message: `Provider ${status} successfully` });
    } else {
      res.status(404).json({ message: "Provider Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// DOCUMENTS

exports.getUploadedDocument = async (req, res) => {
  try {
    const { id } = req.params;
    // const documents = req.body.document_id;

    // console.log("Request Body:", req.body);
    // console.log("Provider ID:", id);
    // console.log("Document ID:", documents);

    const uploadDocument = await adminModel.getUploadedDocument(
      id
      // documents
    );

    res.status(200).json({ uploadDocument });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.setDocumentStatus = async (req, res) => {
  const { id } = req.params;
  const { status, document_id } = req.body;
  // console.log(id, status, document_id);

  try {
    const result = await adminModel.setDocumentStatus(id, document_id, status);

    if (result.affectedRows > 0) {
      res.json({ message: `Document status changed successfully` });
    } else {
      res.status(404).json({ message: "Document Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//----->  General

// Service Types

exports.createServiceType = async (req, res) => {
  try {
    const { name, provider_name, fixed, price } = req.body;
    const image = req.file ? req.file.filename : null;

    // console.log("body", req.body);
    // console.log(image);

    await adminModel.createServiceType(
      name,
      provider_name,
      image,
      fixed,
      price
    );
    res.status(201).json({ message: "Service Type Created successfully!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await adminModel.deleteService(id);

    res.status(200).json({ message: "Service Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.editService = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const image = req.file ? req.file.filename : null;
    // console.log(req.body);

    const updateService = await adminModel.editService(id, req.body, image);

    if (updateService.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Service details updated successfully!" });
    } else {
      res.status(400).json({ message: "Unable to update the detailss!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

// Documents

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await adminModel.getAllDocuments();

    res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};
exports.createDocuments = async (req, res) => {
  try {
    const { name, type } = req.body;
    // console.log(req.body);

    await adminModel.createDocuments(name, type);
    res.status(201).json({ message: "Document Created successfully!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
exports.editDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const updateDocuments = await adminModel.editDocuments(id, req.body);

    if (updateDocuments.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Documents details updated successfully!" });
    } else {
      res.status(400).json({ message: "Unable to update the detailss!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.deleteDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteDocument = await adminModel.deleteDocuments(id);

    res.status(200).json({ message: "Document Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

//----->  Services

// Services History

exports.getAllRequestData = async (req, res) => {
  try {
    const AllRequest = await adminModel.getAllRequestData();

    res.status(200).json({ AllRequest });
  } catch (error) {
    console.error(error);
  }
};

exports.getAllScheduleRequestData = async (req, res) => {
  try {
    const AllScheduleRequest = await adminModel.getAllScheduleRequestData();

    res.status(200).json({ AllScheduleRequest });
  } catch (error) {
    console.error(error);
  }
};

//-----> Account

//  AccountSettings

exports.getAdminDetails = async (req, res) => {
  try {
    const id = req.adminId;
    // console.log("User ID:", id);
    // console.log("User:", req.user);
    const admin = await adminModel.getAdminDetails(id);

    // console.log("All user details", user);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found!" });
    }

    res.status(200).json({ adminData: admin });
  } catch (error) {
    console.error("Error fetching Admin details:", error);
  }
};

exports.editAdmin = async (req, res) => {
  try {
    const id = req.adminId;
    // console.log(id);

    const picture = req.file ? req.file.filename : null;
    // console.log(picture);

    const updateAdmin = await adminModel.editAdmin(id, req.body, picture);

    if (updateAdmin.affectedRows > 0) {
      res.status(200).json({ message: "Admin details updated successfully!" });
    } else {
      res.status(400).json({ message: "Enable to update the details!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

//  ChangePassword
exports.changePassword = async (req, res) => {
  try {
    const { old_password, password, confirm_password } = req.body;

    const id = req.adminId;
    // console.log(id);

    if (!id) {
      return res.status(400).json({ error: "Admin ID is required!" });
    }

    const admin = await adminModel.findAdminById(id);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(old_password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect!" });
    }

    // console.log("old_password:", old_password);

    // console.log("New_password:", password);

    if (old_password === password) {
      return res
        .status(400)
        .json({ error: "Old password and new password should not be same!" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await adminModel.changePassword(id, hashedPassword);

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

//-----> Account

// Get Card Data (Total count of all)

exports.getTotalCount = async (req, res) => {
  try {
    const totalCount = await adminModel.getTotalCount();

    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getTopUser = async (req, res) => {
  try {
    const topUser = await adminModel.getTopUser();

    res.status(200).json({ topUser });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};
exports.getTopProvider = async (req, res) => {
  try {
    const topProvider = await adminModel.getTopProvider();

    res.status(200).json({ topProvider });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getUserRequestTime = async (req, res) => {
  try {
    const requestTime = await adminModel.getUserRequestTime();
    res.status(200).json(requestTime);
  } catch (error) {
    res.status(500).json({ error: "server error" });
    console.error(error);
  }
};

exports.getLetestRequestData = async (req, res) => {
  try {
    const AllRequest = await adminModel.getLetestRequestData();

    res.status(200).json({ AllRequest });
  } catch (error) {
    console.error(error);
  }
};

exports.getRequestCancellationRate = async (req, res) => {
  try {
    const requestCancellationRate =
      await adminModel.getRequestCancellationRate();

    res.status(200).json({ requestCancellationRate });
  } catch (error) {
    console.error(error);
  }
};

exports.getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await adminModel.getTotalRevenue();

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error(error);
  }
};

//-----> Settings

//  Site Settings

exports.getSiteSettingsData = async (req, res) => {
  try {
    const siteSettings = await adminModel.getSiteSettingsData();

    res.status(200).json({ siteSettings });
  } catch (error) {
    console.error(error);
  }
};

exports.editSiteSettingsData = async (req, res) => {
  try {
    const settings = req.body;
    const files = req.files;

    // console.log("Body:", req.body);
    // console.log("Files:", files);

    let updateData = [];

    Object.keys(settings).forEach((key) => {
      if (settings[key] !== undefined) {
        updateData.push({ key, value: settings[key] });
      }
    });

    if (files && files["site_icon"] && files["site_icon"].length > 0) {
      updateData.push({
        key: "site_icon",
        value: files["site_icon"][0].filename,
      });
    }
    if (files && files["site_logo"] && files["site_logo"].length > 0) {
      updateData.push({
        key: "site_logo",
        value: files["site_logo"][0].filename,
      });
    }

    // console.log("Final Update Data:", updateData);

    if (updateData.length === 0) {
      return res.status(400).json({ error: "No valid data to update" });
    }

    // Update settings in the database
    const updateResults = await Promise.all(
      updateData.map(async ({ key, value }) => {
        return await adminModel.editSiteSettingsData(key, value);
      })
    );

    const isUpdated = updateResults.some((result) => result.affectedRows > 0);

    if (isUpdated) {
      res.status(200).json({ message: "Site settings updated successfully!" });
    } else {
      res.status(400).json({ message: "No settings were updated" });
    }
  } catch (error) {
    console.error("Error in editSiteSettingsData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//-----> Statements
// OverallServiceStatements

exports.getOverallStatementsCount = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // console.log("startDate", startDate);
    // console.log("endDate", endDate);

    const overallStatementsCount = await adminModel.getOverallStatementsCount(
      startDate,
      endDate
    );

    res.json({ overallStatementsCount });
  } catch (error) {
    console.error(error);
  }
};

exports.getOverallStatementsData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // console.log("startDate", startDate);
    // console.log("endDate", endDate);

    const overallStatementsData = await adminModel.getOverallStatementsData(
      startDate,
      endDate
    );

    res.json({ overallStatementsData });
  } catch (error) {
    console.error(error);
  }
};

// ProviderStatements
exports.getProviderStatementsData = async (req, res) => {
  try {
    const providerStatementsData = await adminModel.getProviderStatementsData();

    res.status(200).json({ providerStatementsData });
  } catch (error) {
    console.error(error);
  }
};

//Today Statement

exports.getDailyStatementsCount = async (req, res) => {
  try {
    const dailyStatementsCount = await adminModel.getDailyStatementsCount();

    res.status(200).json({ dailyStatementsCount });
  } catch (error) {
    console.error(error);
  }
};
exports.getDailyStatementsData = async (req, res) => {
  try {
    const dailyStatementsData = await adminModel.getDailyStatementsData();

    res.status(200).json({ dailyStatementsData });
  } catch (error) {
    console.error(error);
  }
};

//Monthly Statement

exports.getMonthlyStatementsCount = async (req, res) => {
  try {
    const monthlyStatementsCount = await adminModel.getMonthlyStatementsCount();

    res.status(200).json({ monthlyStatementsCount });
  } catch (error) {
    console.error(error);
  }
};

exports.getMonthlyStatementsData = async (req, res) => {
  try {
    const monthlyStatementsData = await adminModel.getMonthlyStatementsData();

    res.status(200).json({ monthlyStatementsData });
  } catch (error) {
    console.error(error);
  }
};

//Yearly Statement

exports.getYearlyStatementsCount = async (req, res) => {
  try {
    const yearlyStatementsCount = await adminModel.getYearlyStatementsCount();

    res.status(200).json({ yearlyStatementsCount });
  } catch (error) {
    console.error(error);
  }
};

exports.getYearlyStatementsData = async (req, res) => {
  try {
    const yearlyStatementsData = await adminModel.getYearlyStatementsData();

    res.status(200).json({ yearlyStatementsData });
  } catch (error) {
    console.error(error);
  }
};

//-----> Details
// Ratings
exports.getRatingsData = async (req, res) => {
  try {
    const ratingsData = await adminModel.getRatingsData();

    res.status(200).json({ ratingsData });
  } catch (error) {
    console.error(error);
  }
};

// Provider Location
exports.getProviderLocationData = async (req, res) => {
  try {
    const locationData = await adminModel.getProviderLocationData();

    res.status(200).json({ locationData });
  } catch (error) {
    console.error(error);
  }
};
