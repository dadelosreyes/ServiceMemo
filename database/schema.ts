// export const TASKS_TABLE_SCHEMA = `
//   CREATE TABLE IF NOT EXISTS tasks (
//     id TEXT PRIMARY KEY NOT NULL,
//     title TEXT NOT NULL,
//     description TEXT,
//     latitude REAL,
//     longitude REAL,
//     priority TEXT NOT NULL DEFAULT 'normal',
//     status TEXT NOT NULL DEFAULT 'pending',
//     assigned_team_id TEXT,
//     created_by TEXT NOT NULL,
//     updated_at TEXT NOT NULL,
//     deleted INTEGER NOT NULL DEFAULT 0
//   );
// `;


export const TASKS_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    acctNo INTEGER,
    acctName TEXT,
    acctAddress TEXT,
    routeId INTEGER,
    requestId INTEGER,
    requestDesc TEXT,
    endorsedBy INTEGER,
    endrosedTo INTEGER,
    remarks TEXT,
    lat REAL,
    lng REAL,
    statusId INTEGER,
    statusDesc TEXT,
    transDate TEXT,
    dateCreated TEXT DEFAULT CURRENT_TIMESTAMP,
    mobileNo TEXT,
    deviceMobileNo TEXT,
    timeElapsed INTEGER,
    priority INTEGER,
    meterSn TEXT
  );
`;

export const SYNC_QUEUE_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS sync_queue (
    id TEXT PRIMARY KEY NOT NULL,
    operation TEXT NOT NULL,
    entity TEXT NOT NULL,
    payload TEXT,
    timestamp TEXT NOT NULL,
    synced INTEGER NOT NULL DEFAULT 0
  );
`;

export const METADATA_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS metadata (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
`;

export const MAP_FEATURES_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS map_features (
    id TEXT PRIMARY KEY NOT NULL,
    geojson TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`;
