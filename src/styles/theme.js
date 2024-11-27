import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Concert One', sans-serif", // Pastikan ini sinkron dengan globals.css
  },
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#ddd',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white", // Warna default teks
          "&.Mui-selected": {
            backgroundColor: "white", // Background halaman aktif
            color: "black", // Warna teks halaman aktif
          },
          "&:hover": {
            backgroundColor: "#555", // Background hover
            color: "white", // Warna teks hover
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: "16px",
          marginBottom: "16px",
          color: "white",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white", // Warna label default
          "&.Mui-focused": {
            color: "#00FFFF", // Warna label saat fokus
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "20px", // Border radius untuk dropdown
          backgroundColor: "#333", // Background dropdown
          color: "white", // Warna teks dropdown
        },
        icon: {
          color: "white", // Warna ikon dropdown
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#333", // Background menu dropdown
          color: "white", // Warna teks dalam dropdown
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#444", // Warna hover untuk item dropdown
          },
        },
      },
    },
  },
});

export default theme;
