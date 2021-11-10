import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import {
  PersonOutlineRounded,
  FavoriteBorderRounded,
  CalendarTodayRounded,
  ExitToAppRounded,
  StoreRounded,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HeaderNavigation = ({
  open,
  anchorEl,
  onClose,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    onClick={onClose}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem component={Link} to="/profile/edit">
      <ListItemIcon>
        <PersonOutlineRounded />
      </ListItemIcon>
      Profile
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <FavoriteBorderRounded />
      </ListItemIcon>
      Favorites
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <CalendarTodayRounded />
      </ListItemIcon>
      Schedule
    </MenuItem>
    <MenuItem component={Link} to="/salons">
      <ListItemIcon>
        <StoreRounded />
      </ListItemIcon>
      Business
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <ExitToAppRounded />
      </ListItemIcon>
      Sign out
    </MenuItem>
  </Menu>
);

export default HeaderNavigation;
