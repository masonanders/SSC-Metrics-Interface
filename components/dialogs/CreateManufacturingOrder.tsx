import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { MANUFACTURING_ITEM_INFO } from '../../util/requests/items';
import AddIcon from '@mui/icons-material/Add';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ManufacturingRequest } from '../../util/requests/types';
import getUniqueId from '../../util/getUniqueId';
import CloseIcon from '@mui/icons-material/Close';
import { ItemName } from '../../util/requests/items.types';
import MAP_INFO from '../../constants/MapInfo';
import post from '../../util/client/post';

type ItemParams = {
  id: ManufacturingRequest['id'];
  itemName?: ManufacturingRequest['item'];
  quantity?: ManufacturingRequest['quantity'];
  priority?: ManufacturingRequest['priority'];
};

export default function CreateManufacturingOrderDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [items, setItems] = useState<ItemParams[]>([
    { id: getUniqueId(), quantity: 4 },
  ]);
  const [location, setLocation] = useState<{
    name: string;
    region: string;
    zone: string;
  }>({ name: '', region: '', zone: '' });
  const [loading, setLoading] = useState(false);

  const handleUpdateItem = useCallback(
    (item: ItemParams) => {
      const itemIndex = items.findIndex((i) => i.id === item.id);
      if (typeof itemIndex === 'number') {
        setItems([
          ...items.slice(0, itemIndex),
          item,
          ...items.slice(itemIndex + 1),
        ]);
      }
    },
    [items]
  );

  const handleRemoveItem = useCallback(
    (item: ItemParams) => {
      const itemIndex = items.findIndex((i) => i.id === item.id);
      if (typeof itemIndex === 'number') {
        setItems([...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)]);
      }
    },
    [items]
  );

  const submitEnabled =
    items.every((item) => item.itemName && item.quantity && item.priority) &&
    location.name &&
    location.region &&
    location.zone;

  const handleSubmit = useCallback(async () => {
    try {
      const requests = items
        .map((item) => {
          const reqs: Partial<ManufacturingRequest>[] = [];
          for (let q = item.quantity || 0; q > 0; q -= 4) {
            reqs.push({
              item: item.itemName,
              quantity: q > 4 ? 4 : q,
              deliveryLocation: location.name,
              deliveryRegion: location.region,
              deliveryZone: location.zone,
              priority: item.priority,
              id: item.id,
            });
          }
          return reqs;
        })
        .flat();

      setLoading(true);
      await post('/api/requests/manufacturing/add', {
        requests,
      });
      setLoading(false);
      setItems([{ id: getUniqueId(), quantity: 4 }]);
      setLocation({ name: '', region: '', zone: '' });
      onClose();
    } catch (err) {
      console.log(err);
    }
  }, [items, location]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>New manufacturing order</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 2,
          }}
        >
          <Typography gridColumn="1 / 13">Items</Typography>
          {items.map((item) => (
            <ItemEntry
              key={item.id}
              item={item}
              cancelable={items.length > 1}
              onItemUpdate={handleUpdateItem}
              onItemRemove={handleRemoveItem}
            />
          ))}
          <Box gridColumn="1 / 13">
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                setItems([...items, { id: getUniqueId(), quantity: 4 }])
              }
            >
              <AddIcon fontSize="small" sx={{ mr: 1 }} />
              Add another item
            </Button>
          </Box>
          <Box gridColumn="1 / 13">Location</Box>
          <LocationEntry onLocationUpdate={setLocation} />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: 2 }}
      >
        <Button color="secondary" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={!submitEnabled || loading}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ItemEntry<I extends ItemParams>({
  item,
  cancelable,
  onItemUpdate,
  onItemRemove,
}: {
  item: I;
  cancelable?: boolean;
  onItemUpdate: (item: I) => void;
  onItemRemove: (item: I) => void;
}) {
  return (
    <>
      <Autocomplete<{ label: ItemName }>
        autoComplete
        clearOnBlur
        onChange={(_, value) =>
          onItemUpdate({
            ...item,
            itemName: value
              ? typeof value !== 'string'
                ? value.label
                : value
              : '',
          })
        }
        renderInput={(params) => (
          <TextField error={!item.itemName} label="Item name" {...params} />
        )}
        options={Object.keys(MANUFACTURING_ITEM_INFO).map(
          (itemName: ItemName) => ({
            label: itemName,
          })
        )}
        value={item.itemName ?? ''}
        isOptionEqualToValue={(option, value) =>
          option.label === (value as unknown as string)
        }
        sx={{ gridColumn: '1 / 7' }}
      />
      <TextField
        onChange={(event) =>
          onItemUpdate({ ...item, quantity: event.target.value })
        }
        sx={{ gridColumn: '7 / 9' }}
        type="number"
        label="Quantity"
        value={item.quantity}
        error={!item.quantity}
      />
      <FormControl error={!item.priority} sx={{ gridColumn: '9 / 12' }}>
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          onChange={(event) =>
            onItemUpdate({ ...item, priority: event.target.value })
          }
          label="Priority"
          labelId="priority-select-label"
          value={item.priority ?? ''}
        >
          <MenuItem value="4. Low Priority">Low</MenuItem>
          <MenuItem value="3. Med Priority">Medium</MenuItem>
          <MenuItem value="2. High Priority">High</MenuItem>
          <MenuItem value="1. MISSION CRITICAL">Critical</MenuItem>
        </Select>
      </FormControl>
      <Box display="flex" alignItems="center" sx={{ gridColumn: '12 / 13' }}>
        <IconButton
          disabled={!cancelable}
          size="small"
          onClick={() => onItemRemove(item)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </>
  );
}

function LocationEntry({
  onLocationUpdate,
}: {
  onLocationUpdate: (location: {
    name: string;
    region: string;
    zone: string;
  }) => void;
}) {
  const [presetLocations, setPresetLocations] = useState<
    Readonly<{
      name: string;
      region: { name: string; location: string };
    }>[]
  >([]);
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('');
  const [zone, setZone] = useState('');

  useEffect(() => {
    onLocationUpdate({ name: location, region, zone });
  }, [location, region, zone]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await (await fetch('/api/locations/get')).json();
        setPresetLocations(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const handleSetLocation = useCallback(
    (_e, value) => {
      if (typeof value === 'string') {
        setLocation(value);
      } else {
        setLocation(value?.label ?? '');
        setRegion(value?.region ?? '');
        setZone(value?.zone ?? '');
      }
    },
    [setLocation]
  );

  const handleSetRegion = useCallback(
    (_e, value) => {
      setRegion(value?.label ?? '');
      if (value) {
        const reg = Object.values(MAP_INFO).find(
          (reg) => reg.name === value.label
        );
        if (reg && !reg.locations.includes(zone as never)) {
          setZone('');
        }
      }
    },
    [setRegion, zone, setZone]
  );

  const handleSetZone = useCallback(
    (_e, value) => {
      setZone(value?.label ?? '');
      setRegion(value?.region ?? '');
    },
    [setZone, region]
  );

  const locationOptions = useMemo((): { label: string; id: string }[] => {
    return presetLocations.map((location, idx) => ({
      label: location.name,
      region: location.region.name,
      zone: location.region.location,
      id: `${location.name}_${idx}`,
    }));
  }, [presetLocations]);

  const regionOptions = useMemo((): { label: string; id: string }[] => {
    return Object.values(MAP_INFO).map((region) => ({
      label: region.name,
      id: region.name,
    }));
  }, [region]);

  const zoneOptions = useMemo((): {
    label: string;
    region: string;
    id: string;
  }[] => {
    if (region) {
      const { locations } =
        Object.values(MAP_INFO).find((reg) => reg.name === region) ?? {};
      if (locations) {
        return locations.map((location: string) => ({
          label: location,
          region: region,
          id: `${region}_${location}`,
        }));
      }
    }
    return Object.values(MAP_INFO)
      .map((region) =>
        region.locations.map((location: string) => ({
          label: location,
          region: region.name,
          id: `${region.name}_${location}`,
        }))
      )
      .flat();
  }, [region]);

  return (
    <>
      <Autocomplete
        freeSolo
        renderInput={(params) => (
          <TextField {...params} error={!location} label="Delivery location" />
        )}
        onInputChange={handleSetLocation}
        onChange={handleSetLocation}
        value={location ?? ''}
        options={locationOptions}
        isOptionEqualToValue={(option, value) => option.label === value}
        sx={{ gridColumn: '1 / 7' }}
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} error={!region} label="Delivery region" />
        )}
        onChange={handleSetRegion}
        value={region}
        isOptionEqualToValue={(option, value) => option.label === value}
        options={regionOptions}
        sx={{ gridColumn: '7 / 10' }}
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} error={!zone} label="Delivery zone" />
        )}
        onChange={handleSetZone}
        value={zone}
        groupBy={(option) => option.region}
        isOptionEqualToValue={(option, value) => option.label === value}
        options={zoneOptions}
        sx={{ gridColumn: '10 / 13' }}
      />
    </>
  );
}
