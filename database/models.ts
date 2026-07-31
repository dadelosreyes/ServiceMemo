export interface TaskType {
  id: number,
  acctNo: string,
  meterSn: any,
  contactNo: string,
  latitude: any,
  longitude: any,
  smsType: string,
  endorsedBy: string,
  endorsedTo: string,
  priority: number,
  remarks: string,
  transDate: string,
  elapsedTime: string,
  serviceMemoStatus: string,
  fromCollection: true,
  isDeleted: true
}

export interface SyncQueue {
  id: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  payload: string | null;
  timestamp: string;
  synced: boolean;
}

//sample data///
export type ItemType = {
  id: string;
  acctno: string;
  acctname: string;
  contact: string;
  address: string;
  request: string;
  date: string;
  priority: number;
  status: string;
  LM: string;
  longitude: number,
  latitude: number,
  remarks: string,
  city?:string,
};

export const sampleItems: ItemType[] = [
  { id: "1", acctno: "024458", acctname: "John Cruz", contact: "09171234567", address: "12 Sampaguita St, Angeles City", request: "Reconnection", date: "2026-04-22", priority: 1, status: "NEW", LM: "Alex Morgan", latitude: 14.942500602476914, longitude:120.2181571547602, remarks: "Provide written feedback on the three submitted concepts." },
  { id: "2", acctno: "023158", acctname: "Maria Santos", contact: "09987654321", address: "90 National Highway, Bataan", request: "Disconnection", date: "2026-04-25", priority: 2, status: "RE-ENDORSED", LM: "John Doe", latitude: 15.06262808294542, longitude: 120.06934933160997, remarks: "Provide written feedback on the three submitted concepts." },
  { id: "3", acctno: "022358", acctname: "Kevin Reyes", contact: "09223334444", address: "78 Kalaklan Rd, Zambales", request: "Check wiring", date: "2026-04-29", priority: 1, status: "ACCOMPLISHED", LM: "Michael", latitude: 15.060727731860686, longitude: 120.06283583466036, remarks: "Provide written feedback on the three submitted concepts." },
  { id: "4", acctno: "026258", acctname: "Angela Dizon", contact: "09175556666", address: "45 Gordon Ave, Subic", request: "Reconnection", date: "2026-04-23", priority: 2, status: "NEW", LM: "Sarah Jane Smith", latitude: 15.219540665252637, longitude: 120.02578874406032, remarks: "Provide written feedback on the three submitted concepts." },
  { id: "5", acctno: "023458", acctname: "Mark Flores", contact: "09334445555", address: "123 Rizal St, Olongapo City", request: "Relocation", date: "2026-04-22", priority: 3, status: "PENDING", LM: "Jay Alcantara", latitude: 14.892169112970304, longitude: 120.23664887296361, remarks: "Provide written feedback on the three submitted concepts." },
]


