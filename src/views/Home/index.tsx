import { Container, Grid } from '@mui/material';
import Filters from 'components/Filters';
import ResultList from 'components/ResultList';

const Home = () => (
  <main>
    <Filters />
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <ResultList />
        </Grid>
      </Grid>
    </Container>
  </main>
);

export default Home;
