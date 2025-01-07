import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "src/app/providers/StoreProvider";

const root = createRoot(document.getElementById("root")!);

root.render(
    <BrowserRouter basename="/">
        <StoreProvider>
            <App />
        </StoreProvider>
    </BrowserRouter>
);
