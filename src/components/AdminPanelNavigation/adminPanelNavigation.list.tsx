import { RoomOutlined } from '@mui/icons-material';
import { CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { Salon } from 'models/admin.model';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AddSalonCard from './adminPanelNavigation.addSalon';
import { CustomCard } from './adminPanelNavigation.styled';

const SalonsNavigation = ({ data }: { data: Pick<Salon, '_id' | 'name' | 'address'>[] }) => {
  const [translation] = useTranslation();

  return (
    <Stack spacing={2.5}>
      <Typography variant="h5">{translation('admin:salonTemplate.heading.mySalons')}</Typography>
      {data.length > 0 &&
        data.map(({ _id, name, address }) => (
          <CustomCard key={_id}>
            <Link to={`/salons/${_id}/edit`}>
              <CardActionArea>
                <CardContent>
                  <Typography marginBottom={1.25} variant="h6" noWrap>
                    {name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <RoomOutlined />
                    <Typography variant="body2" noWrap>
                      {address}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Link>
          </CustomCard>
        ))}
      <AddSalonCard />
    </Stack>
  );
};

export default SalonsNavigation;
