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
import { useParams } from 'react-router-dom';
import { useAddServiceMutation } from 'store/api/admin/admin';
import theme from 'theme';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Service } from 'models/admin.model';

const ServiceDialog = ({ open, close }: { open: boolean; close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'all' });
  const [translation] = useTranslation('admin');
  const [addService, { isSuccess, isError }] = useAddServiceMutation();
  const { salonId } = useParams<{ salonId: string }>();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddService = (data: Pick<Service, 'name' | 'duration' | 'price' | 'description'>) => {
    addService({ salonId, ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(translation('serviceDialog.operationSuccess'), {
        variant: 'success',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    }
    if (isError) {
      enqueueSnackbar(translation('serviceDialog.operationSuccess'), {
        variant: 'success',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    }
    return () => close();
  }, [isSuccess, isError]);

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
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:serviceDialog.price')}
                  type="number"
                  {...register('price')}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">???</InputAdornment>,
                    inputProps: { min: 0 },
                  }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
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
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:serviceDialog.description')}
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Stack>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: theme.spacing(2, 3) }}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          disabled={!isDirty || !isValid}
          onClick={handleSubmit(handleAddService)}
        >
          {translation('admin:confirmButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceDialog;
