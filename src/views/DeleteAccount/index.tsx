import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CancelButton from 'components/CancelButton';
import { Trans, useTranslation } from 'react-i18next';

const DeleteAccount = () => {
  const [translation] = useTranslation('profile');

  return (
    <Box component="main" maxWidth={400} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h4" component="h1" textAlign="center">
        {translation('delete.heading')}
      </Typography>
      <Typography marginBottom={10} textAlign="center" fontSize="1.25rem">
        <Trans defaults={translation('delete.content')} components={[<strong key="delete" />]} />
      </Typography>
      <Stack direction="row" spacing={2.5}>
        <CancelButton>{translation('delete.action.cancel')}</CancelButton>
        <Button variant="contained" fullWidth size="large" color="error">
          {translation('delete.action.delete')}
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteAccount;
