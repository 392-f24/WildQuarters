import { useState, React } from 'react'

const pronounMapping = {
  'Female' : 'she/her',
  'Male' : 'he/him',
  'Non-binary' : 'they/them',
  'Other' : 'pronouns not specified'
};



const MatchCard = ({profile, matchScore, self}) => {
  const [isHidden, setHidden] = useState(true);

  const toggleHidden = () => {
    setHidden(!isHidden)
  };

  return (
    <div className="card m-1 p-2">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-start">
          <img src={profile.photo} className="img-fluid me-3" alt={profile.desc} style={{width: "20vw", height: "20vw", objectFit: "cover"}}/>
          <div className='d-flex flex-column flex-grow-1'>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex">
                <h5 className="card-title mb-0 me-2 fs-3">{profile.fullName}</h5>
                <p className="mb-0"><i>{pronounMapping[profile.gender]}</i></p>
              </div>
              <p className="card-text mb-0"><b>{matchScore}/9</b></p>
            </div>
            <p className="card-text mb-0"><b>Major: </b>{profile.major}</p>
            <p className="card-text"><i>{profile.desc}</i></p>
          </div>
        </div>
        <div className="dropdown m-0">
          <button className="btn btn-light btn-sm dropdown-toggle" type="button" onClick={toggleHidden}></button>
          <div id="matches-dropdown" className={isHidden ? 'hidden' : null}>
            <ul>
              {Object.entries(profile)
                  .filter(([field, _]) => !(field === "desc" | field === "fullName" | field === "gender" | field === "major" | field === "number" | field === "roommateGender" | field === "profilePhoto"))
                  .map(([field, answer]) => <li>{field} : {answer}</li>)}
            </ul>
            <p><b>Contact {profile.fullName}: {profile.number}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
