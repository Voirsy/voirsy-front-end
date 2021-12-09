import { Salon } from 'models/admin.model';
import { Box, Stack, useMediaQuery } from '@mui/material';
import { CustomImg, CustomSectionHeader } from './infromation.styled';
import Details from './information.details';
import theme from 'theme';

const Information = ({
  description,
  imageUrl,
  phone,
  openingHours,
  services,
  crew,
}: Pick<Salon, 'description' | 'imageUrl' | 'phone' | 'openingHours' | 'services' | 'crew'>) => {
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction={matches ? 'column' : 'row'} spacing={1.5}>
      <div>
        <CustomImg src={imageUrl} alt="salon profile image" />
        <Box sx={{ display: matches ? 'block' : 'none' }}>
          <Details description={description} phone={phone} openingHours={openingHours} crew={crew} />
        </Box>
        <div>
          <CustomSectionHeader variant="button">our services</CustomSectionHeader>
          <div>
            {services.map((el) => (
              <div key={el._id}>{el.name}</div>
            ))}
          </div>
        </div>
      </div>
      <Box sx={{ display: matches ? 'none' : 'block', minWidth: '300px', width: '300px' }}>
        <Details description={description} phone={phone} openingHours={openingHours} crew={crew} />
      </Box>
    </Stack>
  );
};

export default Information;
