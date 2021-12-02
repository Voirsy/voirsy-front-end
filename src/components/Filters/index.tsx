import { useEffect, useState } from 'react';
import {
  Checkbox,
  Container,
  IconButton,
  InputBase,
  ListItemText,
  MenuItem,
  Radio,
  Select as MuiSelect,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { CustomFormControl, CustomInputLabel, InputWrapper } from './filters.styled';
import theme from 'theme';
import { SalonType } from 'enums/salonType.enum';
import { SortType } from 'enums/sortType.enum';
import FilterChip from './Components/FilterChip';
import Select from './Components/Select';

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
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2972', name: SalonType.Barbers },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2973', name: SalonType.Hairdressers },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2974', name: SalonType.Beauticians },
  { _id: '540d638c-44b1-4aa7-a4b3-289decfa2975', name: SalonType.Tattooists },
];

const Filters = ({ handleFetching }: { handleFetching: any }) => {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [salonType, setSalonType] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);
  const handleLocationChange = (event: any) => setLocation(event.target.value);
  const handleSalonTypeChange = (event: any) => setSalonType(event.target.value);
  const handleSortByChange = (event: any) => setSortBy(event.target.value);

  const handleSubmitSearch = () => {
    handleFetching({ search, location, sortBy, salonType });
  };

  useEffect(() => {
    if (location === '' && search === '' && salonType.length === 0 && sortBy === '') return;
    // console.log('Search: ', search);
    // console.log('Location: ', location);
    // console.log('Salon type: ', salonType);
    // console.log('Sort by: ', sortBy);
    handleFetching({ search, location, sortBy, salonType });
  }, [location, salonType, sortBy]);

  return (
    <Container component="nav" maxWidth={false}>
      <Stack direction={matches ? 'row' : 'column'} spacing={matches ? 2 : 1}>
        <InputWrapper>
          <IconButton aria-label="menu" size="small" onClick={handleSubmitSearch}>
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search voirsy' }}
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmitSearch();
            }}
          />
        </InputWrapper>

        <Stack direction="row" spacing={matches ? 2 : 1} width="100%" overflow={matches ? 'visible' : 'auto'}>
          <Select
            isPrimary
            label="Location"
            value={location}
            onChange={handleLocationChange}
            MenuProps={{
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

          <Select label="Salon type" value={salonType} onChange={handleSalonTypeChange} multiple>
            {salonTypes.map((el) => (
              <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
                <Checkbox checked={salonType.indexOf(el._id) > -1} />
                <ListItemText primary={el.name} />
              </MenuItem>
            ))}
          </Select>

          <Select label="Sort by" value={sortBy} onChange={handleSortByChange}>
            {Object.entries(SortType).map((key) => (
              <MenuItem key={key[0]} value={key[0]} sx={{ textTransform: 'capitalize' }}>
                <Radio checked={key[0] === sortBy} />
                <ListItemText primary={key[1]} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={matches ? 2 : 1} width="100%" overflow="auto" marginTop={matches ? 2 : 1}>
        {location !== '' && (
          <FilterChip
            label={`Location: ${cities.find((el) => el._id === location)?.name}`}
            onDelete={() => setLocation('')}
          />
        )}
        {salonType.length > 0 &&
          salonType.map((type) => (
            <FilterChip
              key={type}
              label={`Salon type: ${salonTypes.find((el) => el._id === type)?.name}`}
              onDelete={() => setSalonType(salonType.filter((el) => el !== type))}
            />
          ))}
        {sortBy !== '' && (
          <FilterChip
            label={`Sort by: ${Object.entries(SortType).find((el) => el[0] === sortBy)?.[1]}`}
            onDelete={() => setSortBy('')}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Filters;
