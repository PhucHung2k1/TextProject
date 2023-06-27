import {
  linearProgressClasses,
  styled,
  LinearProgress,
  Box,
} from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  // borderTopLeftRadius: 16,
  // borderTopRightRadius: 16,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(0, 189, 214, 0.08)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 16,
    background:
      'linear-gradient(90deg, #80DFEB 85%, #FFFFFF86 100%, #00F0FF00 0%);',
  },
}));

// eslint-disable-next-line unused-imports/no-unused-vars
interface Props {
  progress: number;
}
export const ProgressComponent = ({ progress }: Props) => {
  return (
    <Box className="absolute left-0 top-0 w-full">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Box>
      </Box>
    </Box>
  );
};
