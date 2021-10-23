import { PhotoCamera } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import Files from 'react-files';
import { useTranslation } from 'react-i18next';
import { CustomDropzoneContainer, CustomUploadWrapper } from './profileAvatar.styles';

const ProfileAvatar = ({ url, handleChangeImg }: { url: string; handleChangeImg: (e: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [t] = useTranslation();

  const onError = ({ code }: { code: number; message: string }) => {
    if (code === 1) enqueueSnackbar(t('profile:edit.file.errors.invalid'), { variant: 'error' });
    if (code === 2) enqueueSnackbar(t('profile:edit.file.errors.tooLarge'), { variant: 'error' });
    if (code === 3) enqueueSnackbar(t('profile:edit.file.errors.tooSmall'), { variant: 'error' });
    if (code === 4) enqueueSnackbar(t('profile:edit.file.errors.fileReached'), { variant: 'error' });
  };

  return (
    <CustomDropzoneContainer>
      <Files
        accepts={['image/*']}
        multiple={false}
        maxFileSize={2000000}
        clickable={false}
        onChange={handleChangeImg}
        onError={onError}
      >
        <Box position="relative" width="fit-content">
          <Avatar alt="Alex Smith" sx={{ width: 216, height: 216 }} src={url} />
          <CustomUploadWrapper>
            <Files
              accepts={['image/*']}
              multiple={false}
              maxFileSize={2000000}
              onChange={handleChangeImg}
              onError={onError}
            >
              <IconButton color="inherit" aria-label={t('profile:edit.file.uploadAria')} component="span" size="large">
                <PhotoCamera />
              </IconButton>
            </Files>
          </CustomUploadWrapper>
        </Box>
      </Files>
    </CustomDropzoneContainer>
  );
};

export default ProfileAvatar;
