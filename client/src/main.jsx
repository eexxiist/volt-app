import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserStore from "./store/userStore";
import DeviceStore from "./store/deviceStore";
import CartStore from "./store/cartStore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        cart: new CartStore(),
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);
