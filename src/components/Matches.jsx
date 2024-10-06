import React from 'react'
import MatchCard from './MatchCard'

const roommateInfo = {
    "patrick": {
        "name": "Patrick R.",
        "match": "99%",
        "description": "Double Room, Early Riser, North",
        "img": "https://bysophialee.com/wp-content/uploads/college-essentials-for-guys-4.jpg"
    },
    "ellie": {
        "name": "Ellie L.",
        "match": "92%",
        "description": "Triple Room, Early Riser, North",
        "img": "https://www.shutterstock.com/image-photo/young-beautiful-long-haired-college-600nw-2332995801.jpg"
    },
    "anya": {
        "name": "Anya B.",
        "match": "87%",
        "description": "Double Room, Night Owl, South",
        "img": "https://jillonthehill.com/wp-content/uploads/2020/08/IMG_0962-scaled.jpg"
    }
}

const Matches = () => (
    <div>   
        <h1 className='text-center'>Potential Roommates</h1>
        <p className='text-center'>Sorted by <i>Best Match</i></p>
        <div>
        { Object.entries(roommateInfo).map(([id, profile]) => <MatchCard key={id} profile={profile} />) }
        </div>
    </div>
);

export default Matches;

