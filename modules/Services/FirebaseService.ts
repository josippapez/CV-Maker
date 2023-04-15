import firebaseConfig from '@/store/fbConfig';
import firebaseConfigProd from '@/store/fbConfig-prod';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, User, connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import {
  Functions,
  connectFunctionsEmulator,
  getFunctions,
} from 'firebase/functions';
import {
  FirebaseStorage,
  connectStorageEmulator,
  getStorage,
} from 'firebase/storage';

export class FirebaseService {
  private static instance: FirebaseService;
  private firebaseApp: FirebaseApp;
  private auth: Auth;
  private firestore: Firestore;
  private storage: FirebaseStorage;
  private functions: Functions;
  private user: User | null;

  private constructor() {
    const fbConfig =
      process.env.NODE_ENV === 'development'
        ? firebaseConfig
        : firebaseConfigProd;

    this.firebaseApp = initializeApp(fbConfig);
    this.auth = getAuth(this.firebaseApp);
    this.firestore = getFirestore(this.firebaseApp);
    this.storage = getStorage(this.firebaseApp);
    this.functions = getFunctions(this.firebaseApp);
    this.user = this.auth.currentUser;
    if (process.env.NODE_ENV === 'development') this.initEmulators();
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  getFirebaseApp(): FirebaseApp {
    return this.firebaseApp;
  }
  getAuth(): Auth {
    return this.auth;
  }
  getFirestore(): Firestore {
    return this.firestore;
  }
  getStorage(): FirebaseStorage {
    return this.storage;
  }
  getFunctions(): Functions {
    return this.functions;
  }

  getUser(): User | null {
    return this.user;
  }

  initEmulators() {
    connectFirestoreEmulator(this.firestore, 'localhost', 8080);
    connectFunctionsEmulator(this.functions, 'localhost', 5001);
    connectAuthEmulator(this.auth, 'http://localhost:9099');
    connectStorageEmulator(this.storage, 'localhost', 9199);
  }
}
