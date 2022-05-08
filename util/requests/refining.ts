import { ItemInfo, ITEM_INFO, RequiredResources } from './items';
import { Item } from './types';

export function getRequiredResources(
  item: Item,
  quantity = 0
): RequiredResources & { craftTime: number } {
  const { requiredResources, craftTime }: ItemInfo = ITEM_INFO[item] ?? {};

  return {
    ...Object.fromEntries(
      Object.entries(requiredResources ?? {}).map(
        ([key, cost]: [string, number]) => [key, cost * quantity]
      )
    ),
    craftTime: craftTime * quantity,
  };
}
