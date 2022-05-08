import { Category, CraftTime, ItemName, RawResource } from './items.types';

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

export const ITEM_INFO: Record<ItemName, ItemInfo> = {
  // Materials
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

export function getItemCategory(item: ItemName): Category | undefined {
  return ITEM_INFO[item]?.category;
}

export function getItemRawResource(item: ItemName): RawResource | undefined {
  return ITEM_INFO[item]?.rawResource;
}

export function getItemCraftTime(item: ItemName): CraftTime | undefined {
  return ITEM_INFO[item]?.craftTime?.toString();
}
