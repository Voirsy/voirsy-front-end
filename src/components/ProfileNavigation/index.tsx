import {
  PersonOutlined,
  DeleteOutlined,
  LockOpenOutlined,
  CloseOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import { IconButton, ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CustomDrawer, CustomList, CustomToolbar } from './profileNavigation.styles';

const navigationElements = [
  {
    link: '/profile/edit',
    text: 'Account',
    icon: <PersonOutlined />,
  },
  {
    link: '/profile/password',
    text: 'Password',
    icon: <LockOpenOutlined />,
  },
  {
    link: '/profile/delete',
    text: 'Delete account',
    icon: <DeleteOutlined />,
  },
  {
    link: '/profile/favorites',
    text: 'Favorites',
    icon: <FavoriteBorderOutlined />,
  },
];

const ProfileNavigation = ({ isMenuOpen, handleClose }: { isMenuOpen: boolean; handleClose: () => void }) => {
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => handleClose(), [location]);

  return (
    <CustomDrawer open={isMenuOpen} variant={matches ? 'temporary' : 'permanent'}>
      <CustomToolbar>
        {matches ? (
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        ) : null}
      </CustomToolbar>
      <CustomList>
        {navigationElements.map(({ icon, link, text }) => (
          <ListItem button key={link} component={NavLink} activeClassName="selected" to={link}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </CustomList>
    </CustomDrawer>
  );
};

export default ProfileNavigation;
