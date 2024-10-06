import React from 'react'
import './MatchCard.css'

const MatchCard = ({profile}) => (
    <div className="card m-1 p-2">
      <div className="d-flex align-items-start">
      {/* <img src={product.thumbnail} className="card-img-top" alt={product.description} /> */}
        <div className='d-flex flex-column flex-grow-1'>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title mb-0">{profile.name}</h5>
            <p className="card-text mb-0"><b>{profile.match}</b></p>
          </div>
          <p className="card-text"><i>{profile.description}</i></p>
        </div>
      </div>
    </div>
);

export default MatchCard;
