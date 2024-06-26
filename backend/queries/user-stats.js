const sql = require('mssql');
const config = require('../db/config');
let pool;

async function getCustomerData(filterParams) {
  try {
    if (!pool) {
      pool = new sql.ConnectionPool(config);
      pool.on('error', err => console.error('Connection Pool Error: ', err));
      await pool.connect();
    }

    let query = `SELECT 
      [Id]
      ,[CreatedOnUtc]
      FROM [dev_pingodocs_dk_db_prod].[dbo].[Customer] WHERE [UserSubscriptionType] != 0 AND [UserSubscriptionType] != 6`;

    // Filter
    if (filterParams) {
      const {UserSubscriptionType, UserCreatedFromType, IsFreemiumPlusComplyMember, UserSubscriptionTypeNotEqual } = filterParams;
      query += ` AND 1=1`;
      if (UserSubscriptionType) query += ` AND [UserSubscriptionType] = '${UserSubscriptionType}'`;
      if (UserCreatedFromType) query += ` AND [UserCreatedFromType] = '${UserCreatedFromType}'`;
      if (IsFreemiumPlusComplyMember) query += ` AND [IsFreemiumPlusComplyMember] = '${IsFreemiumPlusComplyMember}'`;
      if (UserSubscriptionTypeNotEqual) query += ` AND [UserSubscriptionType] != '${UserSubscriptionTypeNotEqual}'`;
    }
  
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error('Failed to connect:', err);
    throw err;
  }
}

module.exports = getCustomerData;