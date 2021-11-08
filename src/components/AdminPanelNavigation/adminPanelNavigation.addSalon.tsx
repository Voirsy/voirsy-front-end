import { AddOutlined } from '@mui/icons-material';
import { CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CustomAddSalonCard } from './adminPanelNavigation.styled';

const AddSalonCard = () => (
  <CustomAddSalonCard>
    <Link to="/salons/add/1">
      <CardActionArea>
        <CardContent>
          <Stack alignItems="center">
            <AddOutlined />
            <Typography variant="button" fontSize={18}>
              Add salon
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Link>
  </CustomAddSalonCard>
);

export default AddSalonCard;
