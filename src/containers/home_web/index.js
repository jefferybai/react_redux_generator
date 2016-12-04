import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import tplRender from './jsx/index.jsx'

class Home extends Component {
    render() {
        return tplRender.call(this)
    }
}

export default Home