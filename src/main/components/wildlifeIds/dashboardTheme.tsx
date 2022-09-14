import React from "react";
import {createTheme, ThemeOptions, ThemeProvider, Typography} from "@mui/material";

// export const theme = {
	// palette: {
    //     // https://material-ui.com/customization/palette/
    //     background: {
    //       default: '#f1f1f1'
    //     },
    //     primary: {
    //       light: '#5469a4',
    //       main: '#003366', // BC ID: corporate blue
    //       dark: '#001949',
    //       contrastText: '#ffffff'
    //     },
    //     secondary: {
    //       main: '#D8292F'
    //     },
    //     text: {
    //       primary: '#313132',
    //       secondary: '#7f7f81'
    //     }
    //   },
    //   typography: {
    //     fontFamily: ['BCSans', 'Verdana', 'Arial', 'sans-serif'].join(',')
    //   },
    //   components: {
    //     MuiCssBaseline: {
    //         styleOverrides: `
    //     h1 {
    //       letterSpacing: '-0.02rem';
    //         fontSize: '2rem';
    //         fontWeight: 700;
    //     }
    //   `,
      
          
    //   }
    // typography: {
	// 	fontFamily: [
	// 		'BCSans',
	// 		'Arial',
	// 		'sans-serif',
	// 		'"Apple Color Emoji"',
	// 		'"Segoe UI Emoji"',
	// 		'"Segoe UI Symbol"',
	// 	].join(',')
	// },
	// palette: {
	// 	primary: {
	// 		main: '#003366',
	// 	},
	// 	secondary: {
	// 		main: '#fade81',
	// 	},
	// 	background: {
	// 		default: '#dcdcdc',
	// 	},
	// },
// }};

const theme = createTheme();
theme.typography.h3 = {
    fontSize: '1.2rem',
    color:'pink',
    // '@media (min-width:600px)': {
    //   fontSize: '1.5rem',
    // },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  };

  export default function dashboardTheme() {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Responsive h3</Typography>
        <Typography variant="h1">Responsive h1</Typography>
      </ThemeProvider>
    );
  }