import { Button, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import Spinner from 'components/Spinner';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { CustomEditHeader, CustomSalonsNavigation } from './salons.styled';
import { CustomCard } from 'components/AdminPanelNavigation/adminPanelNavigation.styled';
import { RoomOutlined } from '@mui/icons-material';
import NavTabs from './salons.navtabs';

const SalonsTemplate = ({ children }: { children: ReactNode }) => {
  const [translation] = useTranslation();
  const { data = [], isFetching, isError } = useFetchAllSalonsQuery();

  if (isError)
    return (
      <Typography variant="h5" textAlign="center" marginTop={5}>
        {translation('admin:salonTemplate.error')}
      </Typography>
    );

  if (isFetching) return <Spinner />;

  return (
    <Stack direction="row">
      <CustomSalonsNavigation p={2}>
        <Stack spacing={2.5}>
          <Typography variant="h5">My salons</Typography>
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
      </CustomSalonsNavigation>
      <Box p={2} width="100%">
        <CustomEditHeader>
          <Typography variant="h5">{translation('admin:salonTemplate.heading.salonName')}</Typography>
          <Button variant="outlined" color="error" size="small">
            {translation('admin:salonTemplate.deleteSalon')}
          </Button>
        </CustomEditHeader>
        <NavTabs />
        <div>{children}</div>
      </Box>
    </Stack>
  );
};

export default SalonsTemplate;
