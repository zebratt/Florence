import './Footer.scss'
import React from 'react'

export default (props) => {
    const classes = 'footer ' + (props.cls ? props.cls : '');

    return (
        <div className={classes} >
            <div className="content">
                <p>
                    <span className="right">浙ICP备17059803号-1</span>
                </p>
            </div>
        </div>
    )
}
