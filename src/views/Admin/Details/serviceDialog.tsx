import { CloseOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import theme from 'theme';

const ServiceDialog = ({ open, close }: { open: boolean; close: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm();
  const [translation] = useTranslation();

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          {translation('admin:serviceDialog.title')}
          <IconButton onClick={close}>
            <CloseOutlined />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center" paddingTop={3}>
          <Grid item xs={8}>
            <form>
              <Stack spacing={2}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:serviceDialog.name')}
                  {...register('name')}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:serviceDialog.price')}
                  type="number"
                  {...register('price')}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                    inputProps: { min: 0 },
                  }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:serviceDialog.duration')}
                  type="number"
                  multiline
                  maxRows={4}
                  {...register('duration')}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">min</InputAdornment>,
                    inputProps: { min: 0, step: 1 },
                  }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:serviceDialog.description')}
                  {...register('description')}
                />
              </Stack>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: theme.spacing(2, 3) }}>
        <Button variant="contained" color="primary" disableElevation>
          {translation('admin:confirmButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceDialog;
