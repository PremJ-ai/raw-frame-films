import { Pool } from "pg";
// Shared pool avoids opening a new PostgreSQL connection for every serverless request.
let pool: Pool|undefined;
export function getDb(){if(!pool){const connectionString=process.env.DATABASE_URL;if(!connectionString)throw new Error("DATABASE_URL is not configured");pool=new Pool({connectionString,ssl:process.env.NODE_ENV==="production"?{rejectUnauthorized:false}:false,max:5});}return pool;}