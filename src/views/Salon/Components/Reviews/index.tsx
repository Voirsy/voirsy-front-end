import { Comment } from '@mui/icons-material';
import { CustomFab } from './reviews.styled';

const Reviews = () => (
  <CustomFab size="medium" color="secondary" aria-label="add comment">
    <Comment />
  </CustomFab>
);

export default Reviews;
