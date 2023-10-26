import React from 'react'
import './Topbar.css'
import { Link } from 'react-router-dom'
import filterIcon from '../../../assets/filter-icon.svg'
import addIcon from '../../../assets/add-icon.svg'


const Topbar = () => {
  return (
    <div className='dashbord_topbar'>
      <div className="dashbord_topbar_wrapper d-flex justify-content-between align-items-center">

        <div className="dashbord_topbar_title">
          <h2 className='text_color_36 fs-4 fw-medium'>
            Job Offers
          </h2>
        </div>

        <div className="dashbord_topbar_button d-flex gap-4">
          <Link to={"#"} className='filter_btn d-flex gap-2 text-decoration-none'>
            <img src={filterIcon} alt="icon" />
            <span className='text_color_cb'>
              Filter
            </span>
          </Link>

          <Link to={"#"} className='add_btn d-flex gap-2 text-decoration-none bg_color_fb'>
            <img src={addIcon} alt="icon" />
            <span className='text-white'>
              Add Job Offer
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar