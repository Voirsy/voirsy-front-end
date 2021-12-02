import { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  IconButton,
  InputBase,
  ListItemText,
  MenuItem,
  Radio,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { InputWrapper } from './filters.styled';
import theme from 'theme';
import { SortType } from 'enums/sortType.enum';
import FilterChip from './Components/FilterChip';
import Select from './Components/Select';
import { useFetchAllCategoriesQuery, useFetchAllCitiesQuery } from 'store/api/salons';

const Filters = ({ handleFetching }: { handleFetching: any }) => {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [salonType, setSalonType] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const { data: salonTypes = [], isFetching: salonTypesFetching } = useFetchAllCategoriesQuery();
  const { data: cities = [], isFetching: citiesFetching } = useFetchAllCitiesQuery();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);
  const handleLocationChange = (event: any) => setLocation(event.target.value);
  const handleSalonTypeChange = (event: any) => setSalonType(event.target.value);
  const handleSortByChange = (event: any) => setSortBy(event.target.value);

  const handleSubmitSearch = () => {
    handleFetching({ search, location, sortBy, salonType });
  };

  useEffect(() => {
    if (location === '' && search === '' && salonType.length === 0 && sortBy === '') return;
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
            {citiesFetching ? (
              <Box display="flex" justifyContent="center" padding="10px 0">
                <CircularProgress />
              </Box>
            ) : (
              cities.map((el) => (
                <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
                  <Radio checked={el._id === location} />
                  <ListItemText primary={el.name} />
                </MenuItem>
              ))
            )}
          </Select>

          <Select label="Salon type" value={salonType} onChange={handleSalonTypeChange} multiple>
            {salonTypesFetching ? (
              <Box display="flex" justifyContent="center" padding="10px 0">
                <CircularProgress />
              </Box>
            ) : (
              salonTypes.map((el) => (
                <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
                  <Checkbox checked={salonType.indexOf(el._id) > -1} />
                  <ListItemText primary={el.name} />
                </MenuItem>
              ))
            )}
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
