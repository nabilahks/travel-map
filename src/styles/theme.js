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
  },
});

export default theme;
