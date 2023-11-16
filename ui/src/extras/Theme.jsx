import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: createColor('#F05454'),
    secondary: createColor('#F05454'),
    black: createColor('#121212'),
    white: createColor('#FFFFFF'),
    grey: createColor('#666666'),
  },
}));

export function Theme({children}) {
    return (
        <ThemeProvider theme={theme} >
            {children}
        </ThemeProvider>
    )
};