import {
  linearProgressClasses,
  styled,
  LinearProgress,
  Box,
} from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(0, 189, 214, 0.08)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 16,
    backgroundColor: '#80DFEB',
  },
}));

export const LinearProgressWithLabel = ({ value }: any) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <BorderLinearProgress variant="determinate" value={value} />
      </Box>
    </Box>
  );
};
