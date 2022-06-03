import { createContext, useCallback, useState } from 'react';
import CreateManufacturingOrderDialog from '../../components/dialogs/CreateManufacturingOrder';

export const DialogContext = createContext<{
  openCreateOrderDialog: () => void;
}>({
  openCreateOrderDialog: () => undefined,
});

enum DialogKeys {
  CREATE_ORDER,
}

export default function DialogProvider({ children }) {
  const [openDialog, setOpenDialog] = useState<DialogKeys | null>(null);

  const openCreateOrderDialog = useCallback(() => {
    setOpenDialog(DialogKeys.CREATE_ORDER);
  }, []);

  return (
    <DialogContext.Provider value={{ openCreateOrderDialog }}>
      <CreateManufacturingOrderDialog
        onClose={() => setOpenDialog(null)}
        open={openDialog === DialogKeys.CREATE_ORDER}
      />
      {children}
    </DialogContext.Provider>
  );
}
