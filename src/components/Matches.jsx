import React from 'react'
import MatchCard from './MatchCard'

const Roommate_info = [
    {name: "Patrick R.", match: "99%", description: "Double Room, Early Rasier, North"},
    {name: "Ellie L.", match: "92%", description: "Triple Room, Early Rasier, North"},
    {name: "Anya B.", match: "87%", description: "Double Room, Night Owl, South"}
]

const roommateInfo = {
    "patrick": {
        "name": "Patrick R.",
        "match": "99%",
        "description": "Double Room, Early Riser, North"
    },
    "ellie": {
        "name": "Ellie L.",
        "match": "92%",
        "description": "Triple Room, Early Riser, North"
    },
    "anya": {
        "name": "Anya B.",
        "match": "87%",
        "description": "Double Room, Night Owl, South"
    }
}

const Matches = () => (
    <div>
        { Object.entries(roommateInfo).map(([id, profile]) => <MatchCard key={id} profile={profile} />) }
        {/* <MatchCard profile={roommateInfo.patrick} />
        <MatchCard profile={roommateInfo.ellie} /> */}
    </div>
);

export default Matches;

