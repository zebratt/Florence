import './News.scss'
import React from 'react'

export default ({ news = [], title, isOutLink, clickHandler }) => {
    return (
        <iv className="news">
            <div className="block-title">{title}</div>
            <ul className="list">
                {news.map((item, idx) => {
                    // const createTime = item.createTime ? new Date(item.createTime).toLocaleString() : ''
                    return (
                        <li key={idx} className="item">
                            {isOutLink && (
                                <a target="_blank" className="title" href={item.url}>
                                    {item.title}
                                </a>
                            )}
                            {!isOutLink && (
                                <div
                                    className="title"
                                    onClick={(eve) => {
                                        eve.preventDefault()
                                        clickHandler(item.url)
                                    }}
                                >
                                    {item.title}
                                    <span className="create-time">{item.createTime}</span>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </iv>
    )
}
