import * as SQLite from 'expo-sqlite';
import { TASKS_TABLE_SCHEMA, SYNC_QUEUE_TABLE_SCHEMA, METADATA_TABLE_SCHEMA, MAP_FEATURES_TABLE_SCHEMA } from './schema';

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
