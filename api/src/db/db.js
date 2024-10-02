import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db_app = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false },
  max: 10, // Pool size
  idleTimeoutMillis: 30000,
});

db_app
  .connect()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("⛔ Error connecting to database: ", err));

export default db_app;
