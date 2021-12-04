import { CardMedia, Typography, Chip, Stack } from '@mui/material';
import { Place, LocationCity, Star, FavoriteBorder } from '@mui/icons-material';
import { SalonCardTypes } from './salonCard.types';
import { CustomCard, CustomCardContent, CustomLink, HeartButton, Rating } from './salonCard.styled';
import { isAuth } from 'helpers/auth';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { UserRole } from 'enums/userRole.enum';

const SalonCard = ({ imageUrl, name, city, address, rating, salonType, _id }: SalonCardTypes) => {
  const userRole = useSelector((state: RootState) => state.user?.role);
  const showHeart = isAuth() && userRole !== UserRole.Business;

  return (
    <CustomCard>
      <Rating size="small" label={rating} icon={<Star />} />
      <CardMedia component="img" height="160" image={imageUrl} alt={name} />
      <CustomCardContent>
        {showHeart && (
          <HeartButton size="large">
            <FavoriteBorder />
          </HeartButton>
        )}
        <Typography gutterBottom variant="subtitle1" component="div" noWrap maxWidth={showHeart ? '90%' : '100%'}>
          <CustomLink to={`/${_id}`}>{name}</CustomLink>
        </Typography>
        <Stack direction="row" spacing={1} marginBottom={1} alignItems="center">
          <Place sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {address}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} marginBottom={1.5} alignItems="center">
          <LocationCity sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {city}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {salonType.map((el) => (
            <Chip key={el} label={el} size="small" color="secondary" />
          ))}
        </Stack>
      </CustomCardContent>
    </CustomCard>
  );
};

export default SalonCard;
