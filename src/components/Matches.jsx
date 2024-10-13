import React from 'react'
import MatchCard from './MatchCard'
import { useDbData } from '../utilities/firebase';

const Matches = () => {
    const [rm, error] = useDbData('/roommateInfo');

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    if (!rm) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className='text-center'>Potential Roommates</h1>
            <p className='text-center'>Sorted by <i>Best Match</i></p>
            <div>
                {Object.entries(rm).map(([id, profile]) => (
                    <MatchCard key={id} profile={profile} />
                ))}
            </div>
        </div>
    );
};

export default Matches;


