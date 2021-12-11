import { Stack, Typography } from '@mui/material';
import { CustomDetailsSection, CustomServiceHeading } from '../Information/infromation.styled';
import { minutesToHours } from 'date-fns';
import { Service } from 'models/admin.model';

const ServiceCard = ({ _id, name, description, price, duration }: Service) => {
  const hours = minutesToHours(duration);
  let serviceDuration = '';
  if (hours !== 0) serviceDuration += `${hours}h`;
  serviceDuration += ` ${duration - hours * 60}min`;

  return (
    <CustomDetailsSection key={_id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
        <Stack direction="row">
          <CustomServiceHeading>{name}&nbsp;</CustomServiceHeading>
          <Typography>{`• ${serviceDuration}`}</Typography>
        </Stack>
        <Typography>{price}$</Typography>
      </Stack>
      <Typography>{description}</Typography>
    </CustomDetailsSection>
  );
};

export default ServiceCard;
