import React from 'react'
import {Routes} from "../routes/routes";
import {ConnectedNavMenu} from "../navMenu/navMenu";
import {ConnectedTitleBar} from "../titleBar/titleBar";

export const App: React.SFC = () => (
    <div className="app-main">
        <ConnectedNavMenu />
        <div className="page-container">
            <ConnectedTitleBar />
            <div className="app-content">
                <div className="r-wrapper-container">
                    <Routes/>
                </div>
            </div>
        </div>
    </div>
);
