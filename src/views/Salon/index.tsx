import { Modal, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import { useParams, Link } from 'react-router-dom';
import { CustomLink, CustomSalonAddress, CustomSalonName, CustomWrapper } from './salon.styled';
import { useFetchSpecifiedSalonDataQuery } from 'store/api/salon';

const Salon = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const { data } = useFetchSpecifiedSalonDataQuery({ salonId });

  if (data === undefined) return null;

  return (
    <Modal open>
      <CustomWrapper padding="25px" paddingBottom="0">
        <Stack direction="row" spacing={3}>
          <CustomLink component={Link} to="/">
            <ChevronLeftIcon />
          </CustomLink>
          <Stack spacing={-0.5} overflow="hidden">
            <CustomSalonName variant="h4" noWrap>
              {data.name}
            </CustomSalonName>
            <CustomSalonAddress variant="body1" noWrap>{`${data.address} ${data.city}`}</CustomSalonAddress>
          </Stack>
        </Stack>
      </CustomWrapper>
    </Modal>
  );
};

export default Salon;
