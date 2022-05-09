import {
  Autocomplete,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Box,
} from '@mui/material';
import { ITEM_INFO } from '../util/requests/items';
import AddIcon from '@mui/icons-material/Add';

export default function CreateOrderDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open || true} onClose={onClose}>
      <DialogTitle>Create order</DialogTitle>
      <DialogContent>
        <DialogContentText>Items</DialogContentText>
      </DialogContent>
      <Collapse in={true}>
        <DialogContent
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            justifyItems: 'space-between',
            gap: 2,
          }}
        >
          <ItemEntry />
          <Box sx={{ gridColumn: '1 / 9' }}>
            <Button variant="outlined" color="secondary" size="small">
              <AddIcon fontSize="small" sx={{ mr: 1 }} />
              Add more items
            </Button>
          </Box>
        </DialogContent>
      </Collapse>
      <DialogActions
        sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: 2 }}
      >
        <Button color="secondary" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

function ItemEntry() {
  return (
    <>
      <ItemAutocomplete sx={{ gridColumn: '1 / 6' }} />
      <TextField type="number" label="#" sx={{ gridColumn: '6 / 7' }} />
      <FormControl sx={{ gridColumn: '7 / 9' }}>
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select label="Priority" labelId="priority-select-label">
          <MenuItem value="4. Low Priority">Low</MenuItem>
          <MenuItem value="3. Med Priority">Medium</MenuItem>
          <MenuItem value="2. High Priority">High</MenuItem>
          <MenuItem value="1. MISSION CRITICAL">Critical</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

function ItemAutocomplete({ sx }: { sx: SxProps }) {
  return (
    <Autocomplete
      sx={sx}
      renderInput={(params) => <TextField label="Item name" {...params} />}
      options={Object.keys(ITEM_INFO).map((itemName) => ({
        label: itemName,
      }))}
    />
  );
}
