import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({
  open,
  onClose,
  title,
  size,
  darkBackground,
  disableBackdropClick,
  children,
}) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: size === 'small' ? 400 : size === 'large' ? 800 : 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
  };

  return (
    <Modal
      open={open}
      onClose={disableBackdropClick ? undefined : onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        backdropFilter: darkBackground ? 'blur(5px)' : 'none',
        backgroundColor: darkBackground ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
      }}
      disableBackdropClick={disableBackdropClick}
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id="modal-description">{children}</Box>
      </Box>
    </Modal>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  darkBackground: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

CustomModal.defaultProps = {
  size: 'medium',
  darkBackground: false,
  disableBackdropClick: false,
};

export default CustomModal;