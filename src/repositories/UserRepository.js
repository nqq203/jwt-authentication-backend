const pool = require('../configs/database');

class UserRepository {
  async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  async create(user) {
    const { username, fullName, email, password } = user;
    try {
      const insertQuery = {
        text: 'INSERT INTO "user" (username, "fullName", email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [username, fullName, email, password],
      };

      const result = await pool.query(insertQuery);
      return result.rows[0];
    } catch (error) {
      console.error('Error inserting new user:', error);
      throw error;
    }
  }

  async existingElement(payload) {
    const { field, value } = payload;
    const validFields = ['username', 'email', 'id'];
    if (!validFields.includes(field)) {
      throw new Error("Invalid field name");
    }
    try {
      const query = `SELECT COUNT(id) FROM "user" WHERE "${field}" = $1`;
      const result = await pool.query(query, [value]);
      return result.rows[0].count > 0;
    } catch (error) {
      console.error('Error checking for existing element:', error);
      throw error;
    }
  }
}

module.exports = new UserRepository();
