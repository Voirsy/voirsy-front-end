import { Button, Stack, Typography } from '@mui/material';
import { CustomDetailsSection, CustomServiceHeading } from '../Information/information.styled';
import { Service } from 'models/admin.model';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { isAuth } from 'helpers/auth';
import { UserRole } from 'enums/userRole.enum';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { calculateServiceDuration } from '../../../../helpers/util';

const ServiceCard = ({ _id: serviceId, name, description, price, duration }: Service) => {
  const [translation] = useTranslation();
  const { salonId } = useParams<{ salonId: string }>();
  const role = useSelector((state: RootState) => state.user?.role);
  const isBookLinkVisible = isAuth() && role === UserRole.Standard;

  return (
    <CustomDetailsSection>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
        <Stack direction="row">
          <CustomServiceHeading>{name}&nbsp;</CustomServiceHeading>
          <Typography>{`• ${calculateServiceDuration(duration)}`}</Typography>
        </Stack>
        <Typography>{price}$</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{description}</Typography>
        {isBookLinkVisible && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            component={Link}
            to={`/${salonId}/reservation/${serviceId}`}
          >
            {translation('salon:bookButton.label')}
          </Button>
        )}
      </Stack>
    </CustomDetailsSection>
  );
};

export default ServiceCard;
