import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import NavbarContainer from './Components/Shared/Navbar/NavbarContainer';
import PDFView from './Components/PDFView/PDFViewContainer';

function App() {
  return (
    <div className='h-screen'>
      <NavbarContainer />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/create' element={<PDFView />} />
      </Routes>
    </div>
  );
}

export default App;
