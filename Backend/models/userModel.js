const db = require("../config/db");

const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

exports.generateBookingId = async () => {
  let bookingId;
  let exists = true;

  while (exists) {
    bookingId = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit number
    const [rows] = await db.execute(
      "SELECT COUNT(*) as count FROM user_requests WHERE booking_id = ?",
      [bookingId]
    );
    exists = rows[0].count > 0; // If count > 0, generate a new one
  }
  return bookingId;
};

exports.createUser = async (first_name, last_name, email, password) => {
  const query = `INSERT INTO users (first_name, last_name, email, password,created_at) VALUES (?, ?, ?, ?,?)`;

  const [rows] = await db.execute(query, [
    first_name,
    last_name,
    email,
    password,
    getCurrentDateTime(),
  ]);
  console.log(rows);

  return rows;
};

exports.findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await db.execute(query, [email]);
  return rows.length ? rows[0] : null;
};

exports.updatePasswordByEmail = async (email, newPassword) => {
  const query = `UPDATE users SET password = ? where email = ?`;
  const [rows] = await db.execute(query, [newPassword, email]);
  return rows;
};

exports.findUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows.length ? rows[0] : null;
};

exports.changePassword = async (id, newPassword) => {
  const query = `UPDATE users SET password = ? where id = ?`;
  const [rows] = await db.execute(query, [newPassword, id]);
  return rows;
};

exports.getUserDetails = async (id) => {
  const query = `SELECT id, first_name, last_name, email, mobile,wallet_balance, picture FROM users WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows.length ? rows[0] : null;
};

exports.updateUserDetails = async (
  first_name,
  last_name,
  email,
  mobile,
  picture,
  id
) => {
  let query;
  let values;
  const updated_at = getCurrentDateTime();

  if (picture) {
    query = `UPDATE users SET first_name = ?, last_name = ?, email = ?, mobile = ?, picture = ?, updated_at = ? WHERE id = ?`;
    values = [first_name, last_name, email, mobile, picture, updated_at, id];
  } else {
    query = `UPDATE users SET first_name = ?, last_name = ?, email = ?, mobile = ?, updated_at = ? WHERE id = ?`;
    values = [first_name, last_name, email, mobile, updated_at, id];
  }
  const [rows] = await db.execute(query, values);
  return rows;
};

exports.findServicesById = async (id) => {
  const query = `SELECT * FROM service_types WHERE ID = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows.length ? rows[0] : null;
};

exports.getAllServices = async () => {
  const query = `SELECT  id, name, provider_name, image, fixed, price, status FROM service_types WHERE status = 1`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.createServiceRequest = async (params) => {
  const query = `INSERT INTO user_requests (
        booking_id, user_id, provider_id, service_type_id, status, payment_mode, 
        paid, distance, s_address, s_latitude, s_longitude, d_address, 
        d_latitude, d_longitude, schedule_at, started_at, finished_at, 
        user_rated, provider_rated, use_wallet, created_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, 
        ?, ?, ?, ?
      ) `;

  const [rows] = await db.execute(query, [...params, getCurrentDateTime()]);
  return rows;
};

exports.getAllUserRequest = async (userId) => {
  const query = `
  SELECT ur.*, 
       st.name AS service_name, 
       st.price AS hourly_rate,
       st.fixed AS base_price,
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       u.mobile AS user_mobile_number,
       u.email AS user_email,
       otp.otp_verified AS otp_status,
       urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings,
       urr.user_rating,
       urr.user_comment
FROM user_requests ur
LEFT JOIN service_types st ON ur.service_type_id = st.id
LEFT JOIN users u ON u.id = ur.user_id
LEFT JOIN service_otp_verifications otp ON otp.request_id = ur.id
LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
LEFT JOIN user_request_ratings urr ON urr.booking_id = ur.booking_id AND urr.id = (
        SELECT MAX(urr_sub.id) 
        FROM user_request_ratings urr_sub 
        WHERE urr_sub.booking_id = ur.booking_id
    )
    WHERE ur.user_id = ?`;
  const [rows] = await db.execute(query, [userId]);
  return rows;
};

exports.cancelUserRequest = async (bookingId, userId) => {
  const query = `UPDATE user_requests 
    SET status = 'CANCELLED', cancelled_by = 'USER', updated_at = ?
    WHERE booking_id = ? AND user_id = ? `;

  const [rows] = await db.execute(query, [
    getCurrentDateTime(),
    bookingId,
    userId,
  ]);
  // if (rows.length === 0) {
  //   return res.status(404).json({ message: "Request not found." });
  // }
  // if (rows[0].status === "CANCELLED") {
  //   return res.status(400).json({ message: "Request is already canceled." });
  // }
  return rows;
};

exports.userRating = async (params) => {
  const query = `INSERT INTO user_request_ratings (booking_id, user_id,  user_rating, user_comment, created_at) values (?, ?, ?, ?, ?)`;
  const [rows] = await db.execute(query, [...params, getCurrentDateTime()]);
  return rows;
};

exports.updateProviderRating = async (booking_id) => {
  const getProviderQuery = `
    SELECT provider_id 
    FROM user_requests 
    WHERE booking_id = ?
  `;
  const [providerRows] = await db.execute(getProviderQuery, [booking_id]);

  // if (providerRows.length === 0) {
  //   throw new Error("No provider found for this booking");
  // }

  const provider_id = providerRows[0].provider_id;

  const avgRatingQuery = `
    SELECT 
      AVG(urr.user_rating) as average_rating, 
      COUNT(*) as rating_count 
    FROM user_request_ratings urr
    JOIN user_requests ur ON urr.booking_id = ur.booking_id
    WHERE ur.provider_id = ?
  `;
  const [ratingRows] = await db.execute(avgRatingQuery, [provider_id]);

  const average_rating = parseFloat(ratingRows[0].average_rating ?? 0).toFixed(2);
  const rating_count = ratingRows[0].rating_count;

  // Update the provider's rating in providers table
  const updateQuery = `
    UPDATE providers 
    SET 
      rating = ?,
      rating_count = ?
    WHERE id = ?
  `;
  await db.execute(updateQuery, [average_rating, rating_count, provider_id]);

  return { average_rating, rating_count };
};

exports.getUserRating = async (booking_id) => {
  const query = `SELECT user_rating, user_comment, booking_id
FROM 
  user_request_ratings 
  WHERE booking_id = ?;`;
  const [rows] = await db.execute(query, [booking_id]);
  return rows;
};

exports.getSingleService = async (id) => {
  const query = `SELECT * FROM service_types WHERE id = ? AND status = 1`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

exports.getSiteSettingsData = async () => {
  const query = `SELECT * FROM settings`;
  const [rows] = await db.execute(query, []);
  return rows;
};
