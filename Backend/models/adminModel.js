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

//------> REGISTER & LOGIN

exports.registerAdmin = async (name, email, password) => {
  try {
    // Insert into the providers table
    const query = `INSERT INTO admins (name, email, password, created_at) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(query, [
      name,
      email,
      password,
      getCurrentDateTime(),
    ]);

    return result;
  } catch (error) {
    throw error;
  }
};

exports.findAdminByEmail = async (email) => {
  const query = `SELECT * FROM admins WHERE email = ?`;
  const [rows] = await db.execute(query, [email]);
  return rows.length ? rows[0] : null;
};

exports.updatePasswordByEmail = async (email, newPassword) => {
  const query = `UPDATE admins SET password = ? where email = ?`;
  const [rows] = await db.execute(query, [newPassword, email]);
  return rows;
};

//-----> MEMBERS

// USERS
exports.getUserDetails = async () => {
  const query = `SELECT id,first_name, last_name, email, picture, mobile, wallet_balance, rating FROM users `;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.editUser = async (id, params, picture) => {
  const { first_name, last_name, mobile } = params;

  const updated_at = getCurrentDateTime();

  let query;
  let values;

  if (picture) {
    query = `UPDATE users SET first_name = ?, last_name = ?, picture=?, mobile = ?, updated_at = ? WHERE id = ?`;
    values = [first_name, last_name, picture, mobile, updated_at, id];
  } else {
    query = `UPDATE users SET first_name = ?, last_name = ?,mobile = ?, updated_at = ? WHERE id = ?`;
    values = [first_name, last_name, mobile, updated_at, id];
  }
  const [rows] = await db.execute(query, values);
  return rows;
};

exports.deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

exports.findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await db.execute(query, [email]);
  return rows.length ? rows[0] : null;
};

exports.createUser = async (
  first_name,
  last_name,
  email,
  hashedPassword,
  picture,
  mobile
) => {
  const created_at = getCurrentDateTime();

  let query;
  let values;

  if (picture) {
    query = `INSERT INTO users (first_name, last_name, email, password, picture, mobile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    values = [
      first_name,
      last_name,
      email,
      hashedPassword,
      picture,
      mobile,
      created_at,
    ];
  } else {
    query = `INSERT INTO users (first_name, last_name, email, password, mobile, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    values = [first_name, last_name, email, hashedPassword, mobile, created_at];
  }

  const [rows] = await db.execute(query, values);
  return rows;
};

exports.getUserRequestData = async (id) => {
  const query = `SELECT 
   ur.*, 
    st.name AS service_name,
     st.price AS hourly_rate,
       st.fixed AS base_price,
       urr.user_rating, 
    urr.user_comment, 
    u.first_name AS user_first_name, 
    u.last_name AS user_last_name, 
    p.first_name AS provider_first_name, 
    p.last_name AS provider_last_name,
     urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings
FROM 
    user_requests ur
LEFT JOIN 
    service_types st ON st.id = ur.service_type_id
LEFT JOIN 
    user_request_ratings urr ON urr.booking_id = ur.booking_id
LEFT JOIN 
    users u ON u.id = ur.user_id
LEFT JOIN 
    providers p ON p.id = ur.provider_id
    LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
WHERE 
    u.id = ?;
`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

// PROVIDERS
exports.getProviderDetails = async () => {
  const query = `SELECT 
    p.id,
    p.first_name, 
    p.last_name, 
    p.email,
    p.mobile,
    p.status as providerStatus,
    p.avatar,
    ps.status,
    SUM( ur.status IN ('ACCEPTED', 'COMPLETED')) AS accepted_requests,
    SUM(ur.status = 'CANCELLED' AND ur.cancelled_by = 'PROVIDER' ) AS cancelled_requests
FROM 
    providers p
LEFT JOIN 
    provider_services ps ON p.id = ps.provider_id
LEFT JOIN 
   user_requests ur ON p.id = ur.provider_id
GROUP BY 
    p.id, p.first_name, p.last_name, p.email, ps.status;
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.editProvider = async (id, params, avatar) => {
  const { first_name, last_name, mobile } = params;

  const updated_at = getCurrentDateTime();

  let query;
  let values;

  if (avatar) {
    query = `UPDATE providers SET first_name = ?, last_name = ?, avatar=?, mobile = ?, updated_at = ? WHERE id = ?`;
    values = [first_name, last_name, avatar, mobile, updated_at, id];
  } else {
    query = `UPDATE providers SET first_name = ?, last_name = ?,mobile = ?, updated_at = ? WHERE id = ?`;
    values = [first_name, last_name, mobile, updated_at, id];
  }
  const [rows] = await db.execute(query, values);
  return rows;
};

exports.deleteProvider = async (id) => {
  const query = `DELETE FROM providers WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

exports.findProviderByEmail = async (email) => {
  const query = `SELECT * FROM providers WHERE email = ?`;
  const [rows] = await db.execute(query, [email]);
  return rows.length ? rows[0] : null;
};

exports.createProvider = async (
  first_name,
  last_name,
  email,
  hashedPassword,
  avatar,
  mobile
) => {
  const created_at = getCurrentDateTime();

  let query;
  let values;

  if (avatar) {
    query = `INSERT INTO providers (first_name, last_name, email, password, avatar, mobile, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    values = [
      first_name,
      last_name,
      email,
      hashedPassword,
      avatar,
      mobile,
      created_at,
    ];
  } else {
    query = `INSERT INTO providers (first_name, last_name, email, password, mobile, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    values = [first_name, last_name, email, hashedPassword, mobile, created_at];
  }

  const [rows] = await db.execute(query, values);
  return rows;
};

exports.getProviderRequestData = async (id) => {
  const query = `SELECT 
    ur.*,
    st.name AS service_name,
     st.price AS hourly_rate,
       st.fixed AS base_price,
    urr.user_rating, 
    urr.user_comment, 
    u.first_name AS user_first_name, 
    u.last_name AS user_last_name, 
    p.first_name AS provider_first_name, 
    p.last_name AS provider_last_name,
 urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings,
    urp.total AS total,
    urp.provider_earnings AS provider_earning
FROM 
    user_requests ur
LEFT JOIN 
    service_types st ON st.id = ur.service_type_id
LEFT JOIN 
    user_request_ratings urr ON urr.booking_id = ur.booking_id
LEFT JOIN 
    users u ON u.id = ur.user_id
LEFT JOIN 
    providers p ON p.id = ur.provider_id
LEFT JOIN 
    user_request_payments urp ON urp.request_id = ur.id
WHERE 
    p.id = ?;
`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

// PROVIDER DOCUMENTS AND SERVICES ALLOCATION RELATED

exports.getAllServices = async () => {
  const query = `SELECT * FROM service_types`;

  const [rows] = await db.execute(query, []);
  return rows;
};

exports.serviceAllocation = async (values) => {
  const { provider_id, service_type_id } = values;
  const query = `INSERT INTO provider_services (provider_id, service_type_id, created_at) VALUES (?, ?, ?)`;
  const [rows] = await db.execute(query, [
    provider_id,
    service_type_id,
    getCurrentDateTime(),
  ]);
  return rows;
};

exports.getServicesById = async (provider_id) => {
  const query = `SELECT ps.provider_id, ps.service_type_id, st.name FROM provider_services ps LEFT JOIN service_types st ON st.id =  ps.service_type_id WHERE provider_id = ?`;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.deleteAllocatedService = async (provider_id, service_type_id) => {
  const query = `DELETE FROM provider_services WHERE provider_id = ? AND service_type_id = ?`;
  const [rows] = await db.execute(query, [provider_id, service_type_id]);
  return rows;
};

exports.getProviderAllocatedService = async () => {
  const query = ` SELECT * FROM provider_services `;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.setProviderStatus = async (id, status) => {
  const query = `UPDATE providers SET status = ? WHERE id = ?`;
  const [rows] = await db.execute(query, [status, id]);
  return rows;
};

// DOCUMENTS

exports.getUploadedDocument = async (provider_id) => {
  const query = `SELECT pd.*, d.name AS document_name, d.type AS document_type
FROM provider_documents pd
INNER JOIN documents d ON pd.document_id = d.id
WHERE pd.provider_id = ? `;
  const [rows] = await db.execute(query, [provider_id]);
  return rows;
};

exports.setDocumentStatus = async (provider_id, document_id, status) => {
  const query = `UPDATE provider_documents SET status = ? WHERE provider_id = ? AND document_id = ? `;
  const [rows] = await db.execute(query, [status, provider_id, document_id]);
  return rows;
};
//----->  General

// Service Types

exports.createServiceType = async (
  name,
  provider_name,
  image,
  fixed,
  price
) => {
  const created_at = getCurrentDateTime();

  let query;
  let values;

  if (image) {
    query = `INSERT INTO service_types (name, provider_name, image, fixed, price, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    values = [name, provider_name, image, fixed, price, created_at];
  } else {
    query = `INSERT INTO service_types (name, provider_name, fixed, price, created_at) VALUES (?, ?, ?, ?, ?)`;
    values = [name, provider_name, fixed, price, created_at];
  }

  const [rows] = await db.execute(query, values);
  return rows;
};

exports.deleteService = async (id) => {
  const query = `DELETE FROM service_types WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

exports.editService = async (id, params, image) => {
  const { name, provider_name, fixed, price, status } = params;

  const updated_at = getCurrentDateTime();

  let query;
  let values;

  if (image) {
    query = `UPDATE service_types SET name = ?, provider_name = ?, image = ?, fixed = ?, price = ?, status = ?, updated_at = ? WHERE id = ?`;
    values = [name, provider_name, image, fixed, price, status, updated_at, id];
  } else {
    query = `UPDATE service_types SET name = ?, provider_name = ?,  fixed = ?, price = ?, status = ?, updated_at = ? WHERE id = ?`;
    values = [name, provider_name, fixed, price, status, updated_at, id];
  }
  const [rows] = await db.execute(query, values);
  return rows;
};

// Documents

exports.getAllDocuments = async () => {
  const query = `SELECT * FROM documents`;

  const [rows] = await db.execute(query, []);
  return rows;
};

exports.createDocuments = async (name, type) => {
  const created_at = getCurrentDateTime();

  const query = `INSERT INTO documents (name, type, created_at) VALUES (?, ?, ?)`;
  const values = [name, type, created_at];

  const [rows] = await db.execute(query, values);
  return rows;
};

exports.editDocuments = async (id, params) => {
  const { name, type } = params;

  const updated_at = getCurrentDateTime();

  const query = `UPDATE documents SET name = ?, type = ?, updated_at = ? WHERE id = ?`;
  const values = [name, type, updated_at, id];

  const [rows] = await db.execute(query, values);
  return rows;
};
exports.deleteDocuments = async (id) => {
  const query = `DELETE FROM documents WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows;
};

//----->  Services

// Services History

exports.getAllRequestData = async () => {
  const query = `SELECT 
  ur.*,
    st.name AS service_name,
    st.price AS hourly_rate,
       st.fixed AS base_price,
    urr.user_rating, 
    urr.user_comment, 
    u.first_name AS user_first_name, 
    u.last_name AS user_last_name, 
    p.first_name AS provider_first_name, 
    p.last_name AS provider_last_name,
     urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings
FROM 
    user_requests ur
LEFT JOIN 
    service_types st ON st.id = ur.service_type_id
LEFT JOIN 
    user_request_ratings urr ON urr.booking_id = ur.booking_id
LEFT JOIN 
     users u ON u.id = ur.user_id
LEFT JOIN 
     providers p ON p.id = ur.provider_id
      LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
    WHERE ur.schedule_at IS NULL;
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getAllScheduleRequestData = async () => {
  const query = `SELECT 
  ur.*,
    st.name AS service_name,
    st.price AS hourly_rate,
       st.fixed AS base_price,
    urr.user_rating, 
    urr.user_comment, 
    u.first_name AS user_first_name, 
    u.last_name AS user_last_name, 
    p.first_name AS provider_first_name, 
    p.last_name AS provider_last_name,
     urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings
FROM 
    user_requests ur
LEFT JOIN 
    service_types st ON st.id = ur.service_type_id
LEFT JOIN 
    user_request_ratings urr ON urr.booking_id = ur.booking_id
LEFT JOIN 
     users u ON u.id = ur.user_id
LEFT JOIN 
     providers p ON p.id = ur.provider_id
      LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
    WHERE ur.schedule_at IS Not NULL;;
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

//-----> Account

//  AccountSettings

exports.getAdminDetails = async (id) => {
  const query = `SELECT * FROM admins WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows.length ? rows[0] : null;
};

exports.editAdmin = async (id, params, picture) => {
  const { name, email, gender, mobile } = params;

  const updated_at = getCurrentDateTime();

  let query;
  let values;

  if (picture) {
    query = `UPDATE admins SET name = ?, email = ?, picture=?, gender = ?, mobile = ?, updated_at = ? WHERE id = ?`;
    values = [name, email, picture, gender, mobile, updated_at, id];
  } else {
    query = `UPDATE admins SET name = ?, email = ?,gender = ?, mobile = ?, updated_at = ?  WHERE id = ?`;
    values = [name, email, gender, mobile, updated_at, id];
  }
  const [rows] = await db.execute(query, values);
  return rows;
};

//  ChangePassword

exports.findAdminById = async (id) => {
  const query = `SELECT * FROM admins WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  return rows.length ? rows[0] : null;
};

exports.changePassword = async (id, newPassword) => {
  const query = `UPDATE admins SET password = ? where id = ?`;
  const [rows] = await db.execute(query, [newPassword, id]);
  return rows;
};

//-----> Account

// Get Card Data (Total count of all)

exports.getTotalCount = async () => {
  const query = `SELECT 
    SUM(commision) AS total_admin_earnings,
    (SELECT COUNT(*) FROM users) AS total_user,
    (SELECT COUNT(*) FROM providers) AS total_provider,
    (SELECT COUNT(*) FROM user_requests) AS total_request,
    (SELECT COUNT(*) FROM user_requests WHERE status = 'CANCELLED') AS total_cancelled_request,
    (SELECT COUNT(*) FROM user_requests WHERE status = 'COMPLETED') AS total_completed_request,
    (SELECT st.name FROM user_requests ur
     JOIN service_types st ON ur.service_type_id = st.id
     GROUP BY ur.service_type_id, st.name
     ORDER BY COUNT(ur.service_type_id) DESC
     LIMIT 1) AS most_popular_service
FROM user_request_payments
`;

  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getTopUser = async () => {
  const query = `SELECT ur.user_id, u.first_name, u.last_name, COUNT(*) AS total_request
FROM user_requests ur
JOIN users u ON ur.user_id = u.id
WHERE ur.status = 'completed'
GROUP BY ur.user_id, u.first_name, u.last_name
ORDER BY total_request DESC
LIMIT 5`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getTopProvider = async () => {
  const query = `SELECT ur.provider_id, p.first_name, p.last_name, COUNT(*) AS total_request
FROM  user_requests ur
JOIN  providers p ON ur.provider_id = p.id
WHERE ur.status = 'completed'
GROUP BY ur.provider_id, p.first_name, p.last_name
ORDER BY total_request DESC
LIMIT 5`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getUserRequestTime = async () => {
  const query = `SELECT created_at FROM user_requests`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getLetestRequestData = async () => {
  const query = `SELECT 
    ur.booking_id, 
    ur.user_id, 
    ur.provider_id, 
    ur.service_type_id, 
    ur.status, 
    ur.created_at, 
    st.name AS service_name,
    u.first_name AS user_first_name, 
    u.last_name AS user_last_name, 
    p.first_name AS provider_first_name, 
    p.last_name AS provider_last_name
FROM 
     user_requests ur
LEFT JOIN 
     service_types st ON st.id = ur.service_type_id
LEFT JOIN 
    user_request_ratings urr ON urr.booking_id = ur.booking_id
LEFT JOIN 
     users u ON u.id = ur.user_id
LEFT JOIN 
     providers p ON p.id = ur.provider_id
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getRequestCancellationRate = async () => {
  const query = `SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS month, 
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count,
    SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_count,
    SUM(CASE WHEN status IN ('PENDING', 'ACCEPTED') THEN 1 ELSE 0 END) AS pending_count
FROM user_requests
GROUP BY month
ORDER BY month;
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getTotalRevenue = async () => {
  const query = `SELECT    
	SUM(total) AS total_earning,
    SUM(commision) AS total_admin_earnings,
    SUM(provider_earnings) AS provider_earning,
    SUM(tax) AS total_tax
FROM user_request_payments;
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

//-----> Settings

//  Site Settings

exports.getSiteSettingsData = async () => {
  const query = `SELECT * FROM settings`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.editSiteSettingsData = async (key, value) => {
  const query = "UPDATE settings SET value = ? WHERE `key` = ?";

  const [rows] = await db.execute(query, [value, key]);
  return rows;
};

//-----> Statements
// OverallServiceStatements

exports.getOverallStatementsCount = async (startDate, endDate) => {
  const startDateTime = `${startDate} 00:00:00`;
  const endDateTime = `${endDate} 23:59:59`;

  const query = `SELECT 
      COUNT(*) AS total_request,
      SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) AS total_cancelled_request,
      SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS total_completed_request,
      COALESCE(SUM(urp.total), 0) AS total_revenue,
      COALESCE(SUM(urp.provider_earnings), 0) AS provider_earnings,
      COALESCE(SUM(urp.commision), 0) AS admin_commision
    FROM user_requests ur
    LEFT JOIN user_request_payments urp ON ur.id = urp.request_id
    WHERE ur.created_at BETWEEN ? AND ?`;
  const params = [startDateTime, endDateTime];
  const [rows] = await db.execute(query, params);
  return rows;
};

exports.getOverallStatementsData = async (startDate, endDate) => {
  const startDateTime = `${startDate} 00:00:00`;
  const endDateTime = `${endDate} 23:59:59`;

  const query = ` SELECT ur.*, 
       st.name AS service_name, 
       st.price AS hourly_rate,
       st.fixed AS base_price,
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       u.mobile AS user_mobile_number,
       u.email AS user_email,
	   p.first_name AS provider_first_name, 
       p.last_name AS provider_last_name,
       p.mobile AS provider_mobile_number,
       p.email AS provider_email,
       otp.otp_verified AS otp_status,
       urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings,
       urr.user_rating,
       urr.user_comment
FROM  user_requests ur
LEFT JOIN service_types st ON ur.service_type_id = st.id
LEFT JOIN users u ON u.id = ur.user_id
LEFT JOIN providers p ON p.id = ur.provider_id
LEFT JOIN service_otp_verifications otp ON otp.request_id = ur.id
LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
LEFT JOIN user_request_ratings urr ON urr.booking_id = ur.booking_id AND urr.id = (
        SELECT MAX(urr_sub.id) 
        FROM user_request_ratings urr_sub 
        WHERE urr_sub.booking_id = ur.booking_id 
    )
       WHERE ur.created_at BETWEEN ? AND ?
 ;`;
  const params = [startDateTime, endDateTime];
  const [rows] = await db.execute(query, params);
  return rows;
};

// ProviderStatements
exports.getProviderStatementsData = async () => {
  const query = ` SELECT 
    p.id AS provider_id,
    p.first_name,
    p.last_name,
    p.mobile,
    p.rating,
    p.created_at AS member_since,
    COUNT(ur.id) AS total_services,
    SUM(CASE WHEN ur.status = 'COMPLETED' THEN 1 ELSE 0 END) AS total_completed_services,
    SUM(CASE WHEN ur.status = 'CANCELLED' AND ur.cancelled_by = 'PROVIDER' THEN 1 ELSE 0 END) AS provider_cancellation,
    SUM(CASE WHEN ur.status = 'ACCEPTED' THEN 1 ELSE 0 END) AS total_pending_services,
    SUM(urp.provider_earnings) AS total_earnings
FROM providers p
LEFT JOIN user_requests ur ON ur.provider_id = p.id
LEFT JOIN user_request_payments urp ON ur.id = urp.request_id
GROUP BY p.id, p.first_name, p.last_name, p.mobile, p.rating, p.created_at
ORDER BY p.id`;
  const [rows] = await db.execute(query, []);
  return rows;
};

//Today Statement

exports.getDailyStatementsCount = async () => {
  const query = `SELECT 
  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE DATE(created_at) = CURDATE()) AS total_request,
  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE status = 'CANCELLED' AND DATE(created_at) = CURDATE()) AS total_cancelled_request,
  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE status = 'COMPLETED' AND DATE(created_at) = CURDATE()) AS total_completed_request,
  (SELECT SUM(total) 
   FROM user_request_payments 
   WHERE DATE(created_at) = CURDATE()) AS total_revenue,
  (SELECT SUM(provider_earnings) 
   FROM user_request_payments 
   WHERE DATE(created_at) = CURDATE()) AS provider_earnings,
  (SELECT SUM(commision) 
   FROM user_request_payments 
   WHERE DATE(created_at) = CURDATE()) AS admin_commision; `;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getDailyStatementsData = async () => {
  const query = ` SELECT ur.*, 
       st.name AS service_name, 
       st.price AS hourly_rate,
       st.fixed AS base_price,
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       u.mobile AS user_mobile_number,
       u.email AS user_email,
       p.first_name AS provider_first_name, 
       p.last_name AS provider_last_name,
       p.mobile AS provider_mobile_number,
       p.email AS provider_email,
       otp.otp_verified AS otp_status,
       urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings,
       urr.user_rating,
       urr.user_comment
FROM  user_requests ur
LEFT JOIN service_types st ON ur.service_type_id = st.id
LEFT JOIN users u ON u.id = ur.user_id
LEFT JOIN providers p ON p.id = ur.provider_id
LEFT JOIN service_otp_verifications otp ON otp.request_id = ur.id
LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
LEFT JOIN user_request_ratings urr ON urr.booking_id = ur.booking_id 
    AND urr.id = (
        SELECT MAX(urr_sub.id) 
        FROM user_request_ratings urr_sub 
        WHERE urr_sub.booking_id = ur.booking_id
    )
WHERE DATE(ur.created_at) = CURDATE();`;
  const [rows] = await db.execute(query, []);
  return rows;
};

// Monthly Statement

exports.getMonthlyStatementsCount = async () => {
  const query = `SELECT 
  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())) AS total_request,
  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE status = 'CANCELLED' 
     AND MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())) AS total_cancelled_request,
  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE status = 'COMPLETED' 
     AND MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())) AS total_completed_request,
  (SELECT SUM(total) 
   FROM user_request_payments 
   WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())) AS total_revenue,
  (SELECT SUM(provider_earnings) 
   FROM user_request_payments 
   WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())) AS provider_earnings,
  (SELECT SUM(commision) 
   FROM user_request_payments 
   WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())) AS admin_commision;
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getMonthlyStatementsData = async () => {
  const query = ` SELECT ur.*, 
       st.name AS service_name, 
       st.price AS hourly_rate,
       st.fixed AS base_price,
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       u.mobile AS user_mobile_number,
       u.email AS user_email,
       p.first_name AS provider_first_name, 
       p.last_name AS provider_last_name,
       p.mobile AS provider_mobile_number,
       p.email AS provider_email,
       otp.otp_verified AS otp_status,
       urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings,
       urr.user_rating,
       urr.user_comment
FROM  user_requests ur
LEFT JOIN service_types st ON ur.service_type_id = st.id
LEFT JOIN users u ON u.id = ur.user_id
LEFT JOIN providers p ON p.id = ur.provider_id
LEFT JOIN service_otp_verifications otp ON otp.request_id = ur.id
LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
LEFT JOIN user_request_ratings urr ON urr.booking_id = ur.booking_id 
    AND urr.id = (
        SELECT MAX(urr_sub.id) 
        FROM user_request_ratings urr_sub 
        WHERE urr_sub.booking_id = ur.booking_id
    )
WHERE MONTH(ur.created_at) = MONTH(CURDATE()) AND YEAR(ur.created_at) = YEAR(CURDATE())`;
  const [rows] = await db.execute(query, []);
  return rows;
};

