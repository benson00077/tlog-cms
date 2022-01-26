import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './pages/Layouts/Layouts';
import loadable from '@loadable/component';
import { mapRoutes } from './routes'
import './global.scss'



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
            {routeList.map(route => {
              const AsyncComponent = loadable(
                () => import(`./containers/${route.component}`),
                { fallback: <h1>Loading</h1> }
              )

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<AsyncComponent />} />
              )
            })}
            <Route path="*" element={<h1>-----------404 not found</h1>} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
