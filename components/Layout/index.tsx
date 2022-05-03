import {
  AppBar as MuiAppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import Drawer from './Drawer';

interface Props {
  children: ReactNode;
}

export const APP_BAR_HEIGHT = 64;

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
        <Tooltip title="This application is still in development. To help with development, please leave any feedback on your experience using the button in the navigation menu.">
          <Box display="flex" alignItems="center">
            <Typography sx={{ fontSize: 24 }}>SSC Metrics</Typography>
            <Typography
              sx={{
                p: 0.5,
                borderRadius: '16%',
                height: 'fit-content',
                color: (theme) => theme.palette.primary.contrastText,
                bgcolor: (theme) => theme.palette.primary.main,
                fontSize: 14,
                letterSpacing: '0.024rem',
                lineHeight: 1,
                ml: 1,
              }}
            >
              BETA
            </Typography>
          </Box>
        </Tooltip>
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
