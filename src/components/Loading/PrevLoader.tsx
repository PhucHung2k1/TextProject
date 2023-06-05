import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '@/store/hook';

function PrevLoader() {
  const showLoading = useAppSelector((state) => state.loadingSlice.isLoading);

  return showLoading ? (
    <div className="z-1002 fixed inset-0 h-screen w-screen cursor-wait">
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="-z-1 absolute inset-0 bg-black bg-opacity-30 bg-cover"
          style={{
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
        />
        <CircularProgress className="h-24 w-24" />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default PrevLoader;
