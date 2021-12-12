import { Button, Stack, Typography } from '@mui/material';
import { CustomDetailsSection, CustomServiceHeading } from '../Information/information.styled';
import { minutesToHours } from 'date-fns';
import { Service } from 'models/admin.model';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { isAuth } from 'helpers/auth';
import { UserRole } from 'enums/userRole.enum';

const ServiceCard = ({ _id, name, description, price, duration }: Service) => {
  const role = useSelector((state: RootState) => state.user?.role);
  const hours = minutesToHours(duration);
  let serviceDuration = '';
  if (hours !== 0) serviceDuration += `${hours}h`;
  serviceDuration += ` ${duration - hours * 60}min`;

  const isBookLinkVisible = isAuth() && role === UserRole.Standard;

  return (
    <CustomDetailsSection key={_id}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
        <Stack direction="row">
          <CustomServiceHeading>{name}&nbsp;</CustomServiceHeading>
          <Typography>{`• ${serviceDuration}`}</Typography>
        </Stack>
        <Typography>{price}$</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{description}</Typography>
        {isBookLinkVisible && (
          <Button variant="contained" color="secondary" size="small">
            Book
          </Button>
        )}
      </Stack>
    </CustomDetailsSection>
  );
};

export default ServiceCard;
