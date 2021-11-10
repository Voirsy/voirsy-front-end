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
        Profile
      </CustomMenuItem>
      {role === 'STANDARD' && (
        <>
          <CustomMenuItem>
            <ListItemIcon>
              <FavoriteBorderRounded />
            </ListItemIcon>
            Favorites
          </CustomMenuItem>
          <CustomMenuItem>
            <ListItemIcon>
              <CalendarTodayRounded />
            </ListItemIcon>
            Schedule
          </CustomMenuItem>
        </>
      )}
      {role === 'BUSINESS' && (
        <CustomMenuItem component={Link} to="/salons">
          <ListItemIcon>
            <StoreRounded />
          </ListItemIcon>
          Business
        </CustomMenuItem>
      )}
      <CustomMenuItem onClick={() => logOut(history.push)}>
        <ListItemIcon>
          <ExitToAppRounded />
        </ListItemIcon>
        Sign out
      </CustomMenuItem>
    </Menu>
  );
};

export default HeaderNavigation;
