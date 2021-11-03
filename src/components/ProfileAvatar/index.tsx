import { PhotoCamera } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import Files from 'react-files';
import { useTranslation } from 'react-i18next';
import { CustomAvatar, CustomDropzoneContainer, CustomUploadWrapper } from './profileAvatar.styles';

const ProfileAvatar = ({ url, handleChangeImg }: { url: string; handleChangeImg: (e: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [translation] = useTranslation();

  // error codes come from react-files documentation: https://github.com/mother/react-files#props
  const onError = ({ code }: { code: number; message: string }) => {
    if (code === 1) enqueueSnackbar(translation('validation:file.invalid'), { variant: 'error' });
    if (code === 2) enqueueSnackbar(translation('validation:file.tooLarge'), { variant: 'error' });
    if (code === 3) enqueueSnackbar(translation('validation:file.tooSmall'), { variant: 'error' });
    if (code === 4) enqueueSnackbar(translation('validation:file.fileReached'), { variant: 'error' });
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
          <CustomAvatar alt="Avatar image" src={url} />
          <CustomUploadWrapper>
            <Files
              accepts={['image/*']}
              multiple={false}
              maxFileSize={2000000}
              onChange={handleChangeImg}
              onError={onError}
            >
              <IconButton
                color="inherit"
                aria-label={translation('profile:edit.form.file.uploadAria')}
                component="span"
                size="large"
              >
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
