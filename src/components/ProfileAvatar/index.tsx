import { PhotoCamera } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import Files from 'react-files';
import { CustomInput, CustomUploadWrapper, DropzoneContainer } from './profileAvatar.styles';

const ProfileAvatar = ({
  url,
  handleChangeImg,
}: {
  url: string;
  handleChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <DropzoneContainer>
    <Files accepts={['image/*']} multiple={false} maxFileSize={2000000} clickable={false}>
      <Box position="relative" width="fit-content">
        <Avatar alt="Alex Smith" sx={{ width: 216, height: 216 }} src={url} />
        <CustomUploadWrapper>
          <label htmlFor="icon-button-file">
            <CustomInput accept="image/*" id="icon-button-file" type="file" onChange={(e) => handleChangeImg(e)} />
            <IconButton color="inherit" aria-label="upload picture" component="span" size="large">
              <PhotoCamera />
            </IconButton>
          </label>
        </CustomUploadWrapper>
      </Box>
    </Files>
  </DropzoneContainer>
);

export default ProfileAvatar;
