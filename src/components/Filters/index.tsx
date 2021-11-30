import { Container, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import { Search } from '@mui/icons-material';
import { CustomFormControl, CustomInputLabel, InputWrapper } from './filters.styled';
import { useEffect, useState } from 'react';

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

const Filters = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const handleLocationChange = (event: any) => setLocation(event.target.value);
  const handleSearchChange = (event: any) => setSearch(event.target.value);

  useEffect(() => {
    console.log('Location: ', location);
    console.log('Search: ', search);
  }, [location, search]);

  return (
    <Container component="nav" maxWidth={false}>
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
      <CustomFormControl>
        <CustomInputLabel variant="body1" component="label" id="location-helper-label">
          Location
        </CustomInputLabel>
        <Select
          labelId="location-helper-label"
          id="location-helper"
          placeholder="Location"
          value={location}
          onChange={handleLocationChange}
          color="primary"
          renderValue={() => ''}
          size="small"
        >
          {cities.map((el) => (
            <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </CustomFormControl>
    </Container>
  );
};

export default Filters;
