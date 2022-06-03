import {
  Category,
  CraftTime,
  HeavyAmmoItemName,
  HeavyArmItemName,
  ItemName,
  MaterialItemName,
  MedicalItemName,
  RawResource,
  ResourceItemName,
  SmallArmItemName,
  UniformItemName,
  UtilityItemName,
  VehicleItemName,
} from './items.types';

export type RequiredResources = Partial<{
  // Refining
  requiredSalvage: number;
  requiredComponents: number;
  requiredSulfur: number;
  requiredCrudeOil: number;
  requiredAluminium: number;
  requiredIron: number;
  requiredCopper: number;

  // Manufacturing
  requiredBuildingMaterials: number;
  requiredExplosiveMaterials: number;
  requiredRefinedMaterials: number;
  requiredHeavyExplosiveMaterials: number;
}>;

export type ItemInfo = {
  category: Category;
  requiredResources: RequiredResources;
  craftTime: number;
  cratedUnits: number;
  rawResource?: RawResource;
};

const MATERIAL_ITEM_INFO: Record<MaterialItemName, ItemInfo> = {
  'Basic Materials Crate': {
    category: 'Mats',
    craftTime: 30,
    cratedUnits: 100,
    rawResource: 'Salvage',
    requiredResources: {
      requiredSalvage: 200,
    },
  },
  'Explosive Materials Crate': {
    category: 'Mats',
    craftTime: 333,
    cratedUnits: 20,
    rawResource: 'Salvage',
    requiredResources: {
      requiredSalvage: 200,
    },
  },
  'Refined Materials Crate': {
    category: 'Mats',
    craftTime: 40,
    cratedUnits: 20,
    rawResource: 'Componenets',
    requiredResources: {
      requiredComponents: 20,
    },
  },
  'Heavy Explosive Materials Crate': {
    category: 'Mats',
    craftTime: 60,
    cratedUnits: 20,
    rawResource: 'Sulfur',
    requiredResources: {
      requiredSulfur: 20,
    },
  },
  'Diesel Crate': {
    category: 'Mats',
    craftTime: 12,
    cratedUnits: 1,
    rawResource: 'Salvage',
    requiredResources: {
      requiredSalvage: 10,
    },
  },
  'Petrol Crate': {
    category: 'Mats',
    craftTime: 360,
    cratedUnits: 1,
    rawResource: 'Crude Oil',
    requiredResources: {
      requiredCrudeOil: 3,
    },
  },
  'Aluminum Alloy Crate': {
    category: 'Mats',
    craftTime: 5,
    cratedUnits: 20,
    rawResource: 'Aluminum',
    requiredResources: {
      requiredAluminium: 20,
    },
  },
  'Iron Alloy Crate': {
    category: 'Mats',
    craftTime: 5,
    cratedUnits: 20,
    rawResource: 'Iron',
    requiredResources: {
      requiredIron: 20,
    },
  },
  'Copper Alloy Crate': {
    category: 'Mats',
    craftTime: 5,
    cratedUnits: 20,
    rawResource: 'Copper',
    requiredResources: {
      requiredCopper: 20,
    },
  },
  'Concrete Materials': {
    category: 'Mats',
    craftTime: 20,
    cratedUnits: 1,
    rawResource: 'Componenets',
    requiredResources: {
      requiredComponents: 10,
    },
  },
} as const;

