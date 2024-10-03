import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider
          clientId={
            "883027007545-4vkoehj6mbglb5qjvs5ju6cnanvpchuo.apps.googleusercontent.com" ||
            ""
          }
        >
          <CookiesProvider>
            <BrowserRouter>
              {/* <AuthProvider> */}
              <App />
              {/* </AuthProvider> */}
            </BrowserRouter>
          </CookiesProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
