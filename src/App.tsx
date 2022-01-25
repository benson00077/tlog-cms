import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './pages/Layouts/Layouts';
import Mains from './pages/Layouts/Mains/Mains';
import { mapRoutes } from './routes'

// TODO: lazy loading / code splitting for those Nested Route page
function App() {

  const routeList = mapRoutes()

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login">
            Test
          </Route>
          <Route path="/" element={<Layouts />}>
            {routeList.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component} />
            ))}
            <Route path="*" element={<h1>-----------404 not found</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
