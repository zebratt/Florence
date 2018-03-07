import './News.scss'
import React from 'react'

export default ({ news, title }) => {
    return (
        <div className="news">
            <div className="block-title">{title}</div>
            <ul className="list">
                {news.map((item, idx) => {
                    return (
                        <li key={idx} className="item">
                            <a target="_blank" className="title" href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
