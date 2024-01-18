import React, { useState, useEffect } from 'react'
import '../../../styles/dash_tabs.sass'

export const DashTabs = ({activeTab, setActiveTab}) => {

    const [active, setActive] = useState(activeTab);


    return (<>

        <div className="navbar-margin dashboard-tabs--container">
            <div className="dashboard-tabs--bar">
                
                <div
                    className={`${active == 1 ? 'dashboard-tabs--tab--active' : '' } dashboard-tabs--tab`}
                    onClick={() => setActiveTab(1)}>
                    Stocks
                </div>
                <div
                    className={`${active == 2 ? 'dashboard-tabs--tab--active' : '' } dashboard-tabs--tab`}
                    onClick={() => setActiveTab(2)}>
                    Cryptocurrencies
                </div>
            </div>
            <div className="dashboard-tabs--hr"></div>
        </div>
    </>)
}