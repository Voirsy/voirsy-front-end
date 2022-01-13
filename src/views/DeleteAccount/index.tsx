import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CancelButton from 'components/CancelButton';
import { Trans, useTranslation } from 'react-i18next';
import { useDeleteAccountMutation } from 'store/api/profile';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../helpers/auth';

const DeleteAccount = () => {
  const [deleteAccount, { isSuccess, isError, isLoading }] = useDeleteAccountMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [translation] = useTranslation('profile');
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(translation('delete.successMsg'), { variant: 'success' });
      logOut(history.push);
    }
    if (isError) enqueueSnackbar(translation('delete.errorMsg'), { variant: 'error' });
  }, [isSuccess, isError]);

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
        <Button
          disabled={isLoading}
          variant="contained"
          fullWidth
          size="large"
          color="error"
          onClick={() => deleteAccount()}
        >
          {isLoading ? <CircularProgress size={25} /> : translation('delete.action.delete')}
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteAccount;
