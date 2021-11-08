import { Tab, Tabs, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, Link } from 'react-router-dom';

const NavTabs = () => {
  const matches = useMediaQuery('(max-width:400px)');
  const routeMatch = useRouteMatch([
    '/salons/:salonId/schedule',
    '/salons/:salonId/portfolio',
    '/salons/:salonId/edit',
  ]);
  const currentTab = routeMatch?.path;
  const [translation] = useTranslation();

  return (
    <Box>
      <Tabs
        aria-label={translation('admin:salonTemplate.nav.aria')}
        value={currentTab}
        variant={matches ? 'fullWidth' : 'standard'}
      >
        <Tab
          component={Link}
          label={translation('admin:salonTemplate.nav.edit')}
          value="/salons/:salonId/edit"
          to="/salons/540d638c-44b1-4aa7-a4b3-289decfa2968/edit"
        />
        <Tab
          component={Link}
          label={translation('admin:salonTemplate.nav.schedule')}
          value="/salons/:salonId/schedule"
          to="/salons/540d638c-44b1-4aa7-a4b3-289decfa2968/schedule"
        />
        <Tab
          component={Link}
          label={translation('admin:salonTemplate.nav.portfolio')}
          value="/salons/:salonId/portfolio"
          to="/salons/540d638c-44b1-4aa7-a4b3-289decfa2968/portfolio"
        />
      </Tabs>
    </Box>
  );
};

export default NavTabs;
