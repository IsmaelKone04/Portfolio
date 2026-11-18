import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from './components/Portfolio';
import Admin from './components/Admin';
import { Toaster } from './components/ui/toaster';
import { trackPageView } from './lib/analytics';
import { ContentProvider } from './contexts/ContentContext';

function App() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ContentProvider>
                <Portfolio />
              </ContentProvider>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;