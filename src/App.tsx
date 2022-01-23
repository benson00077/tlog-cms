import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './pages/Layouts/Layouts';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login">
            Test
          </Route>
          <Route path="/" element={<Layouts/>}>

          </Route>
        </Routes>

      </Router>
    </>
  );
}

export default App;
