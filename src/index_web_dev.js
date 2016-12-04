import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
import 'i18n'

import middlewares from './middleware/index_web'
import routes from './routes_web'
import rootReducer from './reducers'

import createLogger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(thunk, ...middlewares, createLogger()))

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers')
        store.replaceReducer(nextRootReducer)
    })
}

const history = syncHistoryWithStore(hashHistory, store)

render(
    <Provider store={ store } >
        <Router history={history} children={routes}/>
    </Provider>,
    document.getElementById('root')
)