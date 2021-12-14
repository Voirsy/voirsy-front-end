import { Chip } from '@mui/material';

const FilterChip = ({ label, onDelete }: { label: string; onDelete: () => void }) => (
  <Chip label={label} onDelete={onDelete} color="secondary" sx={{ textTransform: 'capitalize' }} />
);

export default FilterChip;
