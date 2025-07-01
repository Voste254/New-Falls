import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

const {PGHOST, PGUSER, PGPASSWORD, PGDATABASE} = process.env;

//create a SQL connection using our env variables
export const sql = neon(
     `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`
);


//this sql function we export is used as a tagged template, which allow us to write SQL queries safely


//postgresql://neondb_owner:npg_Vae2MzYH5GxL@ep-long-hall-a8iagce8-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
