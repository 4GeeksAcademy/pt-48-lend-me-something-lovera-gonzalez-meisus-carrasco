import React from 'react';
import "../../styles/spinner.sass"

export const Spinner = () => {
  return (<>
    <div className="navbar-margin" style={{ height: '46rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <i className="fa-solid fa-spinner spinner-icon"></i>
    </div>
  </>)
}

export default Spinner;