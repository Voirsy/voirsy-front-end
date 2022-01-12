import { useTranslation } from 'react-i18next';
import { CustomDetailsSection, CustomSectionHeader } from './information.styled';
import { Avatar, Stack, Typography } from '@mui/material';
import { Call } from '@mui/icons-material';
import OpeningHours from './information.openingHours';
import { Salon } from 'models/admin.model';

const Details = ({
  phone,
  openingHours,
  description,
  crew,
}: Pick<Salon, 'phone' | 'openingHours' | 'description' | 'crew'>) => {
  const [translation] = useTranslation();

  return (
    <>
      <CustomDetailsSection>
        <CustomSectionHeader variant="button">{translation('salon:details.contact.label')}</CustomSectionHeader>
        <Stack direction="row" spacing={1.25} justifyContent="space-between">
          <Call />
          <Typography>
            {phone
              .replace(/ /g, '')
              .split(/(.{3})/)
              .join(' ')}
          </Typography>
        </Stack>
      </CustomDetailsSection>
      <OpeningHours openingHours={openingHours} />
      <CustomDetailsSection>
        <CustomSectionHeader variant="button">{translation('salon:details.aboutUs.label')}</CustomSectionHeader>
        <Typography>{description}</Typography>
      </CustomDetailsSection>
      {crew.length > 0 && (
        <CustomDetailsSection>
          <CustomSectionHeader variant="button">{translation('salon:details.crew.label')}</CustomSectionHeader>
          <Stack overflow="auto" marginTop={1.25} direction="row" spacing={2}>
            {crew.map((el) => (
              <Stack key={el._id} spacing={1} alignItems="center" width="fit-content">
                <Avatar src={el.imageUrl} alt={el.name} sx={{ width: 70, height: 70 }} />
                <Typography variant="body1">{el.name}</Typography>
              </Stack>
            ))}
          </Stack>
        </CustomDetailsSection>
      )}
    </>
  );
};

export default Details;
