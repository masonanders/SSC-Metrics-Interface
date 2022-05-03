import { Box, TableCell, Tooltip, Typography } from '@mui/material';
import {
  DeliveryRequest,
  ManufacturingRequest,
  RefiningRequest,
} from '../util/requests/types';

export function QuantityAndCostTableCell<
  R extends RefiningRequest | ManufacturingRequest
>({ head, row }: { head: boolean; row: R }) {
  if (head) {
    return <TableCell>#</TableCell>;
  }
  return (
    <Tooltip
      arrow
      title={
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          columnGap={2}
          rowGap={1}
        >
          {'requiredBuildingMaterials' in row &&
            !!row.requiredBuildingMaterials && (
              <Typography>Bmats: {row.requiredBuildingMaterials}</Typography>
            )}
          {'requiredExplosiveMaterials' in row &&
            !!row.requiredExplosiveMaterials && (
              <Typography>Emats: {row.requiredExplosiveMaterials}</Typography>
            )}
          {'requiredRefinedMaterials' in row &&
            !!row.requiredRefinedMaterials && (
              <Typography>Rmats: {row.requiredRefinedMaterials}</Typography>
            )}
          {'requiredHeavyExplosiveMaterials' in row &&
            !!row.requiredHeavyExplosiveMaterials && (
              <Typography>
                HEmats: {row.requiredHeavyExplosiveMaterials}
              </Typography>
            )}
          {'requiredSalvage' in row && !!row.requiredSalvage && (
            <Typography>Salvage: {row.requiredSalvage}</Typography>
          )}
          {'requiredComponents' in row && !!row.requiredComponents && (
            <Typography>Components: {row.requiredComponents}</Typography>
          )}
          {'requiredSulfur' in row && !!row.requiredSulfur && (
            <Typography>Sulfur: {row.requiredSulfur}</Typography>
          )}
          {'requiredCrudeOil' in row && !!row.requiredCrudeOil && (
            <Typography>Crude oil: {row.requiredCrudeOil}</Typography>
          )}
          {'requiredAluminium' in row && !!row.requiredAluminium && (
            <Typography>Aluminium: {row.requiredAluminium}</Typography>
          )}
          {'requiredIron' in row && !!row.requiredIron && (
            <Typography>Iron: {row.requiredIron}</Typography>
          )}
          {'requiredCopper' in row && !!row.requiredCopper && (
            <Typography>Copper: {row.requiredCopper}</Typography>
          )}
          <Typography gridColumn="1/3">Craft time: {row.craftTime}</Typography>
        </Box>
      }
    >
      <TableCell>{row.quantity}</TableCell>
    </Tooltip>
  );
}

export function LocationTableCell({
  head,
  title,
  location,
  region,
  zone,
  coordinates,
}: {
  head: boolean;
  title: string;
  location: string;
  region: string;
  zone?: string;
  coordinates?: string;
}) {
  if (head) {
    return <TableCell>{title}</TableCell>;
  }
  return (
    <Tooltip
      arrow
      title={
        <Box>
          <Typography>Region: {region}</Typography>
          {!!zone && <Typography>Zone: {zone}</Typography>}
          {!!coordinates && <Typography>Coordinates: {coordinates}</Typography>}
        </Box>
      }
      placement="bottom"
    >
      <TableCell>{location}</TableCell>
    </Tooltip>
  );
}

export function PriorityTableCell<
  R extends ManufacturingRequest | DeliveryRequest
>({ head, row }: { head: boolean; row: R }) {
  if (head) {
    return <TableCell>Priority</TableCell>;
  }
  return (
    <Tooltip
      arrow
      title={
        <Box>
          <Typography>Requester: {row.requester}</Typography>
        </Box>
      }
      placement="bottom"
    >
      <TableCell>{row.priority}</TableCell>
    </Tooltip>
  );
}
