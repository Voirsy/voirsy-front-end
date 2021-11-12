import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

const Favorites = () => {
  const [translation] = useTranslation();

  return (
    <Box component="main" maxWidth={400} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h4" component="h1" textAlign="center">
        {translation('profile:favorites.heading')}
      </Typography>
    </Box>
  );
};

export default Favorites;
