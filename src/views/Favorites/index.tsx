import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import { useFetchAllUsersFavoritesQuery } from 'store/api/profile';
import theme from 'theme';

const Favorites = () => {
  const [translation] = useTranslation();
  const { data = [], isError, isFetching } = useFetchAllUsersFavoritesQuery();
  const match = useMediaQuery(theme.breakpoints.up('lg'));

  if (isFetching) return <Spinner />;

  if (isError) return <Typography textAlign="center">{translation('profile:favorites.error.unknown')}</Typography>;

  return (
    <Box component="main" maxWidth={match ? 700 : 380} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h4" component="h1" textAlign="center">
        {translation('profile:favorites.heading')}
      </Typography>
      {data.length > 0 ? (
        <Grid container spacing={2}>
          {data.map((el) => (
            <Grid key={el._id} item xs={12} lg={6}>
              <Card>
                <CardMedia component="img" height="200" image={el.imageUrl} alt={el.name} />
                <CardContent>
                  <Typography noWrap variant="h6">
                    {el.name}
                  </Typography>
                  <Typography noWrap variant="subtitle2">
                    {el.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="error">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>{translation('profile:favorites.error.noFavorites')}</Typography>
      )}
    </Box>
  );
};

export default Favorites;
