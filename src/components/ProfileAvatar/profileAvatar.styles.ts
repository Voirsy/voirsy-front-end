import { Avatar } from '@mui/material';
import { styled } from '@mui/system';
import theme from 'theme';

export const CustomDropzoneContainer = styled('div')(() => ({
  margin: '0 auto 80px',
  position: 'relative',
  width: 216,

  '.files-dropzone::after': {
    content: "'Drop files here'",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
    position: 'absolute',
    inset: 0,
    fontSize: theme.typography.h6.fontSize,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: 'transparent',
    transition: `background-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}, color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} `,
  },

  '.files-dropzone-active::after': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const CustomAvatar = styled(Avatar)(() => ({
  width: 216,
  height: 216,
}));

export const CustomInput = styled('input')(() => ({
  display: 'none',
}));

export const CustomUploadWrapper = styled('div')(() => ({
  position: 'absolute',
  bottom: '5%',
  right: '5%',
  background: theme.palette.secondary.main,
  borderRadius: '50%',
  zIndex: 4,
  border: `2px solid ${theme.palette.common.white}`,
  cursor: 'pointer',
  '& svg': {
    fill: theme.palette.common.white,
  },
}));
