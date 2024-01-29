import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../store/appContext'
import { Spinner } from '../spinner'
import { useAuth0 } from '@auth0/auth0-react'


export const SmallTable = (props) => {

    const { isLoading } = useAuth0();

    const [filter, setFilter] = useState('')


    if (isLoading) return (<>
        <Spinner />
    </>)



    return (<>

        <div style={{ height: '35vh', display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative', ...props.style }}>
            <div className="portfolio-header--container">
                <h4>{props.title}</h4>
                <div>
                    <input className="portfolio-input-blue" type="text" placeholder="Filter..." name="" id="" value={filter} onChange={(e) => setFilter(e.target.value)} />
                </div>
            </div>
            <div className="portfolio-table--container">
                <div className="portfolio-table-header">
                    <div className="portfolio-table-header-name">Name</div>
                    <div className="portfolio-table-header-symbol">Symbol</div>
                </div>
                <div className="portfolio-hr"></div>
                <div className="portfolio-table-list portfolio-table-list-blue">
                    {props.data != [] && props.data.map((e, i) => (
                        
                            <div key={i} className="portfolio-table-list-item">
                                <div className="portfolio-table-list-item-name">{e.name}</div>
                                <div className="portfolio-table-list-item-symbol">{e.symbol}</div>
                            </div>
                        
                    ))
                    }
                </div>
            </div>
        </div>


    </>)
}
