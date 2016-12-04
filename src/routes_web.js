import React from 'react'
import App from './containers/App'
import HomeRoute from './containers/home_web/routes'

export default {
    path: '/',
    component: App,
    indexRoute: HomeRoute,
    childRoutes: [
        HomeRoute
    ]
}