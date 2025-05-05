const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const providerModel = require("../models/providerModel");

exports.registerProvider = async (req, res) => {
  try {
    const { first_name, last_name, email, password, created_at } = req.body;

    // Check if user already exists
    const existingUser = await providerModel.findProviderByEmail(email);
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

    await providerModel.createProvider(
      first_name,
      last_name,
      email,
      hashedPassword,
      created_at
    );

    res.status(201).json({ message: "Signup successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const provider = await providerModel.findProviderByEmail(email);
    if (!provider) {
      return res
        .status(400)
        .json({ error: "Provider not found! Please create account" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong Password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { providerId: provider.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await providerModel.findProviderByEmail(email);
    if (!oldUser) {
      return res.status(400).json({ error: "This email is not exist!" });
    }

    const newPassword = uuidv4().slice(0, 8);

    // console.log(newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await providerModel.updatePasswordByEmail(email, hashedPassword);

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

exports.getProviderDetails = async (req, res) => {
  const providerId = req.provider.providerId;
  // console.log(id);

  const provider = await providerModel.getProviderDetails(providerId);

  if (!provider) {
    return res.status(404).json({
      error: "Provider Not Found",
    });
  }

  res.status(200).json({ providerData: provider });
};

exports.updateProviderDetails = async (req, res) => {
  try {
    const provider_id = req.provider.providerId;
    // console.log(provider_id);
    const avatar = req.file ? req.file.filename : null;
    // console.log(avatar);

    const updateProvider = await providerModel.updateProviderDetails(
      req.body,
      provider_id,
      avatar
    );

    if (updateProvider.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Provider details updated successfully!" });
    } else {
      res.status(400).json({ message: "Enable to update the details!" });
    }
  } catch (error) {
    console.error("Error in updating provider details", error);
    res.status(500).json({ error: "Server error!" });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const id = req.providerId;
    const { latitude, longitude } = req.body;
    // console.log(req.body);

    const result = await providerModel.updateLocation(latitude, longitude, id);

    res.status(200).json({
      message:
        "Location updated successfully. Ready to accept the nearest service.",
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getLocationData = async (req, res) => {
  try {
    const id = req.providerId;

    const locationData = await providerModel.getLocationData(id);
    // console.log(locationData);

    res.status(200).json({ locationData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.chnagePassword = async (req, res) => {
  try {
    const { old_password, password, confirm_password } = req.body;
    const id = req.providerId;

    if (!id) {
      return res.status(400).json({ error: "Provider not found!" });
    }

    const provider = await providerModel.findProviderById(id);

    if (!provider) {
      return res.status(404).json({ error: "Provider Not Found!" });
    }

    const isMatch = await bcrypt.compare(old_password, provider.password);
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
      res.status(400).json({ error: "Password are not match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await providerModel.changePassword(id, hashedPassword);

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
    console.error(error);
  }
};

exports.provider_online_offline_status = async (req, res) => {
  try {
    const provider_id = req.providerId;
    const { status } = req.body;

    // console.log(provider_id);
    // console.log(status);

    const result = await providerModel.provider_online_offline_status(
      status,
      provider_id
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }
    // console.log(result);

    res.status(200).json({ message: `You are ${status}` });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.get_provider_online_offline_status = async (req, res) => {
  try {
    const provider_id = req.providerId;
    if (!provider_id) {
      return res.status(400).json({
        error: "Provider id not found for the getting the provider status data",
      });
    }
    const result = await providerModel.get_provider_online_offline_status(
      provider_id
    );
    res.status(200).json({ ProviderStatusData: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.get_service_providing_by_id = async (req, res) => {
  try {
    const provider_id = req.providerId;
    if (!provider_id) {
      return res.status(400).json({ error: "Provider id are not found" });
    }

    const service = await providerModel.get_service_providing_by_id(
      provider_id
    );
    res.status(200).json({ service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getAllDocumentsType = async (req, res) => {
  try {
    const documents = await providerModel.getAllDocumentsType();
    res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// exports.uploadDocument = async (req, res) => {
//   try {
//     const provider_id = req.providerId;
//     const url = req.file ? req.file.filename : null;

//     const uploadedDocument = await providerModel.uploadDocument(
//       req.body,
//       provider_id,
//       url
//     );

//     res.status(201).json({ message: "Upload successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Server Error", details: error.message });
//     console.error(error);
//   }
// };
exports.uploadDocuments = async (req, res) => {
  try {
    // console.log("Received files:", req.files);
    // console.log("Received body:", req.body);

    // if (!req.files || req.files.length === 0) {
    //   return res.status(400).json({ error: "No files uploaded" });
    // }

    const provider_id = req.providerId;
    const documents = req.body.document_id;
    const unique_ids = req.body.unique_id;
    // const statuses = req.body.status;

    let uploadedDocs = [];

    for (let i = 0; i < req.files.length; i++) {
      const document_id = documents[i];
      const unique_id = unique_ids[i];
      // const status = statuses[i];
      const url = req.files[i].filename;

      const uploadedDocument = await providerModel.uploadDocument(
        document_id,
        provider_id,
        url,
        unique_id
        // status
      );

      uploadedDocs.push(uploadedDocument);
    }

    res.status(201).json({
      message: "Documents uploaded successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.getUploadedDocument = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // const documents = req.body.document_id;

    // console.log("Request Body:", req.body);
    // console.log("Provider ID:", provider_id);
    // console.log("Document ID:", documents);

    const uploadDocument = await providerModel.getUploadedDocument(
      provider_id
      // documents
    );

    res.status(200).json({ uploadDocument });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getSiteSettingsData = async (req, res) => {
  try {
    const siteSettings = await providerModel.getSiteSettingsData();

    res.status(200).json({ siteSettings });
  } catch (error) {
    console.error(error);
  }
};

// UPCOMING SERVICE PAGE

// PENDING SERVICE PAGE

exports.getRequestData = async (req, res) => {
  try {
    const provider_id = req.providerId;

    const requestData = await providerModel.getRequestData(provider_id);
    res.status(200).json({ requestData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getProviderStatusAndService = async (req, res) => {
  try {
    const provider_id = req.providerId;

    const statusAndServiceData =
      await providerModel.getProviderStatusAndService(provider_id);
    res.status(200).json({ statusAndServiceData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.rejectServiceByProviders = async (req, res) => {
  try {
    const provider_id = req.providerId;
    const { booking_id } = req.body;

    const result = await providerModel.rejectServiceByProviders(
      provider_id,
      booking_id
    );

    // if (result.affectedRows === 0) {
    //   return res
    //     .status(404)
    //     .json({ error: "Booking ID not found or already assigned" });
    // }

    return res.status(200).json({ message: "Service Rejected" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.acceptService = async (req, res) => {
  try {
    const provider_id = req.providerId;
    const { booking_id } = req.body;

    const result = await providerModel.acceptService(provider_id, booking_id);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Booking ID not found or already assigned" });
    }

    return res.status(200).json({ message: "Service Accepted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

// ACCEPTED SERVICE PAGE

exports.getAcceptedRequestData = async (req, res) => {
  try {
    const provider_id = req.providerId;

    const acceptedRequestData = await providerModel.getAcceptedRequestData(
      provider_id
    );
    res.status(200).json({ acceptedRequestData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.startService = async (req, res) => {
  try {
    const { booking_id } = req.body;

    const result = await providerModel.startService(booking_id);
    res.json({ message: "Service time is started." });
  } catch (error) {
    console.error("Error updating start time:", error);
    res.status(500).json({ message: "Failed to start time." });
  }
};
exports.endService = async (req, res) => {
  try {
    const { booking_id } = req.body;

    const result = await providerModel.endService(booking_id);
    res.json({ message: "Service time is ended." });
  } catch (error) {
    console.error("Error updating start time:", error);
    res.status(500).json({ message: "Failed to end time." });
  }
};

exports.cancelService = async (req, res) => {
  try {
    // const provider_id = req.providerId;
    const { booking_id } = req.params;

    const success = await providerModel.cancelService(booking_id);
    if (!success) {
      // console.log("Cancellation failed or request not found:", error);
      return res
        .status(404)
        .json({ message: "Cancellation failed or request not found." });
    }

    res.status(200).json({ message: `Request cancelled.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.complateService = async (req, res) => {
  try {
    const {
      request_id,
      payment_mode,
      fixed,
      time_price,
      tax,
      total,
      distance,
      commision,
      provider_earnings,
    } = req.body;

    // console.log(req.body);

    // if (
    //   !request_id ||
    //   !payment_mode ||
    //   !fixed ||
    //   !time_price ||
    //   !tax ||
    //   !total
    // ) {
    //   return res.status(400).json({ error: "All fields are required" });
    // }

    const result = await providerModel.complateService(
      request_id,
      payment_mode,
      fixed,
      time_price,
      tax,
      total,
      distance,
      commision,
      provider_earnings
    );

    res.status(200).json({ message: "Service Complated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment processing failed" });
  }
};

exports.service_otp_verification = async (req, res) => {
  const provider_id = req.providerId;
  const { request_id, user_email, user_id } = req.body;

  // console.log(req.body);

  try {
    const createdOtp = Math.floor(100000 + Math.random() * 900000).toString();
    // console.log("OTP", createdOtp);

    const existingUser = await providerModel.findOtpDetailsByUserId(
      user_id,
      request_id
    );

    if (existingUser) {
      await providerModel.updateOtpByUserId(request_id, user_id, createdOtp, 2);
    } else {
      await providerModel.addOtpDetails({
        request_id,
        user_email,
        user_id,
        provider_id,
        otp: createdOtp,
      });
    }

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
      to: user_email,
      subject: "Password Reset",
      html: `<p>Your OTP for verification is:</p>
             <p><strong>${createdOtp}</strong></p>
             <p>Please Tell this OTP to provider for start the service.</p>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log("Error sending email:", error);
        return res.status(500).json({ error: "Error sending email" });
      }
      // console.log("Email sent");
      res.status(200).json({ message: "OTP send! Please verify" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.otpVerify = async (req, res) => {
  try {
    const { user_id, request_id, otp } = req.body;

    // console.log("Received user_id:", user_id);
    // console.log("Received request_id:", request_id);
    // console.log("Received OTP:", otp);
    const otpDetails = await providerModel.findOtpDetailsByUserId(
      user_id,
      request_id
    );

    // console.log(otpDetails.otp);

    if (!otpDetails) {
      return res
        .status(400)
        .json({ error: "Invalid request or user not found." });
    }

    if (!req.body.otp) {
      return res
        .status(400)
        .json({ error: "Please enter the OTP before proceeding." });
    }

    if (otpDetails.otp != otp) {
      return res.status(400).json({ error: "Invalid OTP. Please try again." });
    }

    await providerModel.updateOtpStatus(user_id, request_id, 1);

    res.status(200).json({ message: "OTP verified. Now start your service" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
    console.error(error);
  }
};

// COMPLATED SERVICE PAGE

exports.getComplatedRequestData = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const ComplatedRequestData = await providerModel.getComplatedRequestData(
      provider_id
    );
    res.status(200).json({ ComplatedRequestData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

// CANCELLED SERVICE PAGE

exports.getCancelledRequestData = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const ComplatedRequestData = await providerModel.getCancelledRequestData(
      provider_id
    );
    res.status(200).json({ ComplatedRequestData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};


// Partner Earning 

exports.getTotalProviderEarning = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const totalEarning = await providerModel.getTotalProviderEarning(
      provider_id
    );
    res.status(200).json({ totalEarning });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getProviderServiceCount = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const serviceCount = await providerModel.getProviderServiceCount(
      provider_id
    );
    res.status(200).json({ serviceCount });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};
exports.getDailyServiceData = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const DailyServiceData = await providerModel.getDailyServiceData(
      provider_id
    );
    res.status(200).json({ DailyServiceData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getWeeklyServiceCount = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const weeklyServiceCount = await providerModel.getWeeklyServiceCount(
      provider_id
    );
    res.status(200).json({ weeklyServiceCount });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getWeeklyServiceEarningData = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const weeklyServiceEarningData = await providerModel.getWeeklyServiceEarningData(
      provider_id
    );
    res.status(200).json({ weeklyServiceEarningData });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.getProviderServiceLocation = async (req, res) => {
  try {
    const provider_id = req.providerId;
    // console.log(provider_id);

    const providerServiceLocation = await providerModel.getProviderServiceLocation(
      provider_id
    );
    res.status(200).json({ providerServiceLocation });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};