import { Tab, Tabs, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, Link, useParams } from 'react-router-dom';
import theme from 'theme';

const NavTabs = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const routeMatch = useRouteMatch([
    '/salons/:salonId/calendar',
    '/salons/:salonId/portfolio',
    '/salons/:salonId/details',
  ]);
  const currentTab = routeMatch?.path;
  const [translation] = useTranslation('admin');

  return (
    <Tabs
      aria-label={translation('salonTemplate.nav.aria')}
      value={currentTab}
      variant={matches ? 'fullWidth' : 'standard'}
    >
      <Tab
        component={Link}
        label={translation('salonTemplate.nav.edit')}
        value="/salons/:salonId/edit"
        to={`/salons/${salonId}/edit`}
      />
      <Tab
        component={Link}
        label={translation('salonTemplate.nav.schedule')}
        value="/salons/:salonId/schedule"
        to={`/salons/${salonId}/schedule`}
      />
      <Tab
        component={Link}
        label={translation('salonTemplate.nav.portfolio')}
        value="/salons/:salonId/portfolio"
        to={`/salons/${salonId}/portfolio`}
      />
    </Tabs>
  );
};

export default NavTabs;
