import { Typography } from '@mui/material';
import Spinner from 'components/Spinner';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchAllSalonsQuery } from 'store/api/admin';

const SalonsTemplate = ({ children }: { children: ReactNode }) => {
  const [translation] = useTranslation();
  const { data = [], isFetching, isError } = useFetchAllSalonsQuery();

  console.log(data);

  if (isError)
    return (
      <Typography variant="h5" textAlign="center" marginTop={5}>
        {translation('admin:salonTemplate.error')}
      </Typography>
    );

  if (isFetching) return <Spinner />;

  return <div>{children}</div>;
};

export default SalonsTemplate;
