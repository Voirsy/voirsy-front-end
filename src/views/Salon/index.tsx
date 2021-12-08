import { Modal } from '@mui/material';
import { CustomWrapper } from './salon.styled';
import { useFetchSpecifiedSalonDataQuery } from 'store/api/salon';
import { useParams } from 'react-router-dom';

const Salon = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const { data } = useFetchSpecifiedSalonDataQuery({ salonId });

  if (data === undefined) return null;

  return (
    <Modal open>
      <CustomWrapper padding="25px" paddingBottom="0">
        Salon:
        {JSON.stringify(data)}
      </CustomWrapper>
    </Modal>
  );
};

export default Salon;
