import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { authStateType } from './features/auth/authSlice';
import authReducer from './features/auth/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
export type globalStore = {
    auth: authStateType;
};
const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
