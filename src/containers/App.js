import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setLanguage, getResource} from 'i18n';

import {decodeQueryParam} from 'libs/utils/queryParam'
import TopAlert from 'libs/top_alert';
import TopConfirm from 'libs/top_confirm'
import {confirmOK, confirmClose, hideProgress} from 'libs/common/actions/app';

import '../styles/index.less';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {alert, confirmProps} = this.props;
        return (
            <div>
                <TopAlert {...alert} />
                <TopConfirm {...confirmProps}
                            onOk={this.topConfirmOk.bind(this)}
                            onClose={this.topConfirmClose.bind(this)}/>
                {this.props.children}
            </div>
        )
    }

    topConfirmOk() {
    }

    topConfirmClose() {
    }

}

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser,
        alert: state.alert,
        confirmProps: state.confirm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        confirmOK: bindActionCreators(confirmOK, dispatch),
        confirmClose: bindActionCreators(confirmClose, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);