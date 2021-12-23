import { Close, Comment } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Fade,
  Grid,
  IconButton,
  ListItemText,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import NoContent from 'views/Salon/Components/NoContent';
import { Salon } from 'models/admin.model';
import { RootState } from 'store/store';
import { UserRole } from 'enums/userRole.enum';
import { isAuth } from 'helpers/auth';
import { CustomFab, CustomModal, ReviewCard } from './reviews.styled';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Reviews = ({ reviews }: Pick<Salon, 'reviews'>) => {
  const [translation] = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const alreadyAdded = reviews.find((el) => el.authorId === user?.id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [opinion, setOpinion] = useState('');
  const [rating, setRating] = useState<null | number>(null);

  const isFabVisible = isAuth() && user?.role !== UserRole.Business && !alreadyAdded && !isDrawerOpen;

  return (
    <>
      {reviews.length === 0 ? (
        <NoContent text={translation('salon:reviews.noReviews')} icon={<Comment />} />
      ) : (
        <Grid container spacing={2.5}>
          {reviews.map((el) => (
            <Grid item key={el.authorId} xs={12} md={6}>
              <ReviewCard>
                <Stack direction="row" justifyContent="space-between" marginBottom={1}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Avatar alt={el.name} src={el.avatarUrl} />
                    <ListItemText primary={el.name} secondary={format(new Date(el.date), 'dd MMM y')} />
                  </Stack>
                  <Rating name="Salon rating" value={parseInt(el.rating, 10)} readOnly />
                </Stack>
                <Typography variant="body1">{el.description}</Typography>
              </ReviewCard>
            </Grid>
          ))}
        </Grid>
      )}
      {isFabVisible && (
        <CustomFab size="medium" color="secondary" aria-label="add comment" onClick={() => setIsDrawerOpen(true)}>
          <Comment />
        </CustomFab>
      )}
      <Fade in={isDrawerOpen}>
        <CustomModal>
          <IconButton onClick={() => setIsDrawerOpen(false)} sx={{ position: 'absolute', top: 4, right: 4 }}>
            <Close />
          </IconButton>
          <Stack spacing={2.5} alignItems="center">
            <Typography variant="h5">{translation('salon:reviews.addReviewForm.title')}</Typography>
            <Rating value={rating} onChange={(_, value) => setRating(value)} />
            <TextField
              label={translation('salon:reviews.addReviewForm.textfield')}
              variant="filled"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
            />
            <Button variant="contained" color="secondary" size="large" sx={{ width: '144px' }}>
              {translation('salon:reviews.addReviewForm.button')}
            </Button>
          </Stack>
        </CustomModal>
      </Fade>
    </>
  );
};

export default Reviews;
