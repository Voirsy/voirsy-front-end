import { Grid, Typography, Rating } from '@mui/material';
import image from 'assets/salon.jpg';
import { CustomImg, CustomPaper } from './salonCard.styles';
import RoomIcon from '@mui/icons-material/Room';

const SalonCard = ({ data }: { data: any }) => (
  <CustomPaper>
    <Grid container columnSpacing={1}>
      <Grid item container xs={2} justifyContent="center" alignItems="center">
        <CustomImg alt="salon image" src={image} />
      </Grid>
      <Grid item xs container direction="column" justifyContent="space-evenly">
        <Grid item>
          <Typography variant="subtitle1">{data.title}</Typography>
        </Grid>
        <Grid item>
          <Rating readOnly value={data.rating} size="small" precision={0.5} />
        </Grid>
        <Grid item container alignItems="center">
          <RoomIcon color="action" />
          <Typography variant="body2">
            {`${data.street}, ${data.zipCode}, ${data.city}`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </CustomPaper>
);
export default SalonCard;
