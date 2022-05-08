export type MaterialItemName =
  | 'Basic Materials Crate'
  | 'Explosive Materials Crate'
  | 'Refined Materials Crate'
  | 'Heavy Explosive Materials Crate'
  | 'Diesel Crate'
  | 'Petrol Crate'
  | 'Aluminum Alloy Crate'
  | 'Iron Alloy Crate'
  | 'Copper Alloy Crate'
  | 'Concrete Materials';

export type ItemName = MaterialItemName;

// Fields

export type CraftTime = string;

// Categories

export type RawResource =
  | 'Salvage'
  | 'Componenets'
  | 'Sulfur'
  | 'Crude Oil'
  | 'Aluminum'
  | 'Iron'
  | 'Copper';

export type Category =
  | 'Mats'
  | 'Small Arms'
  | 'Heavy Arms'
  | 'Heavy Ammo'
  | 'Utility'
  | 'Medical'
  | 'Resource'
  | 'Uniforms'
  | 'Ambulance'
  | 'Armored Car'
  | 'Assault Tank'
  | 'Barge'
  | 'Battle Tank'
  | 'Construction'
  | 'Crane'
  | 'Cruiser Tank'
  | 'Destroyer Tank'
  | 'Field AT Gun'
  | 'Field Cannon'
  | 'Field MG'
  | 'Field Mortar'
  | 'Flatbed Truck'
  | 'Freighter'
  | 'Fuel Tanker'
  | 'Gunboat'
  | 'Half-Track'
  | 'Harvester'
  | 'Heavy Field Cannon'
  | 'Landing APC'
  | 'Light Tank'
  | 'Light Utility Vehicle'
  | 'Motorcycle'
  | 'Scout Tank'
  | 'Transport Bus'
  | 'Truck'
  | 'Landing Ship'
  | 'Stationary Cannon'
  | 'Stationary MG'
  | 'Stationary AT'
  | 'Logistics';