const SMALL_ARM_ITEM_INFO: Record<SmallArmItemName, ItemInfo> = {
  'Green Ash Grenade Crate': {
    category: 'Small Arms',
    craftTime: 100,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 140,
    },
  },
  'PT-815 Smoke Grenade Crate': {
    category: 'Small Arms',
    craftTime: 75,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 120,
    },
  },
  '0.44 Crate': {
    category: 'Small Arms',
    craftTime: 40,
    cratedUnits: 40,
    requiredResources: {
      requiredBuildingMaterials: 40,
    },
  },
  '12.7mm Crate': {
    category: 'Small Arms',
    craftTime: 70,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },

  '7.62mm Crate': {
    category: 'Small Arms',
    craftTime: 50,
    cratedUnits: 40,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
  '7.92mm Crate': {
    category: 'Small Arms',
    craftTime: 60,
    cratedUnits: 30,
    requiredResources: {
      requiredBuildingMaterials: 120,
    },
  },
  '8mm Crate': {
    category: 'Small Arms',
    craftTime: 20,
    cratedUnits: 40,
    requiredResources: {
      requiredBuildingMaterials: 40,
    },
  },
  '9mm SMG Crate': {
    category: 'Small Arms',
    craftTime: 50,
    cratedUnits: 40,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
  'A3 Harpa Fragmentation Grenade Crate': {
    category: 'Small Arms',
    craftTime: 100,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredExplosiveMaterials: 20,
    },
  },
  'Aalto Storm Rifle 24 Crate': {
    category: 'Small Arms',
    craftTime: 80,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 165,
    },
  },
  'Blakerow 871 Crate': {
    category: 'Small Arms',
    craftTime: 80,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 140,
    },
  },
  'Booker Storm Rifle Model 838 Crate': {
    category: 'Small Arms',
    craftTime: 80,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 165,
    },
  },
  'Brasa Shotgun Crate': {
    category: 'Small Arms',
    craftTime: 80,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
  'Buckshot Crate': {
    category: 'Small Arms',
    craftTime: 50,
    cratedUnits: 40,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
  'Cascadier 873 Crate': {
    category: 'Small Arms',
    craftTime: 30,
    cratedUnits: 40,
    requiredResources: {
      requiredBuildingMaterials: 60,
    },
  },
  'Clancy Cinder M3 Crate': {
    category: 'Small Arms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 130,
    },
  },
  'Clancy-Raca M4 Crate': {
    category: 'Small Arms',
    craftTime: 125,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 200,
      requiredRefinedMaterials: 15,
    },
  },
  'Cometa T2-9 Crate': {
    category: 'Small Arms',
    craftTime: 50,
    cratedUnits: 30,
    requiredResources: {
      requiredBuildingMaterials: 60,
    },
  },
  'Fiddler Submachine Gun Model 868 Crate': {
    category: 'Small Arms',
    craftTime: 80,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 120,
    },
  },
  'Malone MK.2 Crate': {
    category: 'Small Arms',
    craftTime: 100,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 0,
      requiredRefinedMaterials: 25,
    },
  },
  'No.1 "The Liar" Submachine Gun Crate': {
    category: 'Small Arms',
    craftTime: 80,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 120,
    },
  },
  'No.2 Loughcaster Crate': {
    category: 'Small Arms',
    craftTime: 70,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  'Sampo Auto-Rifle 77 Crate': {
    category: 'Small Arms',
    craftTime: 70,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 125,
    },
  },
  'The Hangman 757 Crate': {
    category: 'Small Arms',
    craftTime: 80,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 125,
    },
  },
} as const;

