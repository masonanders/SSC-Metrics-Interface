import { useContext } from 'react';
import { DialogContext } from './DialogProvider';

export default function useDialogManager() {
  const dialogContext = useContext(DialogContext);

  return dialogContext;
}
