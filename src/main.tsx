import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "src/app/providers/StoreProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { YMaps } from "@pbe/react-yandex-maps";

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

root.render(
    <BrowserRouter basename="/">
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                <YMaps
                    query={{ apikey: "7598f796-f2f2-46ef-98c6-0ea557ad8e28" }}
                >
                    <App />
                </YMaps>
            </QueryClientProvider>
        </StoreProvider>
    </BrowserRouter>
);
