import React from 'react'
import '../../styles/top_searchbar.sass'

export const TopBar = () => {

    return (<>
        <div className="dashboard-bar p-3">
            <h3>Dashboard</h3>
            <div className="d-flex flex-row gap-3 align-items-center">

                <input className='search-input' type="text" name="search" id="search" placeholder="🔎 Search" />
                <div className="d-flex flex-row gap-3 align-items-center justify-content-center" style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: '#444', cursor: 'pointer' }}>
                    <i className="fa-regular fa-bell" style={{ "color": "#ffffff" }}></i>
                </div>
                <img src="https://picsum.photos/id/64/200/200" alt="profile picture" style={{ height: '3em', width: '3em', objectFit: 'contain', borderRadius: '50%' }} />
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h5 className="m-0">Sarah Paul</h5>
                    <h6 className="m-0 text-secondary">Account Details</h6>
                </div>
            </div>
        </div>
    </>)
}