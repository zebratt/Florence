import './Page.scss'
import React from 'react'
import Header from '../Header'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar'

class Page extends React.Component {
    render() {
        const { namespace } = this.props
        const classes = 'm-page ' + (namespace ? namespace : '')

        return (
            <div className="g-page">
                <Header />
                <NavBar />
                <div className={classes}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Page
