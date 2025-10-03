import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Typography, Box, InputBase, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { Search as SearchIcon, Home, Explore, Bookmarks, Person, ExitToApp, Menu as MenuIcon } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const Layout = ({ children }) => {
  const { profile, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Feed', icon: <Home />, path: '/feed' },
    { label: 'Explore', icon: <Explore />, path: '/feed' },
    { label: 'Bookmarks', icon: <Bookmarks />, path: '/feed' },
    { label: 'Profile', icon: <Person />, path: `/profile/${profile?.username}` },
  ];

  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100%', pt: 2 }}>
      <Box sx={{ px: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          DevConnect
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{
              bgcolor: location.pathname === item.path ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
              borderLeft: location.pathname === item.path ? '3px solid #7C3AED' : 'none',
              '&:hover': { bgcolor: 'rgba(124, 58, 237, 0.05)' }
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: 'primary.main', cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/feed')}
          >
            DevConnect
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                bgcolor: 'background.default',
                borderRadius: 2,
                px: 2,
                py: 0.5,
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase placeholder="Search..." sx={{ color: 'text.primary' }} />
            </Box>
            <IconButton onClick={handleMenu}>
              <Avatar src={profile?.avatarUrl} alt={profile?.fullName} sx={{ width: 36, height: 36 }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { navigate(`/profile/${profile?.username}`); handleClose(); }}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      )}

      <Box sx={{ display: 'flex', flex: 1 }}>
        {!isMobile && (
          <Box sx={{ width: 250, position: 'sticky', top: 64, height: 'calc(100vh - 64px)', overflow: 'auto', borderRight: '1px solid', borderColor: 'divider' }}>
            {drawer}
          </Box>
        )}
        <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
