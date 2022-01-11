import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { CustomDrawer, CustomToolbar } from './adminPanelNavigation.styled';
import SalonsNavigation from './adminPanelNavigation.list';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

const AdminPanelNavigation = ({ isMenuOpen, handleClose }: { isMenuOpen: boolean; handleClose: () => void }) => {
  const location = useLocation();
  const userId = useSelector((state: RootState) => state.user?.id) as string;
  const { data = { salons: [], message: '' } } = useFetchAllSalonsQuery({ userId });

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
