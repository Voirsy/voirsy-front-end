import { useTranslation } from 'react-i18next';
import { CustomDetailsSection, CustomSectionHeader } from './infromation.styled';
import { Stack, Typography } from '@mui/material';
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
          <Typography>{phone}</Typography>
        </Stack>
      </CustomDetailsSection>
      <OpeningHours openingHours={openingHours} />
      <CustomDetailsSection>
        <CustomSectionHeader variant="button">{translation('salon:details.aboutUs.label')}</CustomSectionHeader>
        <Typography>{description}</Typography>
      </CustomDetailsSection>
      <CustomDetailsSection>
        <CustomSectionHeader variant="button">{translation('salon:details.crew.label')}</CustomSectionHeader>
        <div>
          {crew.map((el) => (
            <div key={el._id}>{el.name}</div>
          ))}
        </div>
      </CustomDetailsSection>
    </>
  );
};

export default Details;
