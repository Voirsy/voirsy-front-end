import { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { IconWrapper, Text } from './noContent.styled';

interface NoContentProps {
  text: string;
  icon: ReactNode;
}

const NoContent = ({ icon, text }: NoContentProps) => (
  <Box height="100%" display="flex" alignItems="center" justifyContent="center">
    <Stack spacing={1.25} alignItems="center">
      <IconWrapper>{icon}</IconWrapper>
      <Text>{text}</Text>
    </Stack>
  </Box>
);

export default NoContent;
