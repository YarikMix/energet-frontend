import { YMaps } from "@pbe/react-yandex-maps";
import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "src/app/providers/StoreProvider";
import App from "./app/App.tsx";

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

Sentry.init({
    dsn: `https://35af3f18fe92e1c399d5067fedc94bd6@energet-sentry.ru/2`,
    sendDefaultPii: true,
});

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
