import { getDb } from './db';
import * as SQLite from 'expo-sqlite';

/**
 * Execute a write query (INSERT, UPDATE, DELETE) and get the run result.
 * Ideal for operations that modify the database but you don't need back rows.
 */
export const executeRun = (sqlStatement: string, args: SQLite.SQLiteBindParams = []): SQLite.SQLiteRunResult => {
  const db = getDb();
  const statement = db.prepareSync(sqlStatement);
  try {
    return statement.executeSync(args);
  } finally {
    statement.finalizeSync();
  }
};

/**
 * Executes a select query and returns all matching rows correctly typed.
 */
export const executeQuery = <T>(sqlStatement: string, args: SQLite.SQLiteBindParams = []): T[] => {
  const db = getDb();
  const statement = db.prepareSync(sqlStatement);
  try {
    const result = statement.executeSync(args);
    return result.getAllSync() as T[];
  } finally {
    statement.finalizeSync();
  }
};

/**
 * Queues an operation into the sync_queue table for background processing.
 */
export const queueSyncOperation = (
  id: string,
  entity: string,
  operation: 'CREATE' | 'UPDATE' | 'DELETE',
  payload: any | null = null
) => {
  const sql = `
    INSERT INTO sync_queue (id, entity, operation, payload, timestamp, synced)
    VALUES (?, ?, ?, ?, ?, 0)
  `;
  
  executeRun(sql, [
    id,
    entity,
    operation,
    payload ? JSON.stringify(payload) : null,
    new Date().toISOString()
  ]);
};

/**
 * Wrapper to run operations within a synchronous transaction safely.
 * This is crucial for local-first apps to ensure local state and queue inserts happen atomically.
 */
export const runInTransaction = (callback: () => void) => {
  const db = getDb();
  db.withTransactionSync(callback);
};
