import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageLoader from './Components/Shared/Loader/PageLoader';
import NavbarContainer from './Components/Shared/Navbar/NavbarContainer';

const LandingPage = lazy(() => import('./Components/LandingPage/LandingPage'));
const PDFView = lazy(() => import('./Components/PDFView/PDFViewContainer'));

function App() {
  return (
    <div className='h-screen'>
      <ToastContainer />
      <NavbarContainer />
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
              <PDFView />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
