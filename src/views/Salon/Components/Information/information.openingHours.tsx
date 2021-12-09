import { Salon } from 'models/admin.model';
import { Stack, Typography } from '@mui/material';
import { DaysOfTheWeek } from 'enums/dayOfTheWeek.enum';
import { CustomDetailsSection, CustomSectionHeader } from './infromation.styled';
import { useTranslation } from 'react-i18next';

const OpeningHours = ({ openingHours }: Pick<Salon, 'openingHours'>) => {
  const [translation] = useTranslation();
  const hours = Object.values(DaysOfTheWeek).map(
    (day) => openingHours.find((el) => el.name === day) || { name: day, open: null, close: null }
  );

  return (
    <CustomDetailsSection>
      <CustomSectionHeader variant="button">{translation('salon:details.openingHours.label')}</CustomSectionHeader>
      {hours.map(({ name, open, close }) => (
        <Stack key={name} direction="row" spacing={1.25} justifyContent="space-between">
          <Typography sx={{ textTransform: 'capitalize' }}>
            {translation(`salon:details.openingHours.daysOfTheWeek.${name.toLowerCase()}`)}
          </Typography>
          <Typography>{open && close ? `${open} - ${close}` : 'closed'}</Typography>
        </Stack>
      ))}
    </CustomDetailsSection>
  );
};

export default OpeningHours;