const HEAVY_ARM_ITEM_INFO: Record<HeavyArmItemName, ItemInfo> = {
  '20 Neville Anti-Tank Rifle Crate': {
    category: 'Heavy Arms',
    craftTime: 37,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 150,
    },
  },
  'Cremari Mortar Crate': {
    category: 'Heavy Arms',
    craftTime: 50,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredRefinedMaterials: 25,
    },
  },
  'Mammon 91-b Crate': {
    category: 'Heavy Arms',
    craftTime: 80,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredExplosiveMaterials: 10,
    },
  },
  '20mm Crate': {
    category: 'Heavy Arms',
    craftTime: 100,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  '30mm Crate': {
    category: 'Heavy Arms',
    craftTime: 100,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 80,
      requiredExplosiveMaterials: 20,
    },
  },
  'A.T.R.P.G. Indirect Shell Crate': {
    category: 'Heavy Arms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 60,
      requiredExplosiveMaterials: 75,
    },
  },
  'A.T.R.P.G. Shell Crate': {
    category: 'Heavy Arms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 60,
      requiredExplosiveMaterials: 75,
    },
  },
  'Anti-Tank Sticky Bomb Crate': {
    category: 'Heavy Arms',
    craftTime: 75,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 50,
      requiredExplosiveMaterials: 50,
    },
  },
  'BF5 White Ash Flask Grenade Crate': {
    category: 'Heavy Arms',
    craftTime: 75,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredExplosiveMaterials: 40,
    },
  },
  'Bonesaw MK.3 Crate': {
    category: 'Heavy Arms',
    craftTime: 125,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredRefinedMaterials: 25,
    },
  },
  'Cutler Foebreaker Crate': {
    category: 'Heavy Arms',
    craftTime: 250,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredRefinedMaterials: 5,
    },
  },
  'Cutler Launcher 4 Crate': {
    category: 'Heavy Arms',
    craftTime: 50,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredRefinedMaterials: 25,
    },
  },
  'Malone Ratcatcher Mk. 1 Crate': {
    category: 'Heavy Arms',
    craftTime: 125,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredRefinedMaterials: 5,
    },
  },
  'Mortar Flare Shell Crate': {
    category: 'Heavy Arms',
    craftTime: 100,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 60,
      requiredExplosiveMaterials: 10,
    },
  },
  'Mortar Shell Crate': {
    category: 'Heavy Arms',
    craftTime: 100,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 60,
      requiredExplosiveMaterials: 35,
    },
  },
  'Mortar Shrapnel Shell Crate': {
    category: 'Heavy Arms',
    craftTime: 100,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 60,
      requiredExplosiveMaterials: 15,
    },
  },
  'Mounted Bonesaw MK.3 Crate': {
    category: 'Heavy Arms',
    craftTime: 250,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredRefinedMaterials: 5,
    },
  },
  'R.P.G. Shell Crate': {
    category: 'Heavy Arms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 60,
      requiredExplosiveMaterials: 45,
    },
  },
  'Tremola Grenade GPb-1 Crate': {
    category: 'Heavy Arms',
    craftTime: 80,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 150,
      requiredExplosiveMaterials: 10,
    },
  },
} as const;

export const HEAVY_AMMO_ITEM_INFO: Record<HeavyAmmoItemName, ItemInfo> = {
  '120mm Crate': {
    category: 'Heavy Ammo',
    craftTime: 55,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 60,
      requiredExplosiveMaterials: 15,
    },
  },
  '150mm Crate': {
    category: 'Heavy Ammo',
    craftTime: 65,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 120,
      requiredHeavyExplosiveMaterials: 10,
    },
  },
  '250mm Crate': {
    category: 'Heavy Ammo',
    craftTime: 150,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 120,
      requiredHeavyExplosiveMaterials: 25,
    },
  },
  '300mm Crate': {
    category: 'Heavy Ammo',
    craftTime: 125,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 135,
      requiredHeavyExplosiveMaterials: 30,
    },
  },
  '40mm Round Crate': {
    category: 'Heavy Ammo',
    craftTime: 200,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 160,
      requiredExplosiveMaterials: 120,
    },
  },
  '68mm AT Crate': {
    category: 'Heavy Ammo',
    craftTime: 200,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 120,
      requiredExplosiveMaterials: 120,
    },
  },
  'Warhead Crate': {
    category: 'Heavy Ammo',
    craftTime: 600,
    cratedUnits: 1,
    requiredResources: {
      requiredRefinedMaterials: 200,
      requiredHeavyExplosiveMaterials: 1000,
    },
  },
} as const;