//Yearly Statement

exports.getYearlyStatementsCount = async () => {
  const query = `SELECT 
  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE YEAR(created_at) = YEAR(CURDATE())) AS total_request,

  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE status = 'CANCELLED' 
     AND YEAR(created_at) = YEAR(CURDATE())) AS total_cancelled_request,

  (SELECT COUNT(*) 
   FROM user_requests 
   WHERE status = 'COMPLETED' 
     AND YEAR(created_at) = YEAR(CURDATE())) AS total_completed_request,

  (SELECT SUM(total) 
   FROM user_request_payments 
   WHERE YEAR(created_at) = YEAR(CURDATE())) AS total_revenue,

  (SELECT SUM(provider_earnings) 
   FROM user_request_payments 
   WHERE YEAR(created_at) = YEAR(CURDATE())) AS provider_earnings,

  (SELECT SUM(commision) 
   FROM user_request_payments 
   WHERE YEAR(created_at) = YEAR(CURDATE())) AS admin_commision;

`;
  const [rows] = await db.execute(query, []);
  return rows;
};

exports.getYearlyStatementsData = async () => {
  const query = ` SELECT ur.*, 
       st.name AS service_name, 
       st.price AS hourly_rate,
       st.fixed AS base_price,
       u.first_name AS user_first_name, 
       u.last_name AS user_last_name,
       u.mobile AS user_mobile_number,
       u.email AS user_email,
       p.first_name AS provider_first_name, 
       p.last_name AS provider_last_name,
       p.mobile AS provider_mobile_number,
       p.email AS provider_email,
       otp.otp_verified AS otp_status,
       urp.distance,
       urp.commision AS admin_commision,
       urp.time_price,
       urp.discount, urp.tax, urp.wallet, urp.total, urp.provider_earnings,
       urr.user_rating,
       urr.user_comment
FROM  user_requests ur
LEFT JOIN service_types st ON ur.service_type_id = st.id
LEFT JOIN users u ON u.id = ur.user_id
LEFT JOIN providers p ON p.id = ur.provider_id
LEFT JOIN service_otp_verifications otp ON otp.request_id = ur.id
LEFT JOIN user_request_payments urp ON urp.request_id = ur.id
LEFT JOIN user_request_ratings urr ON urr.booking_id = ur.booking_id 
    AND urr.id = (
        SELECT MAX(urr_sub.id) 
        FROM user_request_ratings urr_sub 
        WHERE urr_sub.booking_id = ur.booking_id
    )
WHERE YEAR(ur.created_at) = YEAR(CURDATE())`;
  const [rows] = await db.execute(query, []);
  return rows;
};

//-----> Details
// Ratings
exports.getRatingsData = async () => {
  const query = ` SELECT 
  urr.booking_id,
  urr.user_rating,
  urr.user_comment,
  urr.created_at AS rating_date,
  u.first_name AS user_first_name,
  u.last_name AS user_last_name,
  p.first_name AS provider_first_name,
  p.last_name AS provider_last_name
FROM user_request_ratings urr
LEFT JOIN user_requests ur ON urr.booking_id = ur.booking_id
LEFT JOIN users u ON u.id = ur.user_id
LEFT JOIN providers p ON p.id = ur.provider_id
`;
  const [rows] = await db.execute(query, []);
  return rows;
};

// Provider Location

exports.getProviderLocationData = async () => {
  const query = ` SELECT p.first_name, p.last_name, p.latitude, p.longitude, ps.status
FROM providers p
JOIN provider_services ps ON ps.provider_id = p.id
JOIN (
    SELECT provider_id, MAX(created_at) as latest_date
    FROM provider_services
    GROUP BY provider_id
) latest ON ps.provider_id = latest.provider_id AND ps.created_at = latest.latest_date;`;
  const [rows] = await db.execute(query, []);
  return rows;
};
