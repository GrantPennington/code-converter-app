import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//         mode: 'light',
//         primary: {
//             main: '#1976d2',
//         },
//     },
//     typography: {
//         fontFamily: `'Inter', sans-serif`,
//     },
// });
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d1117',   // dark navy
      paper: '#161b22',     // slightly lighter
    },
    primary: {
      main: '#7f5af0',       // purple
    },
    secondary: {
      main: '#46caff',       // bright blue accent
    },
    text: {
      primary: '#ffffff',
      secondary: '#c9d1d9',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;