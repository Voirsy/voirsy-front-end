import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const DeleteAccount = () => {
  const [translation] = useTranslation();

  return (
    <Box component="main" maxWidth={400} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h3" component="h1" textAlign="center">
        {translation('profile:delete.heading')}
      </Typography>
      <Typography marginBottom={10} textAlign="center" fontSize="1.35rem">
        <Trans defaults={translation('profile:delete.content')} components={[<strong key="delete" />]} />
      </Typography>
      <Stack direction="row" spacing={2.5}>
        <Button variant="outlined" fullWidth size="large" color="info" component={Link} to="/">
          {translation('profile:delete.action.cancel')}
        </Button>
        <Button variant="contained" fullWidth size="large" color="error">
          {translation('profile:delete.action.delete')}
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteAccount;
