import { Add } from '@mui/icons-material';
import { Avatar, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CrewProps } from './crew.types';

const Crew = ({ register, watch, getValues, setValue }: CrewProps) => {
  const [translation] = useTranslation('admin');
  const addedCrew = watch('crew');

  const handleCrewAdd = () => {
    const crewArray = getValues('crew');
    const name = getValues('crewInput');
    const crewMember = {
      name,
      imageId: '',
    };
    if (Array.isArray(crewArray)) {
      crewArray.push(crewMember);
      setValue('crew', crewArray);
    } else {
      setValue('crew', [crewMember]);
    }
    setValue('crewInput', '');
  };

  const handleCrewDelete = (index: number) => {
    const crewArray = getValues('crew');
    crewArray.splice(index, 1);
    setValue('crew', crewArray);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <TextField
          variant="outlined"
          size="small"
          label={translation('createSalon.forms.crew.fullname')}
          type="text"
          sx={{ flexGrow: 1 }}
          {...register('crewInput')}
        />
        <Button onClick={handleCrewAdd} endIcon={<Add />} variant="outlined">
          {translation('createSalon.forms.crew.addButton')}
        </Button>
      </Stack>
      <Typography variant="body1" component="p">
        {translation('createSalon.forms.crew.heading')}:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {addedCrew &&
          addedCrew.map((member: { name: string; imageId: string }, index: number) => (
            <Chip
              key={index}
              label={member.name}
              avatar={<Avatar>{member.name[0]}</Avatar>}
              onDelete={() => handleCrewDelete(index)}
              color="secondary"
              sx={{ marginBottom: 1 }}
            />
          ))}
      </Stack>
    </>
  );
};

export default Crew;
