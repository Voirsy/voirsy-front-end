import NoContent from '../NoContent';
import { Comment } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { Salon } from 'models/admin.model';
import { useTranslation } from 'react-i18next';

const Portfolio = ({ portfolio }: Pick<Salon, 'portfolio'>) => {
  const [translation] = useTranslation('salon');

  return (
    <>
      {portfolio.length === 0 ? (
        <NoContent text={translation('salon:portfolio.noImages')} icon={<Comment />} />
      ) : (
        <Box height="100%">
          <Grid container spacing={1}>
            {portfolio.map((el) => (
              <Grid item key={el} xs={12} md={4} sx={{ height: 250 }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={el} alt="" loading="lazy" />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Portfolio;
