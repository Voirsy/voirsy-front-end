import { Button, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import Spinner from 'components/Spinner';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { Link, useRouteMatch } from 'react-router-dom';
import { Box } from '@mui/system';
import { CustomEditHeader } from './salons.styled';

interface LinkTabProps {
  label: string;
  to: string;
  value: string;
}

const LinkTab = (props: LinkTabProps) => <Tab component={Link} {...props} />;

const SalonsTemplate = ({ children }: { children: ReactNode }) => {
  const matches = useMediaQuery('(max-width:400px)');
  const [translation] = useTranslation();
  const { data = [], isFetching, isError } = useFetchAllSalonsQuery();
  const routeMatch = useRouteMatch([
    '/salons/:salonId/schedule',
    '/salons/:salonId/portfolio',
    '/salons/:salonId/edit',
  ]);
  const currentTab = routeMatch?.path;

  if (isError)
    return (
      <Typography variant="h5" textAlign="center" marginTop={5}>
        {translation('admin:salonTemplate.error')}
      </Typography>
    );

  if (isFetching) return <Spinner />;

  return (
    <Box p={2}>
      <CustomEditHeader>
        <Typography variant="h5">{translation('admin:salonTemplate.heading.salonName')}</Typography>
        <Button variant="outlined" color="error" size="small">
          {translation('admin:salonTemplate.deleteSalon')}
        </Button>
      </CustomEditHeader>
      <Box>
        <Tabs
          aria-label={translation('admin:salonTemplate.nav.aria')}
          value={currentTab}
          variant={matches ? 'fullWidth' : 'standard'}
        >
          <LinkTab
            label={translation('admin:salonTemplate.nav.edit')}
            value="/salons/:salonId/edit"
            to="/salons/540d638c-44b1-4aa7-a4b3-289decfa2968/edit"
          />
          <LinkTab
            label={translation('admin:salonTemplate.nav.schedule')}
            value="/salons/:salonId/schedule"
            to="/salons/540d638c-44b1-4aa7-a4b3-289decfa2968/schedule"
          />
          <LinkTab
            label={translation('admin:salonTemplate.nav.portfolio')}
            value="/salons/:salonId/portfolio"
            to="/salons/540d638c-44b1-4aa7-a4b3-289decfa2968/portfolio"
          />
        </Tabs>
      </Box>
      <div>{children}</div>
    </Box>
  );
};

export default SalonsTemplate;
