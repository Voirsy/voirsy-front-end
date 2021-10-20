import { styled } from '@mui/system';

export const CustomInput = styled('input')(() => ({
  display: 'none',
}));

export const CustomUploadWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '5%',
  right: '5%',
  background: theme.palette.secondary.main,
  borderRadius: '50%',
  border: `2px solid ${theme.palette.common.white}`,
  '& svg': {
    fill: theme.palette.common.white,
  },
}));
