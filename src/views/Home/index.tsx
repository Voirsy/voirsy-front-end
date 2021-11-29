import { Container, Grid } from '@mui/material';
import Filters from 'components/Filters';
import SalonCard from 'components/SalonCard';
import { SalonType } from '../../enums/salonType.enum';

const Home = () => (
  <main>
    <Filters />
    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Grid container spacing={3}>
        {[...Array(14)].map((_, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <SalonCard
              address="Targowa 59 lok. 1, 03-729"
              city="Warszawa"
              imageUrl="https://barbershoppoland.pl/wp-content/uploads/2019/12/MG_0733.jpg"
              name="Black Cat Beauty & Spa Praga Północ"
              salonType={SalonType.Barber}
              rating={4.17}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </main>
);

export default Home;
