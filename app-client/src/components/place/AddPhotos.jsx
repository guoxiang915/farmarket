import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import {
  Box,
  Button,
  CircularProgress,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Dropzone from 'react-dropzone';
import { Close, CloudUpload, Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  dropzone: {
    borderRadius: 8,
    border: '1px dashed gray',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      height: 140,
    },
  },

  coverPhotos: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },

  coverPhotosItem: {
    width: 160,
    height: 120,
    marginBottom: 28,
    marginRight: 16,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },

  coverPhotosSelected: {
    borderColor: theme.colors.primary.errorRed,
    borderWidth: 1.5,
  },

  coverPhotosImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  coverPhotosText: {
    position: 'absolute',
    bottom: -8,
    left: 'calc(50% - 44px)',
    borderRadius: 12,
    fontSize: 11,
    height: 16,
    padding: '1px 10px',
    color: theme.colors.primary.white,
    background: 'gray',
  },

  coverPhotosRemoveSelection: {
    position: 'absolute',
    padding: 0,
    height: 24,
    width: 24,
    bottom: -12,
    left: 'calc(50% - 12px)',
    color: `${theme.colors.primary.white} !important`,
    background: `${theme.colors.primary.errorRed} !important`,
    border: 'none !important',
  },
}));

export default function AddPhotos() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(-1);
  const [loading] = useState(false);
  const dropzoneRef = useRef(null);

  const handleRemoveSelectedPicture = () => {
    files.splice(selectedPicture, 1);
    setFiles([...files]);
    setSelectedPicture(-1);
  };

  console.log(files);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Dropzone
        multiple
        ref={dropzoneRef}
        onDrop={newFiles =>
          setFiles([
            ...files,
            ...newFiles.map(file => URL.createObjectURL(file)),
          ])
        }
        noClick
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            className={classNames(
              classes.dropzone,
              selectedPicture !== -1 && classes.coverPhotosSelected
            )}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {/* eslint-disable-next-line */}
            {loading ? (
              <CircularProgress size={24} />
            ) : selectedPicture !== -1 ? (
              <Delete fontSize="large" color="error" />
            ) : (
              <CloudUpload fontSize="large" color="primary" />
            )}
            <Hidden xsDown>
              <React.Fragment>
                <Box pt={1} />
                <Typography variant="subtitle1">
                  {selectedPicture !== -1
                    ? 'Drag to remove picture here'
                    : 'Drag and drop picture here'}
                </Typography>
                <Box pt={1} />
                <Typography variant="subtitle1">Or</Typography>
              </React.Fragment>
            </Hidden>
            <Box paddingTop />
            {selectedPicture !== -1 ? (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleRemoveSelectedPicture}
              >
                Remove selected picture
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => dropzoneRef?.current?.open()}
                shadow
              >
                Select from device
              </Button>
            )}
            {selectedPicture !== -1 && (
              <React.Fragment>
                <Box paddingTop />
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => setSelectedPicture(-1)}
                >
                  <Close style={{ width: 9, height: 9 }} />
                  <Box pl={1} />
                  <Typography variant="body2">Deselect</Typography>
                </Button>
              </React.Fragment>
            )}
          </Box>
        )}
      </Dropzone>

      {/** uploaded coverPhotos */}
      <Box
        width="100%"
        pt={1}
        display="flex"
        flexWrap="wrap"
        className={classes.coverPhotos}
      >
        {files.map((file, index) => (
          <React.Fragment key={index}>
            <Box
              className={classNames(
                classes.coverPhotosItem,
                index === selectedPicture && classes.coverPhotosSelected
              )}
              onClick={() => setSelectedPicture(index)}
            >
              <img src={file} className={classes.coverPhotosImage} alt="" />
              {/* eslint-disable-next-line */}
              {index === selectedPicture ? (
                <IconButton
                  color="error"
                  onClick={handleRemoveSelectedPicture}
                  className={classes.coverPhotosRemoveSelection}
                >
                  <Delete fontSize="small" />
                </IconButton>
              ) : index === 0 ? (
                <Typography className={classes.coverPhotosText}>
                  Cover picture
                </Typography>
              ) : null}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
