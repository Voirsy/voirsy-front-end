import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import { Place, LocationCity } from '@mui/icons-material';
import { SalonCardTypes } from './salonCard.types';

const SalonCard = ({ imageUrl, name, city, address, rating, type }: SalonCardTypes) => (
  <Card sx={{ width: 320 }}>
    <CardMedia component="img" height="160" image={imageUrl} alt={name} />
    <CardContent>
      <Typography gutterBottom variant="subtitle1" component="div" noWrap>
        {name}
      </Typography>
      <Stack direction="row" spacing={1} marginBottom={1} alignItems="center">
        <Place sx={{ color: 'text.secondary', fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} marginBottom={1.5} alignItems="center">
        <LocationCity sx={{ color: 'text.secondary', fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary">
          {city}
        </Typography>
      </Stack>
      <Chip label={type} size="small" />
    </CardContent>
  </Card>
);

export default SalonCard;
