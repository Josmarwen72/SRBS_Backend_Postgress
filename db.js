// db.js
const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  user: "student",
  host: "dpg-d0754qs9c44c739mri4g-a.oregon-postgres.render.com",
  database: "srbsystemdb_dnoe",
  password: "k4ZkTF08OV6motFhM5yImGrmPgSsMndT",
  port: 5432,
  ssl: { rejectUnauthorized: false } // Important to prevent SSL issues on Render
});

module.exports = pool;

// (Optional) Create tables if they don't exist
async function initializeTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
      );
      
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        description TEXT
      );
      
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        resource_id INTEGER REFERENCES resources(id),
        slot TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Database tables ensured.');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}
