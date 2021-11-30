import { Container, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { InputWrapper } from './filters.styled';

const Filters = () => (
  <Container component="nav" maxWidth={false}>
    <InputWrapper>
      <IconButton aria-label="menu" size="small">
        <Search />
      </IconButton>
      <InputBase placeholder="Search..." inputProps={{ 'aria-label': 'search voirsy' }} />
    </InputWrapper>
  </Container>
);

export default Filters;
