import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Filters from 'components/Filters';
import SalonCard from 'components/SalonCard';
import { SalonType } from 'enums/salonType.enum';
import { useEffect } from 'react';
import { useLazyFetchAllSalonsQuery } from 'store/api/home/home';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Home = () => {
  const [translation] = useTranslation('home');
  const [fetchAllSalons, { isError, data = { salons: [], message: '' }, isFetching }] = useLazyFetchAllSalonsQuery();
  const filters = useSelector((state: RootState) => state.salonsFilters);

  useEffect(() => {
    fetchAllSalons({});
  }, []);

  useEffect(() => {
    fetchAllSalons(filters);
  }, [filters]);

  if (isError) return <Typography>{translation('error.unknown')}</Typography>;

  return (
    <main>
      <Filters />
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        {isFetching && (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {!isFetching && data.salons.length > 0 && (
          <Grid container spacing={3}>
            {data.salons.map((el, i) => (
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
        {!isFetching && data.salons.length === 0 && <Typography variant="h5">There are no salons to show</Typography>}
      </Container>
    </main>
  );
};

export default Home;
