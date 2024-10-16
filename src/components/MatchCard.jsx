import React from 'react'
import '../styles/MatchCard.css'

const MatchCard = ({profile, matchScore}) => (
    <div className="card m-1 p-2">
      <div className="d-flex align-items-start">
        <img src={profile.photo} className="img-fluid me-3" alt={profile.desc} style={{width: "20vw", height: "20vw", objectFit: "cover"}}/>
        <div className='d-flex flex-column flex-grow-1'>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title mb-0">{profile.fullName}</h5>
            <p className="card-text mb-0"><b>{matchScore}/9</b></p>
          </div>
          <p className="card-text"><i>{profile.desc}</i></p>
        </div>
      </div>
    </div>
);

export default MatchCard;
