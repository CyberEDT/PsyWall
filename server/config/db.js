import { neon } from '@neondatabase/serverless';

/**
 * PsyWall — Neon DB Client
 * Central threat intelligence database from CyberEDT
 */
const sql = neon(process.env.NEON_DATABASE_URL);

export default sql;
