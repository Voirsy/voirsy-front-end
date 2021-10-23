import { PhotoCamera } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import Files from 'react-files';
import { CustomDropzoneContainer, CustomUploadWrapper } from './profileAvatar.styles';

const ProfileAvatar = ({ url, handleChangeImg }: { url: string; handleChangeImg: (e: any) => void }) => (
  <CustomDropzoneContainer>
    <Files
      accepts={['image/*']}
      multiple={false}
      maxFileSize={2000000}
      clickable={false}
      onChange={(file: any) => handleChangeImg(file)}
    >
      <Box position="relative" width="fit-content">
        <Avatar alt="Alex Smith" sx={{ width: 216, height: 216 }} src={url} />
        <CustomUploadWrapper>
          <Files
            accepts={['image/*']}
            multiple={false}
            maxFileSize={2000000}
            onChange={(file: any) => handleChangeImg(file)}
          >
            <label htmlFor="icon-button-file">
              <IconButton color="inherit" aria-label="upload picture" component="span" size="large">
                <PhotoCamera />
              </IconButton>
            </label>
          </Files>
        </CustomUploadWrapper>
      </Box>
    </Files>
  </CustomDropzoneContainer>
);

export default ProfileAvatar;
