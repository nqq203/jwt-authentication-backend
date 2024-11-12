const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../../.env' });

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_NAME);

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function insertUser(username, fullName, email, password, avatar) {
  const hashedPassword = await hashPassword(password);
  const query = {
    text: 'INSERT INTO "user" (username, "fullName", email, password, avatar) VALUES ($1, $2, $3, $4, $5)',
    values: [username, fullName, email, hashedPassword, avatar],
  };

  try {
    const res = await pool.query(query);
    console.log(`User added: ${username}`);
  } catch (err) {
    console.error(err.stack);
  }
}

async function main() {
  await insertUser('john_doe', 'John Doe', 'john.doe@example.com', 'Abcd@1234', 'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg');
  await insertUser('jane_doe', 'Jane Doe', 'jane.doe@example.com', 'Abcd@1234', 'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg');
  await insertUser('user1', 'Nguyen Van A', 'user1@example.com', 'Abcd@1234', 'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg');
  await insertUser('user2', 'Nguyen Van B', 'user2@example.com', 'Abcd@1234', 'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg');
  await insertUser('user3', 'Nguyen Van C', 'user3@example.com', 'Abcd@1234', 'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg');

  await pool.end(); // Close the pool connection after all inserts are done
}

main();
