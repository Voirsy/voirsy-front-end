import { Salon } from 'models/admin.model';
import { Box, Stack, useMediaQuery } from '@mui/material';
import { CustomImg, CustomServicesHeading } from './information.styled';
import Details from './information.details';
import theme from 'theme';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../ServiceCard';

const Information = ({
  description,
  imageUrl,
  phone,
  openingHours,
  services,
  crew,
}: Pick<Salon, 'description' | 'imageUrl' | 'phone' | 'openingHours' | 'services' | 'crew'>) => {
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [translation] = useTranslation('salon');

  return (
    <Stack direction={matches ? 'column' : 'row'} spacing={1.5}>
      <Box width="100%">
        <CustomImg src={imageUrl} alt={translation('salon:salonImg.alt')} sx={{ borderRadius: 1 }} />
        <Box sx={{ display: matches ? 'block' : 'none' }}>
          <Details description={description} phone={phone} openingHours={openingHours} crew={crew} />
        </Box>
        <div>
          <CustomServicesHeading variant="button" paragraph>
            {translation('salon:details.ourServices.label')}
          </CustomServicesHeading>
          <div>
            {services.map((service) => (
              <ServiceCard key={service._id} {...service} />
            ))}
          </div>
        </div>
      </Box>
      <Box sx={{ display: matches ? 'none' : 'block', minWidth: '300px', width: '300px' }}>
        <Details description={description} phone={phone} openingHours={openingHours} crew={crew} />
      </Box>
    </Stack>
  );
};

export default Information;
