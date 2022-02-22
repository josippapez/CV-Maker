import { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './reducers/reducer';
export declare const useAppDispatch: () => import("redux").Dispatch<import("redux").AnyAction> & import("redux-thunk").ThunkDispatch<import("redux").EmptyObject & {
    pdfData: Partial<import("./reducers/pdfData").PDFData>;
    template: import("./reducers/template").Template;
} & import("redux-persist/es/persistReducer").PersistPartial, null, import("redux").AnyAction> & import("redux-thunk").ThunkDispatch<import("redux").EmptyObject & {
    pdfData: Partial<import("./reducers/pdfData").PDFData>;
    template: import("./reducers/template").Template;
} & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").AnyAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
