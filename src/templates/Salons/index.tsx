import { ReactNode } from 'react';
import { useFetchAllSalonsQuery } from 'store/api/admin';

const SalonsTemplate = ({ children }: { children: ReactNode }) => {
  const { data = [] } = useFetchAllSalonsQuery();

  console.log(data);

  return <div>{children}</div>;
};

export default SalonsTemplate;
