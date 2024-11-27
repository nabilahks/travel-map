import 'mapbox-gl/dist/mapbox-gl.css'; // Tambahkan ini
import '../styles/globals.css';
import theme from '@/styles/theme';
import { ThemeProvider } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );

}
