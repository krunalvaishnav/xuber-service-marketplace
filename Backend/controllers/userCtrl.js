const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const userModel = require("../models/userModel");

// const {
//   createUser,
//   findUserByEmail,
//   updatePasswordByEmail,
//   findUserById,
//   changePassword,
//   getUserDetails,
//   updateUserDetails,
//   getAllServices,
//   createServiceRequest,
//   generateBookingId,
//   getAllUserRequest,
//   cancelUserRequest,
//   userRating,
//   getSingleService,
// } = require("../models/userModel");
const { request } = require("express");

exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, created_at } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
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

    await userModel.createUser(
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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found! Please Create a account" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong Password." });
    }

    //  Makeing token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    // console.log("Generated Token:", token);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await userModel.findUserByEmail(email);
    if (!oldUser) {
      return res.status(400).json({ error: "This email is not exist!" });
    }

    const newPassword = uuidv4().slice(0, 8);

    // console.log(newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.updatePasswordByEmail(email, hashedPassword);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Password Reset",
    //   html: `<p>You requested a password reset.Hear is your new password:</p>
    //           <p> <strong>${newPassword} </strong> </p>
    //          <p>Use this password to login.</p>`,
    // };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password - Xuber Services",
      html: ` 
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 20px; text-align: center; background-color:rgb(40, 202, 151);">
                <h1 style="color: white; margin: 0;">Reset Your Password</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 24px; color: #333;">
                  Hello,  
                </p>
                <p style="font-size: 16px; line-height: 24px; color: #333;">
                  You requested to reset your password. Use this password for login:
                </p>
                <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0; text-align: center; border-radius: 5px;">
                  <h2 style="margin: 0; color:rgb(40, 202, 151); letter-spacing: 5px; font-size: 32px;">${newPassword}</h2>
                </div>
                <p style="font-size: 16px; line-height: 24px; color: #333;">
                  If you did not request this, please ignore this email.
                </p>
                <p style="font-size: 16px; line-height: 24px; color: #333;">
                  For security reasons, do not share this code with anyone.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 30px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #777;">
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Xuber Services. All rights reserved.</p>
                <p style="margin: 5px 0 0 0;">This is an automated message. Please do not reply.</p>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
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

// exports.emailForgotPassword =async (req, res)=>{
//     res.send("email verified")
// }

exports.changePassword = async (req, res) => {
  try {
    const { old_password, password, confirm_password } = req.body;
    const id = req.userId;

    // console.log("Body",req.body);

    if (!id) {
      return res.status(400).json({ error: "User ID is required!" });
    }

    const user = await userModel.findUserById(id);
    // console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
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
    await userModel.changePassword(id, hashedPassword);

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.userId;
    // console.log("User ID:", id);
    // console.log("User:", req.user);
    const user = await userModel.getUserDetails(id);

    // console.log("All user details", user);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ userData: user });
  } catch (error) {
    console.error("Error fetching userdetails:", error);
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const id = req.userId;
    // console.log("User ID:", id);

    const { first_name, last_name, email, mobile } = req.body;
    const picture = req.file ? req.file.filename : null;
    // console.log("update User Body:", req.body);
    // console.log("Uploaded Picture:", picture);

    const updatedUser = await userModel.updateUserDetails(
      first_name,
      last_name,
      email,
      mobile,
      picture,
      id
    );

    if (updatedUser.affectedRows > 0) {
      res.status(200).json({ message: "User details updated successfully!" });
    } else {
      res.status(400).json({ error: "Enable to update the details!" });
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    res
      .status(500)
      .json({ error: "server error! Enable to update the details" });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await userModel.getAllServices();

    // console.log("BackendgetAllServices",services);

    if (services.length === 0) {
      return res.status(404).json({ error: "Service not avaliable." });
    }

    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ error: "Server Error, Services is not found" });
  }
};

exports.createServiceRequest = async (req, res) => {
  try {
    const user_id = req.user.userId;
    // console.log("Request Body:", req.body);
    // console.log("User ID:", req.user.userId);

    const {
      booking_id,
      provider_id,
      service_type_id,
      status,
      payment_mode,
      paid,
      distance,
      s_address,
      s_latitude,
      s_longitude,
      d_address,
      d_latitude,
      d_longitude,
      schedule_at,
      started_at,
      finished_at,
      user_rated,
      provider_rated,
      use_wallet,
    } = req.body;

    // const booking_id = await userModel.generateBookingId();
    // console.log("Generated Booking ID:", booking_id);

    if (!booking_id || !user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const params = [
      booking_id,
      user_id,
      provider_id || null,
      service_type_id,
      status || "PENDING",
      payment_mode,
      paid || 0,
      distance || 0,
      s_address,
      s_latitude || null,
      s_longitude || null,
      d_address,
      d_latitude || null,
      d_longitude || null,
      schedule_at || null,
      started_at || null,
      finished_at || null,
      user_rated || 0,
      provider_rated || 0,
      use_wallet || 0,
    ];

    const result = await userModel.createServiceRequest(params);

    res.status(201).json({
      message: "Your request created successfully",
      requestId: result.insertId,
    });
  } catch (error) {
    console.error("Error in createUserRequest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUserRequest = async (req, res) => {
  try {
    const user_id = req.user.userId;
    // console.log("User ID:", req.user.userId);
    if (!user_id) {
      return res.status(400).json({ message: "User id are not found!" });
    }

    const requests = await userModel.getAllUserRequest(user_id);
    // if (requests.length === 0) {
    //   return res.status(404).json({ error: "No requests found!" });
    // }
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.cancelUserRequest = async (req, res) => {
  try {
    // if (!req.user || !req.user.role) {
    //   return res.status(400).json({ message: "User role not found!" });
    // }
    const user_id = req.user.userId;
    const { booking_id } = req.params;

    // console.log("user_id", user_id);
    // console.log("bookingid", booking_id);

    // const cancelledBy = "USER";

    const success = await userModel.cancelUserRequest(booking_id, user_id);
    if (!success) {
      // console.log("Cancellation failed or request not found:", error);
      return res
        .status(404)
        .json({ message: "Cancellation failed or request not found." });
    }

    res.status(200).json({ message: `Request cancelled by user.` });
  } catch (error) {
    console.error("Error cancelling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.userRating = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { booking_id } = req.params;

    const { user_rating, user_comment } = req.body;

    if (!booking_id || !user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const params = [booking_id, user_id, user_rating, user_comment];

    const response = await userModel.userRating(params);
    await userModel.updateProviderRating(booking_id);

    res.status(201).json({
      message:
        "Thank you for the feedback! We'll strive to improve and hope to impress you next time.",
    });
  } catch (error) {
    console.error(
      "You don't have permission to give a rating. Please contact your administrator.",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.getUserRating = async (req, res) => {
  const { booking_id } = req.params;
  try {
    const data = await userModel.getUserRating(booking_id);
    // console.log("backedn", data);

    res.send(data);
  } catch (error) {
    console.error("Error in Finding Single service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSingleService = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.getSingleService(id);
    // console.log("backedn", data);

    res.send(data);
  } catch (error) {
    console.error("Error in Finding Single service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSiteSettingsData = async (req, res) => {
  try {
    const siteSettings = await userModel.getSiteSettingsData();

    res.status(200).json({ siteSettings });
  } catch (error) {
    console.error(error);
  }
};
