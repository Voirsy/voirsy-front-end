import { Link } from 'react-router-dom';
import { CustomButton } from './cancelButton.styles';

const CancelButton = ({ children }: { children: string }): JSX.Element => (
  <CustomButton variant="outlined" fullWidth size="large" component={Link} to="/">
    {children}
  </CustomButton>
);

export default CancelButton;
