/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/system';

export const CustomDropzoneContainer = styled('div')(({ theme }) => ({
  margin: '0 auto 80px',
  position: 'relative',
  width: 216,

  '.files-dropzone::after': {
    content: "'Drop files here'",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: (theme.typography as any).fontFamily,
    position: 'absolute',
    inset: 0,
    fontSize: (theme.typography as any).h6.fontSize,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: 'transparent',
    transition: `background-color ${(theme.transitions as any).duration.shorter}ms ${
      (theme.transitions as any).easing.easeInOut
    }, color ${(theme.transitions as any).duration.shorter}ms ${(theme.transitions as any).easing.easeInOut} `,
  },

  '.files-dropzone-active::after': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const CustomInput = styled('input')(() => ({
  display: 'none',
}));

export const CustomUploadWrapper = styled('div')(({ theme }) => ({
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
