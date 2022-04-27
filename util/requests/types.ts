export enum RequestType {
  REFINING = 'refining',
  MANUFACTURING = 'manufacturing',
  DISTRIBUTING = 'distributing',
}

export type Item = string;
export type Category = string;
export enum Priority {
  LOW = '4. Low Priority',
  MEDIUM = '3. Med Priority',
  HIGH = '2. High Priority',
  CRITICAL = '1. MISSION CRITICAL',
}

export interface RefiningRequest {
  rowNum: number;

  item: Item;
  quantity: number;
  category: Category;
  refineryZone: string;
  region: string;
  coordinates: string;
  acceptedBy: string;
  completed: boolean;
  requiredSalvage: number;
  requiredComponents: number;
  requiredSulfur: number;
  requiredCrudeOil: number;
  requiredAluminium: number;
  requiredIron: number;
  requiredCopper: number;
  craftTime: string;
  confirmed: boolean;
  timeCompleted: number;
  timeRequested: number;
  timeAccepted: number;
  id: string;
}

export interface ManufacturingRequest {
  rowNum: number;

  item: Item;
  quantity: number;
  category: Category;
  requester: string;
  deliveryLocation: string;
  deliveryRegion: string;
  deliveryZone: string;
  priority: Priority;
  acceptedBy: string;
  completed: boolean;
  requiredBuildingMaterials: number;
  requiredExplosiveMaterials: number;
  requiredRefinedMaterials: number;
  requiredHeavyExplosiveMaterials: number;
  craftTime: string;
  confirmed: boolean;
  timeRequested: number;
  timeAccepted: number;
  timeCompleted: number;
  id: string;
}

export interface DeliveryRequest {
  rowNum: number;

  item: Item;
  quantity: number;
  category: Category;
  requester: string;
  pickupLocation: string;
  pickupRegion: string;
  pickupZone: string;
  deliveryLocation: string;
  deliveryRegion: string;
  deliveryZone: string;
  priority: Priority;
  acceptedBy: string;
  completed: boolean;
  confirmed: boolean;
  timeRequested: number;
  timeAccepted: number;
  timeCompleted: number;
  id: string;
}

export type Request = RefiningRequest | ManufacturingRequest | DeliveryRequest;
