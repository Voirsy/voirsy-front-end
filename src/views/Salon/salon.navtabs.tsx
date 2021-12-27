import { Tab, Tabs, Box, useMediaQuery } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import theme from 'theme';

const NavTabs = ({ currentTab }: { currentTab: string | undefined }) => {
  const { salonId } = useParams<{ salonId: string }>();
  const [translation] = useTranslation('salon');
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box paddingLeft={matches ? 0 : 2} maxWidth="100%">
      <Tabs
        aria-label={translation('salon:nav.aria')}
        value={currentTab}
        variant={matches ? 'fullWidth' : 'standard'}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab component={Link} label={translation('salon:nav.info')} value="/:salonId" to={`/${salonId}`} />
        <Tab
          component={Link}
          label={translation('salon:nav.reviews')}
          value="/:salonId/reviews"
          to={`/${salonId}/reviews`}
        />
        <Tab
          component={Link}
          label={translation('salon:nav.portfolio')}
          value="/:salonId/portfolio"
          to={`/${salonId}/portfolio`}
        />
      </Tabs>
    </Box>
  );
};

export default NavTabs;
