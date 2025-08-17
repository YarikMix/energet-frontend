import { YMaps } from "@pbe/react-yandex-maps";
import * as Sentry from "@sentry/react";
import * as VKID from "@vkid/sdk";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "src/app/providers/StoreProvider";
import App from "./app/App.tsx";

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("VITE_SENTRY_ENABLED", import.meta.env.VITE_SENTRY_ENABLED);
console.log("VITE_VK_SDK_APP_ID", import.meta.env.VITE_VK_SDK_APP_ID);

VKID.Config.init({
    app: import.meta.env.VITE_VK_SDK_APP_ID,
    redirectUrl: "https://energet.shop",
    state: "state",
    codeVerifier: "codeVerifier",
    scope: "phone email",
});

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

if (
    process.env.NODE_ENV == "production" &&
    Boolean(import.meta.env.VITE_SENTRY_ENABLED)
) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        sendDefaultPii: true,
    });
}

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
