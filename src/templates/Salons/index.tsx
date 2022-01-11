import { Container, Stack, Typography } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import Spinner from 'components/Spinner';
import { CustomSalonsNavigation } from './salons.styled';
import NavTabs from './salons.navtabs';
import SalonsNavigation from 'components/AdminPanelNavigation/adminPanelNavigation.list';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

const SalonsTemplate = ({ children }: { children?: ReactNode }) => {
  const [translation] = useTranslation('admin');
  const userId = useSelector((state: RootState) => state.user?.id) as string;
  const { data = { salons: [], message: '' }, isFetching, isError } = useFetchAllSalonsQuery({ userId });

  const history = useHistory();

  useEffect(() => {
    isFetching === false && data.salons.length ? history.replace(`/salons/${data.salons[0]._id}/details`) : null;
  }, [isFetching]);

  if (isFetching) return <Spinner />;

  if (isError)
    return (
      <Typography variant="h5" textAlign="center" marginTop={5}>
        {translation('salonTemplate.error')}
      </Typography>
    );

  return (
    <Container maxWidth={false}>
      <Stack direction="row" spacing={2}>
        <CustomSalonsNavigation>
          <SalonsNavigation data={data} />
        </CustomSalonsNavigation>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          {data.salons.length > 0 ? (
            <>
              <NavTabs />
              {children}
            </>
          ) : (
            <Box height="100%" display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h5" textAlign="center">
                <Trans defaults={translation('salonTemplate.noSalons')} components={[<br key="breakLine" />]} />
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default SalonsTemplate;