export const UTILITY_ITEM_INFO: Record<UtilityItemName, ItemInfo> = {
  'Buckhorn CCQ-18 Crate': {
    category: 'Utility',
    craftTime: 30,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 40,
    },
  },
  'The Ospreay Crate': {
    category: 'Utility',
    craftTime: 100,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 85,
      requiredRefinedMaterials: 10,
    },
  },
  'Abisme AT-99 Crate': {
    category: 'Utility',
    craftTime: 100,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredExplosiveMaterials: 10,
    },
  },
  'Alligator Charge Crate': {
    category: 'Utility',
    craftTime: 100,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
      requiredHeavyExplosiveMaterials: 15,
    },
  },
  'Binoculars Crate': {
    category: 'Utility',
    craftTime: 50,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 75,
    },
  },
  'Gas Mask Filter Crate': {
    category: 'Utility',
    craftTime: 50,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  'Gas Mask Crate': {
    category: 'Utility',
    craftTime: 100,
    cratedUnits: 20,
    requiredResources: {
      requiredBuildingMaterials: 160,
    },
  },
  'Listening Kit Crate': {
    category: 'Utility',
    craftTime: 0,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 150,
    },
  },
  'Radio Backpack Crate': {
    category: 'Utility',
    craftTime: 75,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 150,
    },
  },
  'Radio Crate': {
    category: 'Utility',
    craftTime: 50,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 75,
    },
  },
  'Rocket Booster Crate': {
    category: 'Utility',
    craftTime: 600,
    cratedUnits: 1,
    requiredResources: {
      requiredBuildingMaterials: 0,
      requiredHeavyExplosiveMaterials: 800,
    },
  },
  'Shovel Crate': {
    category: 'Utility',
    craftTime: 100,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 200,
    },
  },
  'Sledge Hammer Crate': {
    category: 'Utility',
    craftTime: 100,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 200,
    },
  },
  'Tripod Crate': {
    category: 'Utility',
    craftTime: 60,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  'Wrench Crate': {
    category: 'Utility',
    craftTime: 50,
    cratedUnits: 5,
    requiredResources: {
      requiredBuildingMaterials: 75,
    },
  },
} as const;

