import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { mapRoutes } from '../../../routes'


const routeList = mapRoutes()
// console.log("path     :  ", route.path)
// console.log("component:  ", route.component)

// TODO: code splitting by @loadable/component
function Mains() {
  return (
    routeList.map(route =>

    (

      <Route
        key={route.path}
        path={route.path}
        element={route.component}
      >

      </Route>

    )
    )
  );
}

export default Mains;
