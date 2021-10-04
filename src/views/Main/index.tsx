import { Container, Grid, ThemeProvider } from '@mui/material';
import Filters from '../../components/Filters';
import Header from '../../components/Header';
import ResultList from '../../components/ResultList';
import theme from '../../theme';

const Main = () => (
  <ThemeProvider theme={theme}>
    <main>
      <Header />
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

export default Main;