const MEDICAL_ITEM_INFO: Record<MedicalItemName, ItemInfo> = {
  'Bandages Crate': {
    category: 'Medical',
    craftTime: 40,
    cratedUnits: 50,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
  'Blood Plasma Crate': {
    category: 'Medical',
    craftTime: 40,
    cratedUnits: 50,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
  'First Aid Kit Crate': {
    category: 'Medical',
    craftTime: 35,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 50,
    },
  },
  'Soldier Supplies Crate': {
    category: 'Medical',
    craftTime: 80,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
  'Trauma Kit Crate': {
    category: 'Medical',
    craftTime: 50,
    cratedUnits: 10,
    requiredResources: {
      requiredBuildingMaterials: 80,
    },
  },
} as const;

const RESOURCE_ITEM_INFO: Record<ResourceItemName, ItemInfo> = {
  'Bunker Supplies Crate': {
    category: 'Resource',
    craftTime: 190,
    cratedUnits: 150,
    requiredResources: {
      requiredBuildingMaterials: 75,
    },
  },
  'Garrison Supplies Crate': {
    category: 'Resource',
    craftTime: 190,
    cratedUnits: 150,
    requiredResources: {
      requiredBuildingMaterials: 75,
    },
  },
  'Diesel Crate': {
    category: 'Resource',
    craftTime: 0,
    cratedUnits: 1,
    requiredResources: {},
  },
  'Petrol Crate': {
    category: 'Resource',
    craftTime: 0,
    cratedUnits: 1,
    requiredResources: {},
  },
} as const;

const UNIFORM_ITEM_INFO: Record<UniformItemName, ItemInfo> = {
  'Sapper Gear Crate': {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  "Gunner's Breastplate Crate": {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  "Specialist's Overcoat Crate": {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  "Physician's Jacket Crate": {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  "Officer's Regalia Crate": {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  "Outrider's Mantle Crate": {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  'Caoivish Parka Crate': {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
  'Padded Boiler Suit Crate': {
    category: 'Uniforms',
    craftTime: 90,
    cratedUnits: 15,
    requiredResources: {
      requiredBuildingMaterials: 100,
    },
  },
} as const;

const VEHICLES_ITEM_INFO: Record<VehicleItemName, ItemInfo> = {
  'Dunne Responder 3e Crate': {
    category: 'Ambulance',
    craftTime: 125,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 450,
    },
  },
  "O'Brien V.101 Freeman Crate": {
    category: 'Armored Car',
    craftTime: 3000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 180,
    },
  },
  "O'Brien V.121 Highlander Crate": {
    category: 'Armored Car',
    craftTime: 2000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 120,
    },
  },
  "O'Brien V.110 Crate": {
    category: 'Armored Car',
    craftTime: 1750,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 105,
    },
  },
  "O'Brien V.113 Gravekeeper Crate": {
    category: 'Armored Car',
    craftTime: 0,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 135,
    },
  },
  'Silverhand Chieftain - Mk. VI Crate': {
    category: 'Assault Tank',
    craftTime: 9250,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 555,
    },
  },
  'Silverhand - Mk. IV Crate': {
    category: 'Assault Tank',
    craftTime: 8480,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 510,
    },
  },
  'BMS - Aquatipper Crate': {
    category: 'Barge',
    craftTime: 7500,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 450,
    },
  },
  'Flood Ascension Mk. V Crate': {
    category: 'Battle Tank',
    craftTime: 11750,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 750,
    },
  },
  'Flood Juggernaut Mk. VII Crate': {
    category: 'Battle Tank',
    craftTime: 12250,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 735,
    },
  },
  'Flood Mk-1 Crate': {
    category: 'Battle Tank',
    craftTime: 10000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 600,
    },
  },
  'BMS Universal Assembly Rig Crate': {
    category: 'Construction',
    craftTime: 5000,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 300,
    },
  },
  'BMS Class 2 Mobile Auto-Crane Crate': {
    category: 'Crane',
    craftTime: 6250,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 375,
    },
  },
  'Gallagher Outlaw Mk. II Crate': {
    category: 'Cruiser Tank',
    craftTime: 0,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 495,
    },
  },
  'Noble Widow MK. XIV Crate': {
    category: 'Destroyer Tank',
    craftTime: 8000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 480,
    },
  },
  'Collins Cannon 68mm Crate': {
    category: 'Field AT Gun',
    craftTime: 1500,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 90,
    },
  },
  'Balfour Wolfhound 40mm Crate': {
    category: 'Field Cannon',
    craftTime: 1500,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 90,
    },
  },
  'Swallowtail 988/127-2 Crate': {
    category: 'Field MG',
    craftTime: 1250,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 75,
    },
  },
  'Balfour Falconer 250mm Crate': {
    category: 'Field Mortar',
    craftTime: 1750,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 105,
    },
  },
  'BMS Packmule Flatbed Crate': {
    category: 'Flatbed Truck',
    craftTime: 1500,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 90,
    },
  },
  'BMS - Ironship Crate': {
    category: 'Freighter',
    craftTime: 25000,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 1500,
    },
  },
  'Dunne Fuelrunner 2d Crate': {
    category: 'Fuel Tanker',
    craftTime: 5000,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 300,
    },
  },
  '74b-1 Ronan Gunship Crate': {
    category: 'Gunboat',
    craftTime: 8000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 480,
    },
  },
  '74c-2 Ronan Meteora Gunship Crate': {
    category: 'Gunboat',
    craftTime: 8000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 480,
    },
  },
  'Niska Mk. 1 Gun Motor Carriage Crate': {
    category: 'Half-Track',
    craftTime: 3000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 180,
    },
  },
  'Niska Mk. 2 Blinder Crate': {
    category: 'Half-Track',
    craftTime: 4250,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 255,
    },
  },
  'BMS Scrap Hauler Crate': {
    category: 'Harvester',
    craftTime: 0,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 360,
    },
  },
  'Balfour Rampart 40mm Crate': {
    category: 'Heavy Field Cannon',
    craftTime: 2000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 120,
    },
  },
  'Mulloy Flying Squid Crate': {
    category: 'Landing APC',
    craftTime: 0,
    cratedUnits: 3,
    requiredResources: {},
  },
  'Mulloy LPC Crate': {
    category: 'Landing APC',
    craftTime: 1060,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 60,
    },
  },
  'Devitt-Caine MK-IV MMR Crate': {
    category: 'Light Tank',
    craftTime: 7500,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 450,
    },
  },
  'Devitt Mark III Crate': {
    category: 'Light Tank',
    craftTime: 7000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 420,
    },
  },
  'Devitt Ironhide Mk. IV Crate': {
    category: 'Light Tank',
    craftTime: 8000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 450,
    },
  },
  'Drummond Loscann 55c Crate': {
    category: 'Light Utility Vehicle',
    craftTime: 500,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 30,
    },
  },
  'Drummond 100a Crate': {
    category: 'Light Utility Vehicle',
    craftTime: 500,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 30,
    },
  },
  'Drummond Spitfire 100d Crate': {
    category: 'Light Utility Vehicle',
    craftTime: 750,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 45,
    },
  },
  'Kivela Power Wheel 80-1 Crate': {
    category: 'Motorcycle',
    craftTime: 4250,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 255,
    },
  },
  'King Gallant MK-II Crate': {
    category: 'Scout Tank',
    craftTime: 4500,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 270,
    },
  },
  'King Spire MK-I Crate': {
    category: 'Scout Tank',
    craftTime: 4000,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 240,
    },
  },
  'Dunne Caravaner 2f Crate': {
    category: 'Transport Bus',
    craftTime: 5000,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 300,
    },
  },
  'Dunne Loadlugger 3c Crate': {
    category: 'Truck',
    craftTime: 6000,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 360,
    },
  },
  'Dunne Leatherback 2a Crate': {
    category: 'Truck',
    craftTime: 7250,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 435,
    },
  },
  'Dunne Landrunner 12c Crate': {
    category: 'Truck',
    craftTime: 6000,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 360,
    },
  },
  'Dunne Transport Crate': {
    category: 'Truck',
    craftTime: 5000,
    cratedUnits: 3,
    requiredResources: {
      requiredBuildingMaterials: 300,
    },
  },
  'BMS - White Whale Crate': {
    category: 'Landing Ship',
    craftTime: 5030,
    cratedUnits: 3,
    requiredResources: {
      requiredRefinedMaterials: 300,
    },
  },
} as const;

