import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from "@/store/slice/userSlice.ts"
import authSlice from "@/store/slice/authSlice.ts"
import { baseAPI } from "@/API/baseAPI.ts"
import { authAPI } from "@/modules/Login/API/authAPI.ts"

const rootReducer = combineReducers({
    userReducer: userSlice,
    authReducer: authSlice,
    [baseAPI.reducerPath]: baseAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseAPI.middleware,
            authAPI.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch