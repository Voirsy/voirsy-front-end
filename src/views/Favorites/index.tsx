import { Grid, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import { useFetchAllUsersFavoritesQuery } from 'store/api/profile';
import theme from 'theme';
import { SalonType } from 'enums/salonType.enum';
import SalonCard from 'components/SalonCard';

const Favorites = () => {
  const [translation] = useTranslation('profile');
  const { data = [], isError, isFetching } = useFetchAllUsersFavoritesQuery();
  const match = useMediaQuery(theme.breakpoints.up('lg'));

  if (isFetching) return <Spinner />;

  if (isError) return <Typography textAlign="center">{translation('favorites.error.unknown')}</Typography>;

  return (
    <Box component="main" maxWidth={match ? 700 : 380} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h4" component="h1" textAlign="center">
        {translation('favorites.heading')}
      </Typography>
      {data.length > 0 ? (
        <Grid container spacing={2}>
          {data.map((el) => (
            <Grid key={el._id} item xs={12} lg={6}>
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
      ) : (
        <Typography>{translation('favorites.error.noFavorites')}</Typography>
      )}
    </Box>
  );
};

export default Favorites;
