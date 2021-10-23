import { PhotoCamera } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { CustomInput, CustomUploadWrapper } from './profileAvatar.styles';

const ProfileAvatar = ({ url }: { url: string }) => (
  <Box margin="0 auto 80px" position="relative" width="fit-content">
    <Avatar alt="Alex Smith" sx={{ margin: '0 auto', width: 216, height: 216 }} src={url} />
    <CustomUploadWrapper>
      <label htmlFor="icon-button-file">
        <CustomInput accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="inherit" aria-label="upload picture" component="span" size="large">
          <PhotoCamera />
        </IconButton>
      </label>
    </CustomUploadWrapper>
  </Box>
);

export default ProfileAvatar;
