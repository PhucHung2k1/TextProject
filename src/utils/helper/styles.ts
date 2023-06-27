// text field
export const sxTextField = {
  '& .MuiInputBase-root.Mui-focused': {
    '& > fieldset': {
      borderColor: '#00BDD6',
    },
  },
  '& label.Mui-focused': {
    color: '#00BDD6',
  },
};

export const sxCheckBoxBlack = {
  '&.MuiCheckbox-root': {
    color: '#404044',
  },
};


export const sxTextFieldError = {

  '& .MuiFormLabel-root.Mui-error': {
    color: '#737277 !important',
  },

};

// Select
export const sxSelect = {
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00BDD6',
  },
  color: '#404044',
};
// disable text field
export const sxDisableTextField = {
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: '#404044',
    fontWeight: '600',
    fontSize: '16px',
  },
};

// checkbox
export const sxCheckBox = {
  '&.Mui-checked': {
    color: '#404044',
  },
};

export const sxSwitchBlue = {
  display: 'block',
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#00BDD6',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#00BDD6',
  },
};
export const sxButtonBlue = {
  '&:hover': { backgroundColor: '#00ADC3' },
};

