import { MenuOutlined, PersonOutlined, DeleteOutlined, LockOpenOutlined, CloseOutlined } from '@mui/icons-material';
import { Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CustomDrawer, CustomList, CustomToolbar } from './profileNavigation.styles';

const ProfileNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <MenuOutlined />
      </IconButton>
      <CustomDrawer open={isOpen}>
        <CustomToolbar>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseOutlined />
          </IconButton>
        </CustomToolbar>
        <Divider />
        <CustomList>
          <ListItem component={NavLink} activeClassName="selected" to="/profile/edit">
            <ListItemIcon>
              <PersonOutlined />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem component={NavLink} activeClassName="selected" to="/profile/password">
            <ListItemIcon>
              <LockOpenOutlined />
            </ListItemIcon>
            <ListItemText primary="Password" />
          </ListItem>
          <ListItem component={NavLink} activeClassName="selected" to="/profile/delete">
            <ListItemIcon>
              <DeleteOutlined />
            </ListItemIcon>
            <ListItemText primary="Delete account" />
          </ListItem>
        </CustomList>
      </CustomDrawer>
    </>
  );
};

export default ProfileNavigation;
