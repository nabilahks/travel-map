import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Concert One', sans-serif", 
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
          color: "white",
          "&.Mui-selected": {
            backgroundColor: "white",
            color: "black",
          },
          "&:hover": {
            backgroundColor: "#555",
            color: "white",
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
          color: "white", 
          "&.Mui-focused": {
            color: "#00FFFF",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          backgroundColor: "#333",
          color: "white",
        },
        icon: {
          color: "white",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#333", 
          color: "white", 
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#444",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px", // Membuat rounded border
            backgroundColor: "#333", // Background putih
            color: "white", // Teks hitam
            "& fieldset": {
              borderColor: "#ccc", // Warna border default
            },
            "&:hover fieldset": {
              borderColor: "#aaa", // Warna border saat hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00FFFF", // Warna border saat fokus
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px", // Rounded button
          backgroundColor: "#00FFFF", // Background putih
          color: "black", // Teks hitam
          "&:hover": {
            backgroundColor: "#ddd", // Background saat hover
          },
        },
      },
    },
  },
});

export default theme;
