import { Container, Grid, InputAdornment } from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';
import {
  CustomTextField,
  CustomChipContainer,
  CustomChip,
  CustomLocationButton,
} from './filters.styles';

const Filters = () => (
  <Container component="nav" maxWidth={false}>
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={12} sm={6} md>
        <CustomTextField
          type="search"
          variant="outlined"
          size="small"
          placeholder="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md>
        <CustomLocationButton
          variant="outlined"
          size="large"
          endIcon={<ExpandMore />}
          fullWidth
        >
          Location
        </CustomLocationButton>
      </Grid>
      <CustomChipContainer
        container
        item
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <CustomChip label="Barbers" variant="outlined" clickable />
        <CustomChip label="Hairdressers" variant="outlined" clickable />
        <CustomChip label="Beauticians" variant="outlined" clickable />
        <CustomChip label="Tattooists" variant="outlined" clickable />
      </CustomChipContainer>
    </Grid>
  </Container>
);

export default Filters;
