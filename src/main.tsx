import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "src/app/providers/StoreProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

root.render(
    <BrowserRouter basename="/">
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StoreProvider>
    </BrowserRouter>
);
