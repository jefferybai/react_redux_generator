import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { alert, confirm, i18n, lastVersion } from './app'

const appReducer = combineReducers({
    i18n,
    routing: routerReducer,
    alert,
    confirm,
    lastVersion
})

export default appReducer