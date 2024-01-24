import React, { useState, useEffect } from 'react'
import '../../../styles/dash_tabs.sass'

export const DashTabs = ({ activeTab, setActiveTab }) => {

    const [active, setActive] = useState(activeTab);

    const [innerWidth, setWith] = useState(window.innerWidth);

    const changeTab = (i) => {
        setActive(i)
        setActiveTab(i)
    }
    return (<>

        <div className="navbar-margin dashboard-tabs--container">
            <div className="dashboard-tabs--bar">

                <div
                    className={`${active == 1 ? 'dashboard-tabs--tab--active' : ''} dashboard-tabs--tab`}
                    onClick={() => changeTab(1)}>
                    <i className="fa-solid fa-circle" style={{ fontSize: '0.6em', color: '#4fa2ff' }}></i>
                    {(active === 1 || innerWidth > 900) && 'Stocks'}
                </div>
                <div
                    className={`${active == 2 ? 'dashboard-tabs--tab--active' : ''} dashboard-tabs--tab`}
                    onClick={() => changeTab(2)}>
                    <i className="fa-solid fa-circle" style={{ fontSize: '0.6em', color: '#ee8f02' }}></i>
                    {(active === 2 || innerWidth > 900) && 'Cryptocurrencies'}
                </div>
                <div
                    className={`${active == 3 ? 'dashboard-tabs--tab--active' : ''} dashboard-tabs--tab`}
                    onClick={() => changeTab(3)}>
                    <i className="fa-solid fa-circle" style={{ fontSize: '0.6em', color: '#5bf228' }}></i>
                    {(active === 3 || innerWidth > 900) && 'Forex'}
                </div>
                <div
                    className={`${active == 4 ? 'dashboard-tabs--tab--active' : ''} dashboard-tabs--tab`}
                    onClick={() => changeTab(4)}>
                    <i className="fa-solid fa-circle" style={{ fontSize: '0.6em', color: '#a7a7a7' }}></i>
                    {(active === 4 || innerWidth > 900) && 'Commodities'}
                </div>
            </div>
            <div className="dashboard-tabs--hr"></div>
        </div>
    </>)
}