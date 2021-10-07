import { Grid, MenuItem, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import SalonCard from 'components/SalonCard';
import { CustomContainer, CustomSelect, CustomBox } from './resultList.styles';
import { sortSelectData } from './sortSelectInput.data';
import MOCK_DATA from './mock_data';

const ResultList = () => {
  const [sortType, setSortType] = useState<string | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortType(event.target.value);
  };
  return (
    <CustomContainer disableGutters>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2">
          Results
        </Typography>
        <Grid item xs={4}>
          <CustomSelect
            select
            label="Sort by:"
            variant="outlined"
            size="small"
            fullWidth
            value={sortType}
            onChange={handleChange}
          >
            {sortSelectData.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
      </Grid>
      <CustomBox>
        <SalonCard data={MOCK_DATA} />
      </CustomBox>
    </CustomContainer>
  );
};

export default ResultList;
