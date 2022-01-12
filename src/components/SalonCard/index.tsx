import { CardMedia, Typography, Chip, Stack, CircularProgress } from '@mui/material';
import { Place, LocationCity, Star, FavoriteBorder, Favorite } from '@mui/icons-material';
import { SalonCardTypes } from './salonCard.types';
import { CustomCard, CustomCardContent, CustomLink, HeartButton, Rating } from './salonCard.styled';
import { isAuth } from 'helpers/auth';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { UserRole } from 'enums/userRole.enum';
import { useTranslation } from 'react-i18next';
import { useAddToFavoritesMutation, useRemoveFromFavoritesMutation } from 'store/api/salons';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

const SalonCard = ({ imageUrl, name, city, address, rating, salonType, _id }: SalonCardTypes) => {
  const [addToFavorite, { isError, isSuccess, isLoading }] = useAddToFavoritesMutation();
  const [removeFromFavorites, { isError: isRemoveError, isSuccess: isRemoveSuccess, isLoading: isRemoveLoading }] =
    useRemoveFromFavoritesMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [translation] = useTranslation('common');
  const userRole = useSelector((state: RootState) => state.user?.role);
  const favorites = useSelector((state: RootState) => state.user?.favorites) || [];
  const showHeart = isAuth() && userRole !== UserRole.Business;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(Boolean(favorites.find((el) => el === _id)));
  }, []);

  useEffect(() => {
    if (isError) enqueueSnackbar(translation('favoriteMsg.errorAdd', { ns: 'home' }), { variant: 'error' });
    if (isSuccess) {
      enqueueSnackbar(translation('favoriteMsg.successAdd', { ns: 'home' }), { variant: 'success' });
      setIsFavorite(true);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (isRemoveError) enqueueSnackbar(translation('favoriteMsg.errorRemove', { ns: 'home' }), { variant: 'error' });
    if (isRemoveSuccess) {
      enqueueSnackbar(translation('favoriteMsg.successRemove', { ns: 'home' }), { variant: 'success' });
      setIsFavorite(false);
    }
  }, [isRemoveError, isRemoveSuccess]);

  const favoriteIcon = isFavorite ? <Favorite /> : <FavoriteBorder />;

  return (
    <CustomCard>
      {rating !== '0' && <Rating size="small" label={Math.round(parseFloat(rating) * 10) / 10} icon={<Star />} />}
      <CardMedia component="img" height="160" image={imageUrl} alt={name} />
      <CustomCardContent>
        {showHeart && (
          <HeartButton
            size="large"
            disabled={isLoading || isRemoveLoading}
            onClick={() => (isFavorite ? removeFromFavorites({ salonId: _id }) : addToFavorite({ salonId: _id }))}
          >
            {isLoading || isRemoveLoading ? <CircularProgress size={24} /> : favoriteIcon}
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
            <Chip key={el} label={translation(`salonType.${el.toLowerCase()}`)} size="small" color="secondary" />
          ))}
        </Stack>
      </CustomCardContent>
    </CustomCard>
  );
};

export default SalonCard;
