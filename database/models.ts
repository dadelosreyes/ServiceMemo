
export interface Task {
  id: number
  acctNo: number
  acctName: string
  acctAddress: string
  routeId: number
  requestId: number
  requestDesc: string
  endorsedBy: number
  endrosedTo: number
  remarks: string
  lat: any
  lng: any
  statusId: number
  statusDesc: string
  transDate: string
  dateCreated: any
  mobileNo: string
  deviceMobileNo: any
  timeElapsed: number
  priority: number
  meterSn: any
}

export interface SyncQueue {
  id: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  payload: string | null;
  timestamp: string;
  synced: boolean;
}

