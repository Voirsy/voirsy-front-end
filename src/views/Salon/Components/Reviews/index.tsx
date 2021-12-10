import { Comment } from '@mui/icons-material';
import { Avatar, Grid, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import NoContent from 'views/Salon/Components/NoContent';
import { Salon } from 'models/admin.model';
import { RootState } from 'store/store';
import { UserRole } from 'enums/userRole.enum';
import { isAuth } from 'helpers/auth';
import { CustomFab, ReviewCard } from './reviews.styled';

const Reviews = ({ reviews }: Pick<Salon, 'reviews'>) => {
  const user = useSelector((state: RootState) => state.user);
  const alreadyAdded = reviews.find((el) => el.authorId === user?.id);

  return (
    <>
      {reviews.length === 0 ? (
        <NoContent text="No comments yet" icon={<Comment />} />
      ) : (
        <Grid container spacing={2.5}>
          {reviews.map((el) => (
            <Grid item key={el.authorId} xs={12} md={6}>
              <ReviewCard>
                <Stack direction="row" justifyContent="space-between" marginBottom={1}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Avatar alt={el.name} src={el.avatarUrl} />
                    <ListItemText primary={el.name} secondary={el.date} />
                  </Stack>
                  {el.rating}
                </Stack>
                <Typography variant="body1">{el.description}</Typography>
              </ReviewCard>
            </Grid>
          ))}
        </Grid>
      )}
      {isAuth() && user?.role !== UserRole.Business && !alreadyAdded && (
        <CustomFab size="medium" color="secondary" aria-label="add comment">
          <Comment />
        </CustomFab>
      )}
    </>
  );
};

export default Reviews;
