import { SalonTypes } from './salon.types';
import { Modal } from '@mui/material';
import { CustomWrapper } from './salon.styled';

const Salon = ({ pageType }: SalonTypes) => (
  <Modal open>
    <CustomWrapper padding="25px" paddingBottom="0">
      Salon: {pageType} <br />
    </CustomWrapper>
  </Modal>
);

export default Salon;
