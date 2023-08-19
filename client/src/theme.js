import { createTheme } from "@mui/material/styles";
// primary: "#FFA357", // Matrix green

const Malachite = "#0BDA51";
const IslamicGreen = "#008f11";
const DarkGreen = "#003b00";
const VampireBlack = "#0d0208";

const theme = createTheme({
  palette: {
    text: {
      primary: Malachite,
      secondary: IslamicGreen,
      dark: DarkGreen,
    },
    background: {
      default: VampireBlack,
      paper: "none",
    },
  },
  typography: {
    fontSize: 18,
    fontFamily: [
      'Share Tech Mono',
      'monospace',
    ].join(','),
    // fontFamily: "'Borel, monospace",
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1.25rem",
    },
    body2: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#000000", // Black background
          color: "#00ff41", // Matrix green text
        },
        '*::-webkit-scrollbar': {
          width: '0.4em',
          backgroundColor: '#000000',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#00ff41',
        },
        'a': { // Targeting all <a> tags
          color: Malachite, // Color before clicked
          textDecoration: 'none',
          '&:hover': {
            color: IslamicGreen, // Color on hover
          },
          '&:visited': {
            color: DarkGreen, // Color after clicked
          },
        },
      },
    },
    MuiDivider: { // Customization for Divider component
      styleOverrides: {
        root: {
          backgroundColor: IslamicGreen, // Use the desired color
        },
      },
    },
  },
});

export default theme;
