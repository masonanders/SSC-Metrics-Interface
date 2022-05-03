import {
  Button,
  Box,
  Drawer as MuiDrawer,
  List,
  ListItem,
  Typography,
  ListItemButton,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import FeedbackDialog from './FeedbackDialog';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { APP_BAR_HEIGHT } from '.';

export const DRAWER_WIDTH = 24 * 10;

export default function Drawer() {
  const session = useSession();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  return (
    <MuiDrawer
      anchor="left"
      PaperProps={{ sx: { pt: APP_BAR_HEIGHT / 8, width: DRAWER_WIDTH } }}
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      <Box
        height="100%"
        p={3}
        display="grid"
        gap={3}
        gridTemplateRows="min-content auto min-content min-content"
      >
        <Typography fontSize={16} fontWeight={600}>
          {session.data?.member?.nick}
        </Typography>
        <List>
          <ListItem>Supply Orders</ListItem>
          <List sx={{ pl: 2 }}>
            <NavLink href="/requests/refining">Refining</NavLink>
            <NavLink href="/requests/manufacturing">Manufacturing</NavLink>
            <NavLink href="/requests/distributing">Distributing</NavLink>
          </List>
          <NavLink href="/stockpiles">Stockpiles</NavLink>
          <NavLink href="/bases">Bases</NavLink>
        </List>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => {
            setFeedbackDialogOpen(true);
          }}
        >
          Give feedback
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => signOut()}
        >
          Log out
        </Button>
      </Box>
      <FeedbackDialog
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
      />
    </MuiDrawer>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <ListItemButton selected={router.pathname === href}>
        {children}
      </ListItemButton>
    </Link>
  );
}
