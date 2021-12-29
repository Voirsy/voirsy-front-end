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
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import theme from 'theme';

const CrewDialog = ({ open, close }: { open: boolean; close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm();
  const [translation] = useTranslation();

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
                  onChange={(event) => console.log(event?.target?.files![0])}
                  hidden
                />
                <label htmlFor="avatar-image-upload">
                  <Avatar sx={{ width: 48, height: 48 }} />
                </label>
                <TextField
                  size="small"
                  variant="outlined"
                  label={translation('admin:crewDialog.fullname')}
                  {...register('Fullname')}
                  sx={{ flexGrow: 1 }}
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

export default CrewDialog;
