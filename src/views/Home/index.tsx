import { Container, Grid } from '@mui/material';
import Filters from 'components/Filters';
import SalonCard from 'components/SalonCard';
import { SalonType } from '../../enums/salonType.enum';

const Home = () => (
  <main>
    <Filters />
    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Grid container spacing={3} maxWidth={1400} sx={{ justifyContent: 'center' }}>
        {[...Array(14)].map((_, i) => (
          <Grid item key={i} sx={{ maxWidth: '344px', width: '100%' }}>
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
