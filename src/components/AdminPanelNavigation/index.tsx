import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { CustomDrawer, CustomToolbar } from './adminPanelNavigation.styled';
import SalonsNavigation from './adminPanelNavigation.list';

const AdminPanelNavigation = ({ isMenuOpen, handleClose }: { isMenuOpen: boolean; handleClose: () => void }) => {
  const location = useLocation();
  const { data = { salons: [], message: '' } } = useFetchAllSalonsQuery();

  useEffect(() => handleClose(), [location]);

  return (
    <CustomDrawer open={isMenuOpen} variant="temporary">
      <CustomToolbar>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </CustomToolbar>
      <Box padding={2}>
        <SalonsNavigation data={data} />
      </Box>
    </CustomDrawer>
  );
};

export default AdminPanelNavigation;
