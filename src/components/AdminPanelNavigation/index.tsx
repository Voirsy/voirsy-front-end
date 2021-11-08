import { RoomOutlined, CloseOutlined } from '@mui/icons-material';
import { CardActionArea, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { CustomCard, CustomDrawer, CustomToolbar } from './adminPanelNavigation.styled';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminPanelNavigation = ({ isMenuOpen, handleClose }: { isMenuOpen: boolean; handleClose: () => void }) => {
  const [translation] = useTranslation();
  const location = useLocation();
  const { data = [] } = useFetchAllSalonsQuery();

  useEffect(() => handleClose(), [location]);

  return (
    <CustomDrawer open={isMenuOpen} variant="temporary">
      <CustomToolbar>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </CustomToolbar>
      <Box p={2}>
        <Stack spacing={2.5}>
          <Typography variant="h5">{translation('admin:salonTemplate.heading.salonName')}</Typography>
          {data.length > 0 &&
            data.map(({ _id, name, address }) => (
              <CustomCard key={_id}>
                <Link to={`/salons/${_id}/edit`}>
                  <CardActionArea>
                    <CardContent>
                      <Typography marginBottom={1.25} variant="h6" noWrap>
                        {name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <RoomOutlined />
                        <Typography variant="body2" noWrap>
                          {address}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </CustomCard>
            ))}
        </Stack>
      </Box>
    </CustomDrawer>
  );
};

export default AdminPanelNavigation;
