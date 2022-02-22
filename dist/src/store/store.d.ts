/// <reference types="redux-persist/types/persistReducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './reducers/reducer';
declare const store: import("@reduxjs/toolkit").EnhancedStore<import("redux").EmptyObject & {
    pdfData: Partial<import("./reducers/pdfData").PDFData>;
    template: import("./reducers/template").Template;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<import("redux-thunk").ThunkMiddleware<import("redux").EmptyObject & {
    pdfData: Partial<import("./reducers/pdfData").PDFData>;
    template: import("./reducers/template").Template;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<import("redux").EmptyObject & {
    pdfData: Partial<import("./reducers/pdfData").PDFData>;
    template: import("./reducers/template").Template;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction, undefined> | import("redux").Middleware<{}, import("redux").EmptyObject & {
    pdfData: Partial<import("./reducers/pdfData").PDFData>;
    template: import("./reducers/template").Template;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").Dispatch<import("redux").AnyAction>>>>;
declare const persistor: import("redux-persist").Persistor;
export { store, persistor };
export declare type AppDispatch = typeof store.dispatch;
export declare type AppState = typeof store.getState;
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
