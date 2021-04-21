import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import React from 'react';

export default function ReadonlyText({ onOpen, editable = false, ...props }) {
  return (
    <TextField
      fullWidth
      InputProps={{
        readOnly: !editable,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onOpen}>
              <KeyboardArrowRight />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
