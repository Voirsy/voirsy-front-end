import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import Filters from 'components/Filters';
import SalonCard from 'components/SalonCard';

const Home = () => (
  <main>
    <Filters />
    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Grid container spacing={3} maxWidth={1400} sx={{ justifyContent: 'center' }}>
        {[...Array(14)].map((_, i) => (
          <Grid item key={i}>
            <SalonCard
              address="Targowa 59 lok. 1, 03-729"
              city="Warszawa"
              imageUrl="https://barbershoppoland.pl/wp-content/uploads/2019/12/MG_0733.jpg"
              name="Black Cat Beauty & Spa Praga Północ"
              type="Barber"
              rating={4.17}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </main>
);

export default Home;
