import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ColdStartOverlay from './components/shared/ColdStartOverlay';
import AppRoutes from './routes';
import { ColdStartProvider, useColdStart } from './context/ColdStartContext';
import { registerColdStartCallbacks } from './services/api';

function AppInner() {
  const { start, stop } = useColdStart();

  useEffect(() => {
    registerColdStartCallbacks({ start, stop });
  }, [start, stop]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <AppRoutes />
        </main>
        <Footer />
      </div>
      <ColdStartOverlay />
    </BrowserRouter>
  );
}

function App() {
  return (
    <ColdStartProvider>
      <AppInner />
    </ColdStartProvider>
  );
}

export default App;
