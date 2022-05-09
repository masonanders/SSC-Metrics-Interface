import { createContext, useCallback, useState } from 'react';
import CreateOrderDialog from '../../components/CreateOrderDialog';

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
      <CreateOrderDialog
        onClose={() => setOpenDialog(null)}
        open={openDialog === DialogKeys.CREATE_ORDER}
      />
      {children}
    </DialogContext.Provider>
  );
}
