import { useAppSelector } from '@/store/hook';
import {
  linearProgressClasses,
  styled,
  LinearProgress,
  Box,
} from '@mui/material';

import { useState, useEffect } from 'react';

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

// eslint-disable-next-line unused-imports/no-unused-vars
export const LinearProgressWithLabel = () => {
  const totalSteps = 6;
  const progressSetupStore = useAppSelector(
    (state) => state.storeSlice.progressSetupStore
  );
  const prevProgressSetupStore = useAppSelector(
    (state) => state.storeSlice.prevProgress
  );
  const [progress, setProgress] = useState<number>(
    Math.round((100 / totalSteps) * prevProgressSetupStore)
  );

  useEffect(() => {
    const percentProgress = Math.round((100 / totalSteps) * progressSetupStore);

    if (progress >= 0 && progress <= 100) {
      if (progressSetupStore < prevProgressSetupStore) {
        if (percentProgress <= progress) {
          setProgress((prevProgress) => prevProgress - 1);
        }
      } else if (progress <= percentProgress) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }
  }, [progress]);
  return (
    <Box className="absolute left-0 top-0 w-[568px]">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Box>
      </Box>
    </Box>
  );
};
