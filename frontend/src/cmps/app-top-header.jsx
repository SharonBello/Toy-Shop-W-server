import React from "react";
import { UserMsg } from './user-msg.jsx'

export const AppTopHeader = (props) => {

    return (
        <header className="title-header">
            <div className="title-header-items">
                Treasures & Giggles
                <span className="company-info-container">
                    <button type="button" className="play-video">
                        <span className="toy-video">

                            <video className="toy-video" width="53" height="30" autoplay>
                                <source src={require('../assets/video/girls-play.mp4')} type="video/ogg" />
                            </video>
                            Play the film</span>
                    </button>
                    <div className="learn-more-container">
                    </div><a target="_blank" href="/about" className="learn-more">Learn more</a>
                </span>
            </div>
            <UserMsg />
        </header>
    )
}
