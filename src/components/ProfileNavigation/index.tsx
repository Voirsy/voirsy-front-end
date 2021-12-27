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
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { CustomDrawer, CustomList, CustomToolbar } from './profileNavigation.styles';

const ProfileNavigation = ({ isMenuOpen, handleClose }: { isMenuOpen: boolean; handleClose: () => void }) => {
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [translation] = useTranslation('profile');

  useEffect(() => handleClose(), [location]);

  const navigationElements = [
    {
      link: '/profile/edit',
      text: translation('navigation.account'),
      icon: <PersonOutlined />,
    },
    {
      link: '/profile/password',
      text: translation('navigation.password'),
      icon: <LockOpenOutlined />,
    },
    {
      link: '/profile/delete',
      text: translation('navigation.deleteAccount'),
      icon: <DeleteOutlined />,
    },
    {
      link: '/profile/favorites',
      text: translation('navigation.favorites'),
      icon: <FavoriteBorderOutlined />,
    },
  ];

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
