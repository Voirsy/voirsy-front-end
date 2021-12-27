import { ListItemIcon, Menu } from '@mui/material';
import {
  PersonOutlineRounded,
  FavoriteBorderRounded,
  CalendarTodayRounded,
  ExitToAppRounded,
  StoreRounded,
} from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { logOut } from 'helpers/auth';
import { CustomMenuItem } from './header.styles';
import { useTranslation } from 'react-i18next';

const HeaderNavigation = ({
  open,
  anchorEl,
  onClose,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) => {
  const role = useSelector((state: RootState) => state.user?.role);
  const history = useHistory();
  const [translation] = useTranslation('header');

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <CustomMenuItem component={Link} to="/profile/edit">
        <ListItemIcon>
          <PersonOutlineRounded />
        </ListItemIcon>
        {translation('navigation.profile')}
      </CustomMenuItem>
      {role === 'STANDARD' && (
        <CustomMenuItem component={Link} to="/profile/favorites">
          <ListItemIcon>
            <FavoriteBorderRounded />
          </ListItemIcon>
          {translation('navigation.favorites')}
        </CustomMenuItem>
      )}
      {role === 'STANDARD' && (
        <CustomMenuItem>
          <ListItemIcon>
            <CalendarTodayRounded />
          </ListItemIcon>
          {translation('navigation.schedule')}
        </CustomMenuItem>
      )}
      {role === 'BUSINESS' && (
        <CustomMenuItem component={Link} to="/salons">
          <ListItemIcon>
            <StoreRounded />
          </ListItemIcon>
          {translation('navigation.business')}
        </CustomMenuItem>
      )}
      <CustomMenuItem onClick={() => logOut(history.push)}>
        <ListItemIcon>
          <ExitToAppRounded />
        </ListItemIcon>
        {translation('navigation.signOut')}
      </CustomMenuItem>
    </Menu>
  );
};

export default HeaderNavigation;
