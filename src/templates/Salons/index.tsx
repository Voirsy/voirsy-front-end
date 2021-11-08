import { Button, Stack, Typography } from '@mui/material';
import Spinner from 'components/Spinner';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { Box } from '@mui/system';
import { CustomEditHeader, CustomSalonsNavigation } from './salons.styled';
import NavTabs from './salons.navtabs';
import SalonsNavigation from 'components/AdminPanelNavigation/adminPanelNavigation.list';

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
        <SalonsNavigation data={data} />
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
