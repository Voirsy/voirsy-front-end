import { styled } from '@mui/system';
import theme from 'theme';
import { Box, Typography } from '@mui/material';

export const CustomImg = styled('img')(() => ({
  maxWidth: '100%',
  marginBottom: theme.spacing(1.5),
}));

export const CustomDetailsSection = styled(Box)(() => ({
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1.25),
  marginBottom: theme.spacing(1.25),
}));

export const CustomSectionHeader = styled(Typography)(() => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.overline.fontSize,
}));

export const CustomServicesHeading = styled(Typography)(() => ({
  fontSize: theme.typography.body2.fontSize,
  marginBottom: theme.spacing(1.25),
}));

export const CustomServiceHeading = styled(Typography)(() => ({
  fontWeight: theme.typography.fontWeightBold,
}));
