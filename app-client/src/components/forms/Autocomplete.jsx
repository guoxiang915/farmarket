import React from 'react';
import { useAutocomplete } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import { Chip, NoSsr } from '@material-ui/core';
import styled from 'styled-components';

const InputWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  box-sizing: border-box;
  min-height: 42px;

  &:hover {
    border-bottom: 2px solid black;
  }

  &.focused {
    border-bottom: 2px solid #27ae60;
  }

  & .MuiChip-root {
    margin: 4px;
  }

  & input {
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: none;
    outline: none;
  }
`;

const Listbox = styled('div')`
  z-index: 1000;
  width: 100%;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  ul {
    list-style: none;

    & li {
      padding: 5px 12px;
      display: flex;

      & span {
        flex-grow: 1;
      }

      & svg {
        color: transparent;
      }
    }

    & li[aria-selected='true'] {
      background-color: #fafafa;
      font-weight: 600;

      & svg {
        color: #1890ff;
      }
    }

    & li[data-focus='true'] {
      background-color: #e6f7ff;
      cursor: pointer;

      & svg {
        color: #000;
      }
    }
  }
`;

export default function Autocomplete({ options, onChange, InputProps }) {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: InputProps?.id || 'form-autocomplete',
    defaultValue: [],
    multiple: true,
    options: options,
    getOptionLabel: option => option.title,
  });

  return (
    <NoSsr>
      <div style={{ position: 'relative', zIndex: 100000 }}>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            {value.map((option, index) => (
              <Chip
                label={option.title}
                variant="outlined"
                {...getTagProps({ index })}
              />
            ))}

            <input {...getInputProps()} {...InputProps} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox>
            <ul {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                // eslint-disable-next-line
                <li
                  {...getOptionProps({ option, index })}
                  onClick={() => {
                    const selected = value.findIndex(
                      item => item.id === option.id
                    );
                    if (selected !== -1) {
                      value.splice(selected, 1);
                    } else {
                      value.push(option);
                    }
                    onChange([...value]);
                  }}
                >
                  <span>{option.title}</span>
                  <CheckIcon fontSize="small" />
                </li>
              ))}
            </ul>
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}
