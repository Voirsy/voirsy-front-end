import { MenuOutlined } from '@mui/icons-material';
import { Theme, Typography, useMediaQuery, Avatar } from '@mui/material';
import ProfileNavigation from 'components/ProfileNavigation';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';
import {
  CustomToolbar,
  CustomButton,
  CustomAppBar,
  CustomMenuButton,
  CustomAvatarButton,
  CustomAuthorName,
} from './header.styles';
import { isAuth } from 'helpers/auth';
import AdminPanelNavigation from 'components/AdminPanelNavigation';
import HeaderNavigation from './header.navigation';
import { Box } from '@mui/system';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [translation] = useTranslation();
  const { pathname } = useLocation();
  const fullname = useSelector((state: RootState) => state.user?.fullname);
  const open = Boolean(anchorEl);
  const handleMenuHeaderOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuHeaderClose = () => setAnchorEl(null);
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <CustomAppBar color="transparent" elevation={0} position="relative">
        <CustomToolbar>
          <Box display="flex">
            {(pathname.startsWith('/profile') || pathname.startsWith('/salons')) && !hidden && (
              <CustomMenuButton onClick={() => setIsMenuOpen(true)}>
                <MenuOutlined />
              </CustomMenuButton>
            )}
            <Typography variant="h4" component="h1">
              {translation('header:title')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            {isAuth() ? (
              <>
                <CustomAuthorName variant="body2">{fullname}</CustomAuthorName>
                <CustomAvatarButton onClick={handleMenuHeaderOpen}>
                  <Avatar>S</Avatar>
                </CustomAvatarButton>
              </>
            ) : (
              <Link to="/login">
                <CustomButton variant="contained" color="primary" disableElevation>
                  {translation('header:button.signin')}
                </CustomButton>
              </Link>
            )}
          </Box>
        </CustomToolbar>
      </CustomAppBar>
      <HeaderNavigation open={open} onClose={handleMenuHeaderClose} anchorEl={anchorEl} />
      {isAuth() && pathname.startsWith('/profile') && (
        <ProfileNavigation handleClose={() => setIsMenuOpen(false)} isMenuOpen={isMenuOpen} />
      )}
      {isAuth() && pathname.startsWith('/salons') && (
        <AdminPanelNavigation handleClose={() => setIsMenuOpen(false)} isMenuOpen={isMenuOpen} />
      )}
    </>
  );
};

export default Header;
