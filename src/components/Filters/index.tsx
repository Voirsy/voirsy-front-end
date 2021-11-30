import { useEffect, useState } from 'react';
import {
  alpha,
  Checkbox,
  Chip,
  Container,
  hexToRgb,
  IconButton,
  InputBase,
  ListItemText,
  MenuItem,
  Radio,
  Select,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { CustomFormControl, CustomInputLabel, InputWrapper } from './filters.styled';
import theme from 'theme';
import { SalonType } from 'enums/salonType.enum';

const cities = [
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2962', name: 'warsaw' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2963', name: 'cracow' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2964', name: 'poznan' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2965', name: 'gdansk' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2966', name: 'bydgoszcz' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2967', name: 'wroclaw' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2968', name: 'bialystok' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2969', name: 'szczecin' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2970', name: 'lodz' },
];

const salonTypes = [
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2972', name: SalonType.Barber },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2973', name: SalonType.Hairdressers },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2974', name: SalonType.Beauticians },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2975', name: SalonType.Tattooists },
];

const sortByOption = [
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2982', name: 'most popular' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2983', name: 'top rated' },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2984', name: 'quantity of ratings' },
];

const Filters = () => {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [salonType, setSalonType] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (event: any) => setSearch(event.target.value);
  const handleLocationChange = (event: any) => setLocation(event.target.value);
  const handleSalonTypeChange = (event: any) => setSalonType(event.target.value);
  const handleSortByChange = (event: any) => setSortBy(event.target.value);

  useEffect(() => {
    console.log('Search: ', search);
    console.log('Location: ', location);
    console.log('Salon type: ', salonType);
    console.log('Sort by: ', sortBy);
  }, [location, search, salonType, sortBy]);

  return (
    <Container component="nav" maxWidth={false}>
      <Stack direction={matches ? 'row' : 'column'} spacing={2}>
        <InputWrapper>
          <IconButton aria-label="menu" size="small">
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search voirsy' }}
            value={search}
            onChange={handleSearchChange}
          />
        </InputWrapper>

        <Stack direction="row" spacing={2}>
          <CustomFormControl isPrimary>
            <CustomInputLabel isPrimary variant="body2" component="label" id="location-helper-label">
              Location
            </CustomInputLabel>
            <Select
              labelId="location-helper-label"
              id="location-helper"
              value={location}
              onChange={handleLocationChange}
              color="primary"
              renderValue={() => ''}
              size="small"
              MenuProps={{
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                style: {
                  maxHeight: '300px',
                },
              }}
            >
              {cities.map((el) => (
                <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
                  <Radio checked={el._id === location} />
                  <ListItemText primary={el.name} />
                </MenuItem>
              ))}
            </Select>
          </CustomFormControl>

          <CustomFormControl>
            <CustomInputLabel variant="body2" component="label" id="saloType-helper-label">
              Salon type
            </CustomInputLabel>
            <Select
              labelId="saloType-helper-label"
              id="saloType-helper"
              value={salonType}
              onChange={handleSalonTypeChange}
              renderValue={() => ''}
              size="small"
              multiple
              MenuProps={{
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
              }}
            >
              {salonTypes.map((el) => (
                <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
                  <Checkbox checked={salonType.indexOf(el._id) > -1} />
                  <ListItemText primary={el.name} />
                </MenuItem>
              ))}
            </Select>
          </CustomFormControl>

          <CustomFormControl>
            <CustomInputLabel variant="body2" component="label" id="sortBy-helper-label">
              Sort by
            </CustomInputLabel>
            <Select
              labelId="sortBy-helper-label"
              id="sortBy-helper"
              value={sortBy}
              onChange={handleSortByChange}
              renderValue={() => ''}
              size="small"
              MenuProps={{
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
              }}
            >
              {sortByOption.map((el) => (
                <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
                  <Radio checked={el._id === sortBy} />
                  <ListItemText primary={el.name} />
                </MenuItem>
              ))}
            </Select>
          </CustomFormControl>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} width="100%" overflow="auto" marginTop={2}>
        {location !== '' && (
          <Chip
            label={`Location: ${cities.find((el) => el._id === location)?.name}`}
            onDelete={() => setLocation('')}
            sx={{
              textTransform: 'capitalize',
              color: theme.palette.background.paper,
              backgroundColor: theme.palette.secondary.main,
              'svg.MuiChip-deleteIcon': {
                color: alpha(theme.palette.common.white, 0.4),
              },
              'svg.MuiChip-deleteIcon:hover': {
                color: alpha(theme.palette.common.white, 0.5),
              },
            }}
          />
        )}
        {salonType.length > 0 &&
          salonType.map((type) => (
            <Chip
              key={type}
              label={`Salon type: ${salonTypes.find((el) => el._id === type)?.name}`}
              onDelete={() => setLocation('')}
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.background.paper,
                backgroundColor: theme.palette.salonType[salonTypes.find((el) => el._id === type)?.name as SalonType],
                'svg.MuiChip-deleteIcon': {
                  color: alpha(theme.palette.common.white, 0.4),
                },
                'svg.MuiChip-deleteIcon:hover': {
                  color: alpha(theme.palette.common.white, 0.5),
                },
              }}
            />
          ))}
        {sortBy !== '' && (
          <Chip
            label={`Sort by: ${sortByOption.find((el) => el._id === sortBy)?.name}`}
            onDelete={() => setSortBy('')}
            sx={{
              textTransform: 'capitalize',
              color: theme.palette.background.paper,
              backgroundColor: theme.palette.info.main,
              'svg.MuiChip-deleteIcon': {
                color: alpha(theme.palette.common.white, 0.4),
              },
              'svg.MuiChip-deleteIcon:hover': {
                color: alpha(theme.palette.common.white, 0.5),
              },
            }}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Filters;