export const ITEM_INFO: Record<ItemName, ItemInfo> = {
  ...MATERIAL_ITEM_INFO,
  ...SMALL_ARM_ITEM_INFO,
  ...HEAVY_ARM_ITEM_INFO,
  ...HEAVY_AMMO_ITEM_INFO,
  ...UTILITY_ITEM_INFO,
  ...MEDICAL_ITEM_INFO,
  ...RESOURCE_ITEM_INFO,
  ...UNIFORM_ITEM_INFO,
  ...VEHICLES_ITEM_INFO,
} as const;

export const MANUFACTURING_ITEM_INFO = {
  ...SMALL_ARM_ITEM_INFO,
  ...HEAVY_ARM_ITEM_INFO,
  ...HEAVY_AMMO_ITEM_INFO,
  ...UTILITY_ITEM_INFO,
  ...MEDICAL_ITEM_INFO,
  ...RESOURCE_ITEM_INFO,
  ...UNIFORM_ITEM_INFO,
  ...VEHICLES_ITEM_INFO,
} as const;

export function getItemCategory(item: ItemName): Category | undefined {
  return ITEM_INFO[item]?.category;
}

export function getItemRawResource(item: ItemName): RawResource | undefined {
  return ITEM_INFO[item]?.rawResource;
}

export function getItemCraftTime(
  item: ItemName,
  quantity = 0
): CraftTime | undefined {
  return formatTime((ITEM_INFO[item]?.craftTime ?? 0) * quantity);
}

function formatTime(timeInSeconds: number): CraftTime {
  const day = 60 * 60 * 24;
  const hour = 60 * 60;
  const minute = 60;

  const days = Math.floor(timeInSeconds / (60 * 60 * 24));
  const hours = Math.floor((timeInSeconds - days * day) / (60 * 60));
  const minutes = Math.floor((timeInSeconds - days * day - hours * hour) / 60);
  const seconds = Math.floor(
    timeInSeconds - days * day - hours * hour - minutes * minute
  );

  return [
    days || null,
    days && hours < 10 ? `0${hours}` : hours,
    minutes < 10 ? `0${minutes}` : minutes,
    seconds < 10 ? `0${seconds}` : seconds,
  ]
    .filter((unit) => unit !== null)
    .join(':');
}
