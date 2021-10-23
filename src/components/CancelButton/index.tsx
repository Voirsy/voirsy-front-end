import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CancelButton = ({ children }: { children: string }): JSX.Element => (
  <Button
    variant="outlined"
    fullWidth
    size="large"
    component={Link}
    to="/"
    sx={{
      color: 'text.primary',
      borderColor: 'rgba(0, 0, 0, 0.23)',
      '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
    }}
  >
    {children}
  </Button>
);

export default CancelButton;
