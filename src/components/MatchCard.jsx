import React from 'react'
import './MatchCard.css'

const MatchCard = ({profile}) => (
    <div className="card m-1 p-2">
      {/* <img src={product.thumbnail} className="card-img-top" alt={product.description} /> */}
      <div className="card-body">
        <h5 className="card-title">{profile.name}</h5>
        <p className="card-text">{profile.match}</p>
        <p className="card-text">{profile.description}</p>
      </div>
    </div>
);

export default MatchCard;
