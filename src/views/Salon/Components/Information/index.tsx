import { Salon } from 'models/admin.model';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import {
  CustomImg,
  CustomSectionHeader,
  CustomDetailsSection,
  CustomServiceHeading,
  CustomServicesHeading,
} from './infromation.styled';
import Details from './information.details';
import theme from 'theme';
import { useTranslation } from 'react-i18next';

const Information = ({
  description,
  imageUrl,
  phone,
  openingHours,
  services,
  crew,
}: Pick<Salon, 'description' | 'imageUrl' | 'phone' | 'openingHours' | 'services' | 'crew'>) => {
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [translation] = useTranslation();

  return (
    <Stack direction={matches ? 'column' : 'row'} spacing={1.5}>
      <div>
        <CustomImg src={imageUrl} alt={translation('salon:salonImg.alt')} />
        <Box sx={{ display: matches ? 'block' : 'none' }}>
          <Details description={description} phone={phone} openingHours={openingHours} crew={crew} />
        </Box>
        <div>
          <CustomServicesHeading variant="button" paragraph>
            {translation('salon:details.ourServices.label')}
          </CustomServicesHeading>
          <div>
            {services.map((el) => (
              <CustomDetailsSection key={el._id}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
                  <Stack direction="row">
                    <CustomServiceHeading>{el.name}&nbsp;</CustomServiceHeading>
                    <Typography>{`• ${el.duration}`}</Typography>
                  </Stack>
                  <Typography>{el.price}$</Typography>
                </Stack>
                <Typography>{el.description}</Typography>
              </CustomDetailsSection>
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
