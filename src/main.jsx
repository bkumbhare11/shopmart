import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "3px solid #000",
          padding: "5px",
          borderRadius: "10px",
        },
      }}
    />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
