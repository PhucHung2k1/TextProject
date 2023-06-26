//text field
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
