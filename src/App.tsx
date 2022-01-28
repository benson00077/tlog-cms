import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './pages/Layouts/Layouts';
import loadable from '@loadable/component';
import { mapRoutes } from './routes'
import './global.scss'
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient'



// TODO: lazy loading / code splitting for those Nested Route page
function App() {

  const routeList = mapRoutes()

  return (
    <>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </>
  );
}

export default App;
