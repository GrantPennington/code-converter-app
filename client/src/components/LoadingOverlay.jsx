import { Backdrop, CircularProgress, Typography } from '@mui/material';

const LoadingOverlay = ({ open = false, message = '', secondaryMessage = '' }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        color: '#000',
        flexDirection: 'column',
      }}
    >
      <CircularProgress color="inherit" size={52}/>
      {message && (
        <Typography sx={{ mt: 4, fontSize: '1.3rem', fontWeight: 525 }}>
          {message}
        </Typography>
      )}
      {secondaryMessage && (
        <Typography sx={{ mt: 0.5, fontSize: '0.7rem', fontWeight: 200, color: 'rgba(100,100,100,0.85)' }}>
          {secondaryMessage}
        </Typography>
      )}
    </Backdrop>
  );
};

export default LoadingOverlay;