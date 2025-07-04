import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
// import { persistedStore } from "./redux/store";
import { store } from "./redux/store.ts";
import { routes } from "./routes/routes.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistedStore}> */}
          <RouterProvider router={routes} />
        {/* </PersistGate> */}
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
