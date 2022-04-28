import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const APP_BAR_HEIGHT = 64;
export const DRAWER_WIDTH = 24 * 10;

export default function Layout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <Drawer />
      <Container sx={{ mt: APP_BAR_HEIGHT / 8 }}>{children}</Container>
    </Box>
  );
}

function AppBar() {
  const {
    data: {
      user: { image: userImage },
    },
  } = useSession();

  return (
    <MuiAppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 24 }}>SSC Metrics</Typography>
        <Box
          minHeight={40}
          minWidth={40}
          borderRadius="50%"
          sx={{
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#99A1A9',
            backgroundSize: 'contain',
            backgroundImage: `url(${
              userImage
                ? userImage
                : 'https://cdn.discordapp.com/attachments/892325227210629130/968696193729302548/FWG_new.png'
            })`,
          }}
        />
      </Toolbar>
    </MuiAppBar>
  );
}

function Drawer() {
  const session = useSession();

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
        gridTemplateRows="min-content auto auto"
      >
        <Typography fontSize={16} fontWeight={600}>
          {session.data?.member?.nick}
        </Typography>
        <List>
          <ListItem>Requests</ListItem>
          <List sx={{ pl: 2 }}>
            <NavLink href="/requests/refining">Refining</NavLink>
            <NavLink href="/requests/manufacturing">Manufacturing</NavLink>
            <NavLink href="/requests/distributing">Distributing</NavLink>
          </List>
          <NavLink href="/stockpiles">Stockpiles</NavLink>
          <NavLink href="/bases">Bases</NavLink>
        </List>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ mt: 'auto' }}
          onClick={() => signOut()}
        >
          Log out
        </Button>
      </Box>
    </MuiDrawer>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href}>
      <ListItemButton>{children}</ListItemButton>
    </Link>
  );
}
