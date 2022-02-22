import Routes from './Routes'
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Oxygen',
      textTransform: 'none',
      fontSize: 16,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
