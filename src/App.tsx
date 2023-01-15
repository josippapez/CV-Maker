import { getAuth, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFViewProvider } from './Components/PDFView/PDFViewProvider';
import PageLoader from './Components/Shared/Loader/PageLoader';
import NavbarPresenter from './Components/Shared/Navbar/NavbarPresenter';
import { useAppDispatch } from './store/hooks';
import { resetUser } from './store/reducers/user';

const LandingPage = lazy(() => import('./Components/LandingPage/LandingPage'));
const PDFView = lazy(() => import('./Components/PDFView/PDFViewContainer'));

function App() {
  const dispatch = useAppDispatch();

  // listen for token changes
  useEffect(() => {
    onAuthStateChanged(getAuth(), async user => {
      if (!user) {
        dispatch(resetUser());
        Cookies.remove('accessToken');
      } else {
        const token = await user.getIdToken();
        Cookies.set('accessToken', token);
      }
    });
    return onIdTokenChanged(getAuth(), async user => {
      if (!user) {
        Cookies.remove('accessToken');
      } else {
        const token = await user.getIdToken();
        Cookies.set('accessToken', token);
      }
    });
  }, []);

  // force refresh the token every 30 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth().currentUser;
      if (user) await user.getIdToken(true);
    }, 30 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <div className='h-screen'>
      <ToastContainer />
      <NavbarPresenter />
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<PageLoader isLoading />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path='/create'
          element={
            <Suspense fallback={<PageLoader isLoading />}>
              <PDFViewProvider>
                <PDFView />
              </PDFViewProvider>
            </Suspense>
          }
        />
        <Route
          path='/cv/:userId'
          element={
            <Suspense fallback={<PageLoader isLoading />}>
              <PDFViewProvider>
                <PDFView />
              </PDFViewProvider>
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
