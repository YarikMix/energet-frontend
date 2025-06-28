// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import { configuratorReducer } from "entities/Configurator";
import { orderReducer } from "entities/Order";
import { userReducer } from "entities/User";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "auth",
    storage,
};

export const store = configureStore({
    reducer: {
        userReducer: persistReducer(persistConfig, userReducer),
        orderReducer,
        configuratorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persister = persistStore(store);
