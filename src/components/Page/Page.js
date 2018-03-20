import React from 'react'
import Header from '../Header'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar'

class Page extends React.Component {
    render() {
        const { namespace } = this.props
        const classes = 'm-page ' + (namespace ? namespace : '')

        return (
            <div class={namespace}>
                <Header />
                <NavBar />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Page
