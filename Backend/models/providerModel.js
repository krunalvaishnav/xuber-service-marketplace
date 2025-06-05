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

exports.createProvider = async (first_name, last_name, email, password) => {
  try {
    // Insert into the providers table
    const query = `INSERT INTO providers (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [
      first_name,
      last_name,
      email,
      password,
      getCurrentDateTime(),
    ]);

    const providerId = result.insertId;
    const profileQuery = `INSERT INTO provider_profiles (provider_id, created_at) VALUES (?, ?)`;
    await db.execute(profileQuery, [providerId, getCurrentDateTime()]);

    return result;
  } catch (error) {
    throw error;
  }
};

exports.findProviderByEmail = async (email) => {
  const query = `SELECT * FROM providers WHERE email = ?`;
  const [rows] = await db.execute(query, [email]);
  return rows.length ? rows[0] : null;
};

exports.updatePasswordByEmail = async (email, newPassword) => {
  const query = `UPDATE providers SET password = ? where email = ?`;
  const [rows] = await db.execute(query, [newPassword, email]);
  return rows;
};

exports.getProviderDetails = async (providerId) => {
  const query = `SELECT p.first_name, p.last_name, p.mobile, p.avatar, p.description, p.rating, p.status, pp.language, pp.address FROM providers p LEFT JOIN provider_profiles pp ON p.id = pp.provider_id WHERE p.id = ?`;

  const [rows] = await db.execute(query, [providerId]);
  return rows.length ? rows[0] : null;
};

exports.updateProviderDetails = async (params, provider_id, avatar) => {
  const { first_name, last_name, mobile, description, language, address } =
    params;

  const updated_at = getCurrentDateTime();

  let query;
  let values;

  // If a new avatar is provided, update it. Otherwise, leave the existing one.
  if (avatar) {
    query = `UPDATE providers p
    LEFT JOIN provider_profiles pp 
    ON p.id = pp.provider_id
    SET 
      p.first_name = ?,
      p.last_name = ?,
      p.mobile = ?,
      p.avatar = ?,
      p.description = ?,
      pp.language = ?,
      pp.address = ?,
      p.updated_at = ?,
      pp.updated_at = ?
    WHERE p.id = ?;`;

    values = [
      first_name,
      last_name,
      mobile,
      avatar,
      description,
      language,
      address,
      updated_at,
      updated_at,
      provider_id,
    ];
  } else {
    query = `UPDATE providers p
    LEFT JOIN provider_profiles pp 
    ON p.id = pp.provider_id
    SET 
      p.first_name = ?,
      p.last_name = ?,
      p.mobile = ?,
      p.description = ?,
      pp.language = ?,
      pp.address = ?,
      p.updated_at = ?,
      pp.updated_at = ?
    WHERE p.id = ?;`;

    values = [
      first_name,
      last_name,
      mobile,
      description,
      language,
      address,
      updated_at,
      updated_at,
      provider_id,
    ];
  }

  const [rows] = await db.execute(query, values);
  return rows;
};

exports.updateLocation = async (latitude, longitude, id) => {
  const [existingValue] = await db.execute(
    "SELECT latitude, longitude FROM hexainfosoft_urban.providers WHERE id = ?",
    [id]
  );

  let query;
  let values;
  if (existingValue.length === 0) {
    query = `INSERT INTO providers (latitude, longitude)VALUES(?, ?)`;
    values = [latitude, longitude, id];
  } else {
    query = ` UPDATE providers SET latitude = ?, longitude = ? WHERE id = ?`;
    values = [latitude, longitude, id];
  }

  const [rows] = await db.execute(query, values);
  return rows;
};

exports.getLocationData = async (id) => {
  const query = `SELECT id, latitude, longitude FROM providers WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

exports.findProviderById = async (id) => {
  const query = `SELECT * FROM providers WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows.length ? rows[0] : null;
};
exports.changePassword = async (id, newPassword) => {
  const query = `UPDATE providers SET password = ? where id = ?`;
  const [rows] = await db.execute(query, [newPassword, id]);
  return rows;
};

exports.provider_online_offline_status = async (status, provider_id) => {
  const updated_at = getCurrentDateTime();
  const created_at = getCurrentDateTime();
  // const query = `INSERT INTO provider_services (status, provider_id,created_at) VALUES (?, ?,?)`;
  const [existingProviderId] = await db.execute(
    "SELECT * FROM provider_services WHERE provider_id = ?",
    [provider_id]
  );
  let query;
  let values;
  if (existingProviderId.length === 0) {
    query = `INSERT INTO provider_services (status, provider_id,created_at) VALUES (?, ?,?)`;
    values = [status, provider_id, created_at];
  } else {
    query = ` UPDATE provider_services SET status = ?, updated_at = ? WHERE provider_id = ?`;
    values = [status, updated_at, provider_id];
  }

  const [rows] = await db.execute(query, values);
  return rows;
};

exports.get_provider_online_offline_status = async (provider_id) => {
  const query = `SELECT * FROM provider_services WHERE provider_id = ?`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows.length ? rows[0] : null;
};

exports.get_service_providing_by_id = async (provider_id) => {
  const query = `SELECT ps.provider_id, ps.service_type_id, st.name FROM hexainfosoft_urban.provider_services ps LEFT JOIN hexainfosoft_urban.service_types st ON st.id =  ps.service_type_id WHERE provider_id = ? `;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.getAllDocumentsType = async () => {
  const query = `select * from documents`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.uploadDocument = async (document_id, provider_id, url, unique_id) => {
  const created_at = getCurrentDateTime();
  const updated_at = getCurrentDateTime();

  let checkQuery = `SELECT id FROM provider_documents WHERE provider_id = ? AND document_id = ?`;
  let checkValues = [provider_id, document_id];

  const [existingRows] = await db.execute(checkQuery, checkValues);

  if (existingRows.length > 0) {
    let updateQuery = `
        UPDATE provider_documents 
        SET url = ?, updated_at = ? 
        WHERE provider_id = ? AND document_id = ?`;
    let updateValues = [url, updated_at, provider_id, document_id];

    await db.execute(updateQuery, updateValues);
    return { message: "Document updated successfully" };
  } else {
    let insertQuery = `
        INSERT INTO provider_documents 
        (provider_id, document_id, url, unique_id, created_at) 
        VALUES (?, ?, ?, ?, ?)`;
    let insertValues = [provider_id, document_id, url, unique_id, created_at];
    await db.execute(insertQuery, insertValues);
    return { message: "Document inserted successfully" };
  }
};

exports.getUploadedDocument = async (provider_id) => {
  const query = `SELECT * FROM hexainfosoft_urban.provider_documents WHERE provider_id = ? `;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.getSiteSettingsData = async () => {
  const query = `SELECT * FROM settings`;
  const [rows] = await db.execute(query, []);
  return rows;
};

// UPCOMING SERVICE PAGE

// PENDING SERVICE PAGE
exports.getRequestData = async (providerId) => {
  const query = `SELECT ur.*, 
       st.name AS service_type_name, 
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       st.fixed AS fixed_price,
       st.price AS hourly_price
FROM user_requests ur
JOIN service_types st ON ur.service_type_id = st.id
JOIN users u ON u.id = ur.user_id
WHERE ur.status = 'PENDING'
AND (
    ur.rejected_providers IS NULL 
    OR ur.rejected_providers = ''
    OR NOT JSON_OVERLAPS(JSON_ARRAY(${providerId}), 
    CAST(CONCAT('[', ur.rejected_providers, ']') AS JSON))
)`;
  const [rows] = await db.execute(query);
  return rows;
};

exports.getProviderStatusAndService = async (provider_id) => {
  const query = ` SELECT ps.*, p.status AS provider_status  FROM provider_services ps LEFT JOIN providers p ON p.id = ps.provider_id WHERE ps.provider_id = ?;`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.rejectServiceByProviders = async (provider_id, booking_id) => {
  const selectQuery = `SELECT rejected_providers FROM user_requests WHERE booking_id = ?`;
  const [rows] = await db.execute(selectQuery, [booking_id]);

  let updatedProviders = provider_id.toString(); // Convert to string for concatenation

  if (rows.length > 0 && rows[0].rejected_providers) {
    const existingProviders = rows[0].rejected_providers.split(",");

    if (!existingProviders.includes(provider_id.toString())) {
      existingProviders.push(provider_id);
      updatedProviders = existingProviders.join(",");
    } else {
      updatedProviders = rows[0].rejected_providers; // Keep existing value if duplicate
    }
  }

  // Update with the modified rejected_providers
  const updateQuery = `UPDATE user_requests SET rejected_providers = ? WHERE booking_id = ?`;
  const [result] = await db.execute(updateQuery, [
    updatedProviders,
    booking_id,
  ]);
  return result;
};

exports.acceptService = async (provider_id, booking_id) => {
  const query = `UPDATE user_requests ur
JOIN providers p ON p.id = ? 
SET ur.provider_id = ?, 
    ur.status = 'ACCEPTED', 
    ur.s_latitude = p.latitude,
     ur.s_longitude = p.longitude  
WHERE ur.booking_id = ?`;
  const [rows] = await db.execute(query, [
    provider_id,
    provider_id,
    booking_id,
  ]);
  return rows;
};

// ACCEPTED SERVICE PAGE

exports.getAcceptedRequestData = async (provider_id) => {
  const query = `SELECT ur.*, 
       st.name AS service_type_name, 
       st.price AS hourly_rate,
       st.fixed AS base_price,
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       u.mobile AS user_mobile_number,
       u.email AS user_email,
       otp.otp_verified AS otp_status
FROM user_requests ur
JOIN service_types st ON ur.service_type_id = st.id
JOIN users u ON u.id = ur.user_id
LEFT JOIN service_otp_verifications otp ON otp.request_id = ur.id
WHERE ur.status = 'ACCEPTED' 
AND ur.provider_id = ?`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.startService = async (booking_id) => {
  const query = `UPDATE user_requests SET started_at = ? WHERE booking_id = ?`;
  const [rows] = await db.execute(query, [getCurrentDateTime(), booking_id]);
  return rows;
};
exports.endService = async (booking_id) => {
  const query = `UPDATE user_requests SET finished_at = ? WHERE booking_id = ?`;
  const [rows] = await db.execute(query, [getCurrentDateTime(), booking_id]);
  return rows;
};

exports.cancelService = async (bookingId) => {
  const query = `UPDATE user_requests 
    SET status = 'CANCELLED', cancelled_by = 'PROVIDER', updated_at = ?
    WHERE booking_id = ?  `;

  const [rows] = await db.execute(query, [getCurrentDateTime(), bookingId]);

  return rows;
};

exports.complateService = async (
  request_id,
  payment_mode,
  fixed,
  time_price,
  tax,
  total,
  distance,
  commision,
  provider_earnings
) => {
  try {
    await db.query("START TRANSACTION");

    const paymentQuery = `
      INSERT INTO user_request_payments 
      (request_id, payment_mode, fixed, time_price, tax, total, distance,commision, provider_earnings, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [paymentResult] = await db.execute(paymentQuery, [
      request_id,
      payment_mode,
      fixed,
      time_price,
      tax,
      total,
      distance,
      commision,
      provider_earnings,
      getCurrentDateTime(),
    ]);

    const requestUpdateQuery = `
      UPDATE user_requests 
      SET status = ?, payment_mode = ?, paid = ?, updated_at = ? 
      WHERE id = ?
    `;
    await db.execute(requestUpdateQuery, [
      "completed",
      payment_mode,
      1,
      getCurrentDateTime(),
      request_id,
    ]);

    await db.query("COMMIT");
    return paymentResult;
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};

exports.findOtpDetailsByUserId = async (user_id, request_id) => {
  const query = `SELECT * FROM service_otp_verifications WHERE user_id = ? AND request_id = ? `;
  const [rows] = await db.execute(query, [user_id, request_id]);
  return rows.length > 0 ? rows[0] : null;
};

exports.addOtpDetails = async ({
  request_id,
  user_email,
  user_id,
  provider_id,
  otp,
}) => {
  const query = `INSERT INTO service_otp_verifications (request_id, user_email, user_id, provider_id, otp, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
  await db.execute(query, [
    request_id,
    user_email,
    user_id,
    provider_id,
    otp,
    getCurrentDateTime(),
  ]);
};

exports.updateOtpByUserId = async (request_id, user_id, otp, status) => {
  const query = `UPDATE service_otp_verifications SET request_id = ?, otp = ?, otp_verified = ? ,updated_at = ? WHERE user_id = ? AND request_id = ? `;
  await db.execute(query, [
    request_id,
    otp,
    status,
    getCurrentDateTime(),
    user_id,
    request_id,
  ]);
};

exports.updateOtpStatus = async (user_id, request_id, status) => {
  const query = `UPDATE service_otp_verifications SET otp_verified = ? WHERE request_id = ? AND user_id = ?`;
  const [rows] = await db.execute(query, [status, request_id, user_id]);

  return rows;
};

// COMPLATED SERVICE PAGE

exports.getComplatedRequestData = async (provider_id) => {
  const query = `SELECT ur.*, 
       st.name AS service_type_name, 
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
WHERE ur.status = 'COMPLETED' 
AND ur.provider_id = ?`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};
// CANCELLED SERVICE PAGE
exports.getCancelledRequestData = async (provider_id) => {
  const query = `SELECT ur.*, 
       st.name AS service_type_name, 
       st.price AS hourly_rate,
       st.fixed AS base_price,
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       u.mobile AS user_mobile_number,
       u.email AS user_email,
       urr.user_rating,
       urr.user_comment
FROM user_requests ur
LEFT JOIN service_types st ON ur.service_type_id = st.id
LEFT JOIN users u ON u.id = ur.user_id
LEFT JOIN user_request_ratings urr ON urr.booking_id = ur.booking_id AND urr.id = (
        SELECT MAX(urr_sub.id) 
        FROM user_request_ratings urr_sub 
        WHERE urr_sub.booking_id = ur.booking_id
    )
WHERE ur.status = 'CANCELLED' AND cancelled_by = 'PROVIDER'
AND ur.provider_id = ?;`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

// Partner Earning

exports.getTotalProviderEarning = async (provider_id) => {
  const query = `SELECT 
    SUM(urp.provider_earnings) AS total_provider_earnings
FROM 
    user_request_payments urp
JOIN 
    user_requests ur ON urp.request_id = ur.id
WHERE 
    ur.provider_id = ?
GROUP BY 
    ur.provider_id;`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.getProviderServiceCount = async (provider_id) => {
  const query = `SELECT 
    (SELECT COUNT(*) FROM user_requests where provider_id = ? AND DATE(finished_at) = CURRENT_DATE AND status = 'COMPLETED') AS services_completed_today,
    (SELECT COUNT(*) FROM user_requests  where provider_id = ? AND status = 'COMPLETED') AS total_complated_services,
    (SELECT COUNT(*) FROM user_requests where provider_id = ? AND status = 'CANCELLED' AND cancelled_by = 'PROVIDER') AS provider_cancellation,
    (SELECT COUNT(*) FROM user_requests  where provider_id = ? ) AS total_services;`;
  const [rows] = await db.execute(query, [
    provider_id,
    provider_id,
    provider_id,
    provider_id,
  ]);
  return rows;
};

exports.getDailyServiceData = async (provider_id) => {
  const query = `SELECT ur.*, 
       st.name AS service_type_name, 
       urp.distance,
       urp.total, urp.provider_earnings
FROM user_requests ur
LEFT JOIN service_types st ON ur.service_type_id = st.id
LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
WHERE ur.provider_id = ?  AND DATE(ur.created_at) = CURRENT_DATE`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.getWeeklyServiceCount = async (provider_id) => {
  const query = `SELECT SUM(urp.provider_earnings) AS total_provider_earnings ,  COUNT(ur.id) AS total_services, COUNT(CASE WHEN ur.status = 'completed' THEN ur.id END) AS total_completed_services
FROM user_requests ur
LEFT JOIN user_request_payments urp 
    ON urp.request_id = ur.id
WHERE ur.provider_id = ?  
AND YEARWEEK(ur.created_at, 1) = YEARWEEK(NOW(), 1) 
GROUP BY ur.provider_id;`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.getWeeklyServiceEarningData = async (provider_id) => {
  const query = `SELECT DATE(ur.created_at) AS date, 
    SUM(urp.provider_earnings) AS total_provider_earnings
FROM user_requests ur
LEFT JOIN user_request_payments urp 
    ON urp.request_id = ur.id
WHERE ur.provider_id = ?
AND YEARWEEK(ur.created_at, 1) = YEARWEEK(NOW(), 1) GROUP BY DATE(ur.created_at)
ORDER BY DATE(ur.created_at);`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};


exports.getProviderServiceLocation = async(provider_id)=>{
  const query = `SELECT latitude, longitude FROM providers where id = ?`;
const [rows] = await db.execute(query, [provider_id]);
return rows;
}