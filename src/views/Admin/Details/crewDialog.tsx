import { CloseOutlined } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { ENV } from 'config/enviroments';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAddCrewMemberMutation } from 'store/api/admin/admin';
import { useSnackbar } from 'notistack';
import theme from 'theme';

const CrewDialog = ({ open, close }: { open: boolean; close: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'all' });

  const { salonId } = useParams<{ salonId: string }>();
  const [addCrewMember, { isSuccess, isError }] = useAddCrewMemberMutation();
  const [translation] = useTranslation('admin');
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const showAvatarPreview = (event: any) => {
    const file = event?.target?.files?.[0];
    const fileSrc = URL.createObjectURL(file);
    setValue('avatar', file);
    setAvatarPreview(fileSrc);
  };

  //clean up for avatarPreview, when is set and close dialog to add new crew member
  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(translation('crewDialog.operationSuccess'), {
        variant: 'success',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    }
    if (isError) {
      enqueueSnackbar(translation('crewDialog.operationError'), {
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    }
    return () => {
      close();
      setAvatarPreview(undefined);
    };
  }, [isSuccess, isError]);

  const addMember = async (data: { avatar: File; fullname: string }) => {
    const fullname = data.fullname;
    let avatarUrl = '';
    if (data.avatar) {
      const formData = new FormData();
      formData.append('avatar', data.avatar);
      try {
        const response = await axios({
          method: 'post',
          url: `${ENV.apiUrl}/image-upload`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        avatarUrl = response.data.links[0];
      } catch (error) {
        console.error(error);
      }
    }
    addCrewMember({ salonId, avatarUrl, fullname });
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          {translation('admin:crewDialog.title')}
          <IconButton onClick={close}>
            <CloseOutlined />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center" paddingTop={3}>
          <Grid item xs={8}>
            <form>
              <Stack spacing={2} direction="row" alignItems="center">
                <input
                  type="file"
                  id="avatar-image-upload"
                  accept="image/png, image/jpeg"
                  onChange={(event) => showAvatarPreview(event)}
                  hidden
                />
                <label htmlFor="avatar-image-upload">
                  <Avatar sx={{ width: 48, height: 48 }} src={avatarPreview} />
                </label>
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:crewDialog.fullname')}
                  {...register('fullname', {
                    required: { value: true, message: translation('crewDialog.form.required') },
                  })}
                  sx={{ flexGrow: 1 }}
                  error={!!errors.fullname}
                  helperText={errors.fullname?.message}
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
          onClick={handleSubmit(addMember)}
        >
          {translation('admin:confirmButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrewDialog;
