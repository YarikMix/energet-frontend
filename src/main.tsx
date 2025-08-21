import { YMaps } from "@pbe/react-yandex-maps";
import * as Sentry from "@sentry/react";
import * as VKID from "@vkid/sdk";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "src/app/providers/StoreProvider";
import App from "./app/App.tsx";

VKID.Config.init({
    app: import.meta.env.VITE_VK_SDK_APP_ID,
    redirectUrl: import.meta.env.VITE_VK_ID_REDIRECT_URL,
    scope: "email",
    responseMode: VKID.ConfigResponseMode.Callback,
});

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

if (
    process.env.NODE_ENV == "production" &&
    import.meta.env.VITE_SENTRY_ENABLED === "true"
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
