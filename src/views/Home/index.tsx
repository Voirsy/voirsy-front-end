import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Filters from 'components/Filters';
import SalonCard from 'components/SalonCard';
import { SalonType } from 'enums/salonType.enum';
import { useCallback, useEffect } from 'react';
import { useLazyFetchAllSalonsQuery } from 'store/api/salons';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [translation] = useTranslation();
  const [fetchAllSalons, { isError, data = [], isFetching }] = useLazyFetchAllSalonsQuery();

  const handleFetching = useCallback((location: string, sortBy: string, salonType: string, search: string) => {
    fetchAllSalons({ location, sortBy, salonType, search });
  }, []);

  useEffect(() => {
    fetchAllSalons({});
  }, []);

  if (isError) return <Typography>{translation('home:error.unknown')}</Typography>;

  return (
    <main>
      <Filters handleFetching={handleFetching} />
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        {isFetching && (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {!isFetching && data.length > 0 && (
          <Grid container spacing={3}>
            {data.map((el, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <SalonCard
                  _id={el._id}
                  address={el.address}
                  city={el.city}
                  imageUrl={el.imageUrl}
                  name={el.name}
                  salonType={el.type as SalonType[]}
                  rating={el.rating}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {!isFetching && data.length === 0 && <Typography variant="h5">There are no salons to show</Typography>}
      </Container>
    </main>
  );
};

export default Home;
