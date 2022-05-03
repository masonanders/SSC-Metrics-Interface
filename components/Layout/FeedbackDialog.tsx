import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import post from '../../util/client/post';

export default function FeedbackDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [snackbarState, setSnackbarState] = useState<{
    message: string;
    type: Parameters<typeof SubmissionSnackbar>[0]['type'];
  }>({
    message: '',
    type: '',
  });

  async function handleSendFeedback() {
    try {
      const response = await post('/api/feedback', {
        message: feedbackMessage,
      });

      if (!response.success) throw new Error();

      setSnackbarState({
        message: 'Feedback recorded successfully. Thank you!',
        type: 'success',
      });

      setFeedbackMessage('');
      onClose();
    } catch {
      setSnackbarState({
        message:
          'There was an error recording your feedback. Please try again!',
        type: 'error',
      });
      onClose();
    }
  }

  function handleCancel() {
    setFeedbackMessage('');
    onClose();
  }

  function handleSnackbarClose() {
    setSnackbarState({ ...snackbarState, message: '' });
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Give feedback</DialogTitle>
        <DialogContent sx={{ display: 'grid', rowGap: 3 }}>
          <DialogContentText>
            Found a bug? Got a feature request? This application is still in
            development and user feedback is critical in helping us to drive it
            forward.
          </DialogContentText>
          <DialogContentText>
            Please be as descriptive as possilbe in the feedback that you
            provide. We may reach out to you privately for further details
            unless you specify that you would prefer we do not.
          </DialogContentText>
          <TextField
            onChange={(e) => setFeedbackMessage(e.target.value)}
            value={feedbackMessage}
            fullWidth
            minRows={4}
            maxRows={8}
            placeholder="Provide feedback here..."
            multiline
          />
        </DialogContent>
        <DialogActions
          sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: 2 }}
        >
          <Button variant="text" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            disabled={!feedbackMessage.length}
            variant="contained"
            color="primary"
            onClick={handleSendFeedback}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <SubmissionSnackbar
        message={snackbarState.message}
        open={!!snackbarState.message.length}
        onClose={handleSnackbarClose}
        type={snackbarState.type}
      />
    </>
  );
}

function SubmissionSnackbar({
  message,
  open,
  onClose,
  type,
}: {
  message: string;
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error' | '';
}) {
  return (
    <Snackbar
      open={open}
      ContentProps={{
        sx: {
          bgcolor: (theme) => {
            switch (type) {
              case 'success':
                return theme.palette.success.main;
              case 'error':
                return theme.palette.error.main;
            }
          },
        },
      }}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={6000}
    />
  );
}
