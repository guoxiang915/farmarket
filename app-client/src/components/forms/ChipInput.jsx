import React from 'react';
import MUIChipInput from 'material-ui-chip-input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    width: '100%',

    '& .MuiChip-root': {
      background: 'transparent',
      border: `1px solid ${theme.colors.primary.main}`,
      color: 'black',
    },
  },
}));

export default function ChipInput({ value, name, onChange }) {
  const classes = useStyles();

  return (
    <MUIChipInput
      className={classes.input}
      value={value}
      name={name}
      onAdd={e => {
        const newValue = value || [];
        newValue.push(e);
        onChange({
          target: {
            name,
            value: [...newValue],
          },
        });
      }}
      onDelete={e => {
        const newValue = value || [];
        newValue.splice(newValue.indexOf(e), 1);
        onChange({
          target: {
            name,
            value: [...newValue],
          },
        });
      }}
    />
  );
}
