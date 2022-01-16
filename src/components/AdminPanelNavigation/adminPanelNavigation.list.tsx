import { Add, LocationCityOutlined, RoomOutlined } from '@mui/icons-material';
import { Button, Chip, Stack, Typography } from '@mui/material';
import { Salon } from 'models/admin.model';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import theme from 'theme';
import { CustomCard } from './adminPanelNavigation.styled';

const SalonsNavigation = ({
  data,
}: {
  data: { salons: Pick<Salon, '_id' | 'name' | 'address' | 'city' | 'type'>[]; message: string };
}) => {
  const [translation] = useTranslation(['admin', 'common']);
  const { salonId } = useParams<{ salonId: string }>();

  return (
    <Stack spacing={2}>
      <Typography variant="h5">{translation('salonTemplate.heading.mySalons')}</Typography>
      <Button variant="outlined" color="primary" endIcon={<Add />} size="large">
        {translation('salonTemplate.addSalon')}
      </Button>
      {data.salons.length > 0 &&
        data.salons.map(({ _id, name, address, city, type }) => (
          <CustomCard key={_id} active={salonId === _id} variant="outlined">
            <Link to={`/salons/${_id}/details`}>
              <Typography variant="subtitle1" noWrap>
                {name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.secondary}>
                <RoomOutlined />
                <Typography variant="body2" noWrap>
                  {address}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.secondary}>
                <LocationCityOutlined />
                <Typography variant="body2" noWrap>
                  {city}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center" marginTop={1}>
                {type.map((item, index) => (
                  <Chip
                    size="small"
                    color="secondary"
                    label={translation(`common:salonType.${item.toLowerCase()}`)}
                    key={index}
                  />
                ))}
              </Stack>
            </Link>
          </CustomCard>
        ))}
    </Stack>
  );
};

export default SalonsNavigation;
