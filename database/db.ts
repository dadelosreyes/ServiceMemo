//import { AddressRow, NewAddress } from '@/database/models';
import * as SQLite from 'expo-sqlite';
import { MAP_FEATURES_TABLE_SCHEMA, METADATA_TABLE_SCHEMA, SYNC_QUEUE_TABLE_SCHEMA, TASKS_TABLE_SCHEMA } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export const getDb = () => {
  if (!db) {
    db = SQLite.openDatabaseSync('sms_offline.db');
  }
  return db;
};

export const initializeDatabase = () => {
  const database = getDb();
  
  // Enable modern features like Write-Ahead Logging (WAL) for concurrency,
  // and foreign keys.
  database.execSync('PRAGMA journal_mode = WAL;');
  database.execSync('PRAGMA foreign_keys = ON;');
  
  // Create our tables
  database.execSync(TASKS_TABLE_SCHEMA);
  database.execSync(SYNC_QUEUE_TABLE_SCHEMA);
  database.execSync(METADATA_TABLE_SCHEMA);
  database.execSync(MAP_FEATURES_TABLE_SCHEMA);
  
  console.log('Local SQLite Database initialized successfully.');
};

//alter table when schema changes
export const migrateData = () => {
  const db = getDb();

  db.withTransactionSync(() => {
    //add new columns
    db.execSync(`ALTER TABLE tasks ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0;`);
  });
}


//////
//db sqlite
// export const DB_NAME = 'SMS.db';

// let dbInstance: SQLite.SQLiteDatabase | null = null;

// export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
//   if (dbInstance) return dbInstance;

//   const database = await SQLite.openDatabaseAsync(DB_NAME);
//   await database.execAsync(`
//     CREATE TABLE IF NOT EXISTS addresses (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       latitude REAL,
//       longitude REAL,
//       street TEXT,
//       city TEXT,
//       region TEXT,
//       country TEXT,
//       postal_code TEXT,
//       formatted TEXT,
//       created_at TEXT DEFAULT (datetime('now'))
//     );
//   `);

//   dbInstance = database;
//   return database;
// }

// /* Insert new address*/
// export async function insertAddress(address: NewAddress): Promise<void> {
//   const database = await initDatabase();
//   await database.runAsync(
//     `INSERT INTO addresses
//       (latitude, longitude, street, city, region, country, postal_code, formatted)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       address.latitude,
//       address.longitude,
//       address.street ?? null,
//       address.city ?? null,
//       address.region ?? null,
//       address.country ?? null,
//       address.postalCode ?? null,
//       address.formatted,
//     ]
//   );
// }

// /* Return address*/
// export async function getAllAddresses(): Promise<AddressRow[]> {
//   const database = await initDatabase();
//   return database.getAllAsync<AddressRow>(
//     'SELECT * FROM addresses ORDER BY id DESC'
//   );
// }

// /* Deletes address */
// export async function deleteAddress(id: number): Promise<void> {
//   const database = await initDatabase();
//   await database.runAsync('DELETE FROM addresses WHERE id = ?', [id]);
// }

// /* Deletes all address */
// export async function clearAddresses(): Promise<void> {
//   const database = await initDatabase();
//   await database.runAsync('DELETE FROM addresses');
// }
