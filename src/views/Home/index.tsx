import { Container, Grid, ThemeProvider } from '@mui/material';
import Filters from 'components/Filters';
import ResultList from 'components/ResultList';
import theme from 'theme';

const Home = () => (
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);

export default Home;
