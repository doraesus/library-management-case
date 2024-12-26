import React from 'react';
import { Box, Drawer, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#4c3d7a',
            color: '#ffffff',
          },
        }}
      >
        <Box sx={{ padding: '16px', textAlign: 'center', backgroundColor: '#5c468c' }}>
          <Typography variant="h6" component="div" sx={{ color: '#ffffff' }}>
            Library Management
          </Typography>
        </Box>
        <List>
          <ListItemButton
            component={Link}
            to="/"
            disabled={currentPath === '/'}
            sx={{
              '&:hover': {
                backgroundColor: currentPath === '/' ? 'inherit' : '#6e5ca8',
              },
              opacity: currentPath === '/' ? 0.6 : 1,
            }}
          >
            <PeopleIcon sx={{ color: '#ffffff', marginRight: '16px' }} />
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/books"
            disabled={currentPath === '/books'}
            sx={{
              '&:hover': {
                backgroundColor: currentPath === '/books' ? 'inherit' : '#6e5ca8',
              },
              opacity: currentPath === '/books' ? 0.6 : 1,
            }}
          >
            <BookIcon sx={{ color: '#ffffff', marginRight: '16px' }} />
            <ListItemText primary="Books" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#f7f7f7', padding: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
