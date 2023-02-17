import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "react-circular-progressbar/dist/styles.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const [colorScheme, setColorScheme] = React.useState("light");
// const toggleColorScheme = (value) =>
//   setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      > */}
      <MantineProvider
        theme={{
          breakpoints: {
            xs: 500,
            sm: 800,
            md: 1000,
            lg: 1200,
            xl: 1400,
          },
        }}
      >
        <App />
      </MantineProvider>
      {/* </ColorSchemeProvider> */}
    </BrowserRouter>
  </Provider>
);
