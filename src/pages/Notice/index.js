import './style.scss'
import React from 'react'
import Page from '../../components/Page/Page'
import { connect } from 'react-redux'

class Notice extends React.Component {
    render() {
        return <Page namespace="page-notice" />
    }
}

export default connect(state => {
    return { notice: state.Notice }
})(Notice)
