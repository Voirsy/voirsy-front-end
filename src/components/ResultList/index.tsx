import { Grid, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import SalonCard from 'components/SalonCard';
import { CustomContainer, CustomSelect, CustomBox } from './resultList.styles';
import { sortSelectData } from './sortSelectInput.data';
import MOCK_DATA from './mock_data';

const ResultList = () => {
  const [translation] = useTranslation();
  const [sortType, setSortType] = useState<string | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortType(event.target.value);
  };
  return (
    <CustomContainer disableGutters>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2">
          {translation('home:headings.results')}
        </Typography>
        <Grid item xs={4}>
          <CustomSelect
            select
            label={translation('home:sort.label')}
            variant="outlined"
            size="small"
            fullWidth
            value={sortType}
            onChange={handleChange}
          >
            {sortSelectData.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {translation(`home:sort.items.${item.value}`)}
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
