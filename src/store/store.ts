import { configureStore } from '@reduxjs/toolkit';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import storage from '../storage';
import firebaseConfig from './fbConfig';
import firebaseConfigProd from './fbConfig-prod';
import { reducers } from './reducers/reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const fbConfig =
  process.env.NODE_ENV === 'development' ? firebaseConfig : firebaseConfigProd;

if (firebase.apps.length === 0) {
  firebase.initializeApp(fbConfig);
}

if (process.env.NODE_ENV === 'development') {
  const db = getFirestore();
  connectFirestoreEmulator(db, 'localhost', 8080);
  const functions = getFunctions();
  connectFunctionsEmulator(functions, 'localhost', 5001);
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://localhost:9099');
  // const firebaseStorage = getStorage();
  // connectStorageEmulator(firebaseStorage, 'localhost', 9199);
}

const store = configureStore({
  reducer: persistedReducer || reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return middleware;
  },
});

const persistor = persistStore(store);
export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
