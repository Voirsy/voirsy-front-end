import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setFilters } from '../../store/slices/salonsFiltersSlice';
import { useTranslation } from 'react-i18next';

const Filters = ({ handleFetching }: { handleFetching: any }) => {
  const [translation] = useTranslation();
  const filters = useSelector((state: RootState) => state.salonsFilters);
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [search, setSearch] = useState('');
  const { data: salonTypes = [], isFetching: salonTypesFetching } = useFetchAllCategoriesQuery();
  const { data: cities = [], isFetching: citiesFetching } = useFetchAllCitiesQuery();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);
  const handleLocationChange = (event: any) => dispatch(setFilters({ location: event.target.value }));
  const handleSalonTypeChange = (event: any) => dispatch(setFilters({ salonType: event.target.value }));
  const handleSortByChange = (event: any) => dispatch(setFilters({ sortBy: event.target.value }));
  const handleSubmitSearch = () => dispatch(setFilters({ search }));

  useEffect(() => {
    if (salonTypesFetching || citiesFetching) return;
    handleFetching({ filters });
  }, [filters, salonTypesFetching, citiesFetching]);

  return (
    <Container component="nav" maxWidth={false}>
      <Stack direction={matches ? 'row' : 'column'} spacing={matches ? 2 : 1}>
        <InputWrapper>
          <IconButton aria-label="menu" size="small" onClick={handleSubmitSearch}>
            <Search />
          </IconButton>
          <InputBase
            placeholder={`${translation('home:filters.search.label')}...`}
            inputProps={{ 'aria-label': translation('home:filters.search.ariaLabel') }}
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmitSearch();
            }}
          />
        </InputWrapper>

        <Stack direction="row" spacing={matches ? 2 : 1} width="100%" overflow={matches ? 'visible' : 'auto'}>
          <Select
            label={translation('home:filters.location.label')}
            value={filters.location}
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
                  <Radio checked={el._id === filters.location} />
                  <ListItemText primary={el.name} />
                </MenuItem>
              ))
            )}
          </Select>

          <Select
            label={translation('home:filters.salonType.label')}
            value={filters.salonType}
            onChange={handleSalonTypeChange}
            multiple
          >
            {salonTypesFetching ? (
              <Box display="flex" justifyContent="center" padding="10px 0">
                <CircularProgress />
              </Box>
            ) : (
              salonTypes.map((el) => (
                <MenuItem key={el._id} value={el._id} sx={{ textTransform: 'capitalize' }}>
                  <Checkbox checked={filters.salonType.indexOf(el._id) > -1} />
                  <ListItemText primary={el.name} />
                </MenuItem>
              ))
            )}
          </Select>

          <Select label={translation('home:sortBy.label')} value={filters.sortBy} onChange={handleSortByChange}>
            {Object.entries(SortType).map((key) => (
              <MenuItem key={key[0]} value={key[0]} sx={{ textTransform: 'capitalize' }}>
                <Radio checked={key[0] === filters.sortBy} />
                <ListItemText primary={translation(`home:sortBy.options.${key[0]}`)} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={matches ? 2 : 1} width="100%" overflow="auto" marginTop={matches ? 2 : 1}>
        {filters.location !== '' && (
          <FilterChip
            label={`${translation('home:filters.location.label')}: ${
              cities.find((el) => el._id === filters.location)?.name
            }`}
            onDelete={() => dispatch(setFilters({ location: '' }))}
          />
        )}
        {filters.salonType.length > 0 &&
          filters.salonType.map((type) => (
            <FilterChip
              key={type}
              label={`${translation('home:filters.salonType.label')}: ${
                salonTypes.find((el) => el._id === type)?.name
              }`}
              onDelete={() => dispatch(setFilters({ salonType: filters.salonType.filter((el) => el !== type) }))}
            />
          ))}
        {filters.sortBy !== '' && (
          <FilterChip
            label={`translation('home:sortBy.label'): ${
              Object.entries(SortType).find((el) => el[0] === filters.sortBy)?.[1]
            }`}
            onDelete={() => dispatch(setFilters({ sortBy: '' }))}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Filters;
