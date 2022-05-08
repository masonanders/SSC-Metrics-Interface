import { Category, ItemName, RawResource } from './items.types';

export enum RequestType {
  REFINING = 'refining',
  MANUFACTURING = 'manufacturing',
  DISTRIBUTING = 'distributing',
}

export enum Priority {
  LOW = '4. Low Priority',
  MEDIUM = '3. Med Priority',
  HIGH = '2. High Priority',
  CRITICAL = '1. MISSION CRITICAL',
}

export interface RefiningRequest {
  rowNum: number;

  item: ItemName;
  quantity: number;
  category: RawResource;
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
  timeCompleted: string;
  timeRequested: string;
  timeAccepted: string;
  id: string;
}

export type RefiningRequestRow = [
  RefiningRequest['item'],
  RefiningRequest['quantity'],
  RefiningRequest['category'],
  RefiningRequest['refineryZone'],
  RefiningRequest['region'],
  RefiningRequest['coordinates'],
  RefiningRequest['acceptedBy'],
  RefiningRequest['completed'],
  RefiningRequest['requiredSalvage'],
  RefiningRequest['requiredComponents'],
  RefiningRequest['requiredSulfur'],
  RefiningRequest['requiredCrudeOil'],
  RefiningRequest['requiredAluminium'],
  RefiningRequest['requiredIron'],
  RefiningRequest['requiredCopper'],
  RefiningRequest['craftTime'],
  RefiningRequest['confirmed'],
  RefiningRequest['timeRequested'],
  RefiningRequest['timeAccepted'],
  RefiningRequest['timeCompleted'],
  RefiningRequest['id']
];

export interface ManufacturingRequest {
  rowNum: number;

  item: ItemName;
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
  timeRequested: string;
  timeAccepted: string;
  timeCompleted: string;
  id: string;
}

export type ManufacturingRequestRow = [
  ManufacturingRequest['item'],
  ManufacturingRequest['quantity'],
  ManufacturingRequest['category'],
  ManufacturingRequest['requester'],
  ManufacturingRequest['deliveryLocation'],
  ManufacturingRequest['deliveryRegion'],
  ManufacturingRequest['deliveryZone'],
  ManufacturingRequest['priority'],
  ManufacturingRequest['acceptedBy'],
  ManufacturingRequest['completed'],
  ManufacturingRequest['requiredBuildingMaterials'],
  ManufacturingRequest['requiredExplosiveMaterials'],
  ManufacturingRequest['requiredRefinedMaterials'],
  ManufacturingRequest['requiredHeavyExplosiveMaterials'],
  ManufacturingRequest['craftTime'],
  ManufacturingRequest['confirmed'],
  ManufacturingRequest['timeRequested'],
  ManufacturingRequest['timeAccepted'],
  ManufacturingRequest['timeCompleted'],
  ManufacturingRequest['id']
];

export interface DeliveryRequest {
  rowNum: number;

  item: ItemName;
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
  timeRequested: string;
  timeAccepted: string;
  timeCompleted: string;
  id: string;
}

export type DeliveryRequestRow = [
  DeliveryRequest['item'],
  DeliveryRequest['quantity'],
  DeliveryRequest['category'],
  DeliveryRequest['requester'],
  DeliveryRequest['pickupLocation'],
  DeliveryRequest['pickupRegion'],
  DeliveryRequest['pickupZone'],
  DeliveryRequest['deliveryLocation'],
  DeliveryRequest['deliveryRegion'],
  DeliveryRequest['deliveryZone'],
  DeliveryRequest['priority'],
  DeliveryRequest['acceptedBy'],
  DeliveryRequest['completed'],
  DeliveryRequest['confirmed'],
  DeliveryRequest['timeRequested'],
  DeliveryRequest['timeAccepted'],
  DeliveryRequest['timeCompleted'],
  DeliveryRequest['id']
];

export type RequestRow =
  | RefiningRequestRow
  | ManufacturingRequestRow
  | DeliveryRequestRow;
export type Request = RefiningRequest | ManufacturingRequest | DeliveryRequest;
