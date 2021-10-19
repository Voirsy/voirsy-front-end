import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const DeleteAccount = () => {
  const [translation] = useTranslation();

  return (
    <main>
      <div>
        <Typography variant="h3" component="h1" textAlign="center">
          {translation('profile:delete.heading')}
        </Typography>
        <Typography textAlign="center" maxWidth={400} margin="60px auto 0" fontSize="1.35rem">
          <Trans defaults={translation('profile:delete.content')} components={[<strong key="delete" />]} />
        </Typography>
        <Box maxWidth={400} margin="80px auto 0" display="flex" gap={2.5}>
          <Button variant="outlined" fullWidth size="large" color="info" component={Link} to="/">
            {translation('profile:delete.action.cancel')}
          </Button>
          <Button variant="contained" fullWidth size="large" color="error">
            {translation('profile:delete.action.delete')}
          </Button>
        </Box>
      </div>
    </main>
  );
};

export default DeleteAccount;
