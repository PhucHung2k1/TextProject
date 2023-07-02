import { Chip, IconButton } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface ILabelStyle {
  label: string;
  Id: string;
}
const StyledChip = styled(Chip)({
  position: 'relative',
});

const StyledDeleteIconButton = styled(IconButton)({
  position: 'absolute',
  top: -10,
  right: -15,
  padding: 0,
  width: '25px',
  height: '25px',
  borderRadius: '50%',
  '&.MuiIconButton-root': {
    backgroundColor: '#FFEBEF',
    '&:hover': {
      backgroundColor: '#FFEBEF',
    },
  },
});

const StyledCloseIcon = styled(CloseIcon)({
  fontSize: '18px',
  color: '#DA2036',
  marginTop: '-11px',
});

const LabelStyle = ({ label, Id }: ILabelStyle) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleMouseIn = () => {
    setIsActive(!isActive);
    console.log('hover in', isActive);
  };
  const handleMouseLeave = () => {
    setIsActive(!isActive);
    console.log('hover in', isActive);
  };
  return (
    <>
      <StyledChip
        key={Id}
        className="float-right mr-2 mt-2 bg-blue-50 px-[10px] py-[7px] text-[16px] font-normal text-blue-700"
        label={label}
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseLeave}
        onDelete={() => {}}
        deleteIcon={
          <StyledDeleteIconButton
            className={isActive === true ? 'visible' : 'hidden'}
          >
            <StyledCloseIcon />
          </StyledDeleteIconButton>
        }
        sx={{
          '& .MuiChip-deleteIcon': {
            display: isActive === true ? 'block' : 'none',
          },
        }}
      />
    </>
  );
};

export default LabelStyle;
