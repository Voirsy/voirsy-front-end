import { Comment } from '@mui/icons-material';
import { CustomFab } from './reviews.styled';
import NoContent from 'views/Salon/Components/NoContent';
import { Salon } from 'models/admin.model';

const Reviews = ({ reviews }: Pick<Salon, 'reviews'>) => (
  <>
    {reviews.length === 0 ? <NoContent text="No comments yet" icon={<Comment />} /> : reviews[0].name}
    <CustomFab size="medium" color="secondary" aria-label="add comment">
      <Comment />
    </CustomFab>
  </>
);

export default Reviews;
