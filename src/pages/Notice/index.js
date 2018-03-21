import './style.scss'
import React from 'react'
import Page from '../../components/Page/Page'
import { connect } from 'react-redux'

class Notice extends React.Component {
    getNotice = () => {
        const id = this.props.match.params.id
        const notices = this.props.notices

        for (let i = 0; i < notices.length; i++) {
            if (notices[i].id == id) {
                return notices[i]
            }
        }
    }

    render() {
        const notice = this.getNotice()

        if(!notice){
            return null
        }

        return <Page namespace="page-notice">
            <div className="title">{notice.title}</div>
            <div className="content">{notice.content}</div>
        </Page>
    }
}

export default connect(state => {
    return { notices: state.Home.notices }
})(Notice)
