import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    primary: "#0d2949",
    secondary: "#",
  },
  styles: {
    global: () => ({
      html: {
        bg: "primary",
        width: "100vw",
        height: "100vh",
      },
      body: {
        bg: "primary",
        width: "100vw",
        height: "100vh",
      },
      "#root": {
        bg: "primary",
        width: "100vw",
        height: "100vh",
      },
    }),
  },
});

export default theme;
