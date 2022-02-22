import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLoader from './Components/Shared/Loader/PageLoader';
import NavbarContainer from './Components/Shared/Navbar/NavbarContainer';

const LandingPage = lazy(() => import('./Components/LandingPage/LandingPage'));
const PDFView = lazy(() => import('./Components/PDFView/PDFViewContainer'));

function App() {
  return (
    <div className='h-screen'>
      <NavbarContainer />
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<PageLoader />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path='/create'
          element={
            <Suspense fallback={<PageLoader />}>
              <PDFView />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
