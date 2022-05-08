import { ItemInfo, ITEM_INFO, RequiredResources } from './items';
import { ItemName } from './items.types';

export function getRequiredResources(
  item: ItemName,
  quantity = 0
): RequiredResources {
  const { requiredResources }: ItemInfo = ITEM_INFO[item] ?? ({} as ItemInfo);

  return {
    ...Object.fromEntries(
      Object.entries(requiredResources ?? {}).map(
        ([key, cost]: [string, number]) => [key, cost * quantity]
      )
    ),
  };
}
