import { Container, Grid, InputAdornment } from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';
import { CustomTextField, CustomChipContainer, CustomChip, CustomLocationButton } from './filters.styles';
import { useTranslation } from 'react-i18next';

const Filters = () => {
  const [t] = useTranslation();

  return (
    <Container component="nav" maxWidth={false}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} sm={6} md>
          <CustomTextField
            type="search"
            variant="outlined"
            size="small"
            placeholder={t('home:filters.search.label')}
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
          <CustomLocationButton variant="outlined" size="large" endIcon={<ExpandMore />} fullWidth>
            {t('home:filters.location.label')}
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
          <CustomChip label={t('home:filters.chip.barbers')} variant="outlined" clickable />
          <CustomChip label={t('home:filters.chip.hairdressers')} variant="outlined" clickable />
          <CustomChip label={t('home:filters.chip.beauticians')} variant="outlined" clickable />
          <CustomChip label={t('home:filters.chip.tattooists')} variant="outlined" clickable />
        </CustomChipContainer>
      </Grid>
    </Container>
  );
};

export default Filters;
