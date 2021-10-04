import { Grid, Typography, Rating, Paper } from '@mui/material';
import image from '../../assets/salon.jpg';
import { CustomImg, CustomGrid } from './salonCard.styles';

const SalonCard = ({ data }: { data: any }) => (
  <Paper>
    <Grid container columnSpacing={1}>
      <CustomGrid
        item
        container
        xs={4}
        justifyContent="center"
        alignItems="center"
      >
        <CustomImg alt="salon image" src={image} />
      </CustomGrid>
      <Grid item xs container direction="column">
        <Grid item>
          <Typography variant="subtitle1">{data.title}</Typography>
        </Grid>
        <Grid item>
          <Rating readOnly value={data.rating} size="small" precision={0.5} />
        </Grid>
        <Grid item>
          <Typography variant="body2">{`${data.street}, ${data.zipCode}, ${data.city}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);
export default SalonCard;
