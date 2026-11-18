import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from './components/Portfolio';
import { Toaster } from './components/ui/toaster';
import { trackPageView } from './lib/analytics';

function App() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;