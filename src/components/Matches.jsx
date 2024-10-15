import MatchCard from './MatchCard'
import './Matches.css'
import { useDbData } from '../utilities/firebase';

const checkStrictFilters = (self, other) => {
    // if (self.housing !== other.housing) return false;
    if (!other.roommateGender.includes(self.gender)) return false;
    if (!self.roommateGender.includes(other.gender)) return false;
    if (!self.size.some(size => other.size.includes(size))) return false;

    return true;
};

const calculateMatchScore = (self, other) => {
    let score = 0;

    if (!checkStrictFilters(self, other)) {
        return 0; // No match if strict filters fail
    }

    const binaryFields = [
        { field: "wakeUpTime", exact: true },
        { field: "bedTime", exact: true },
        { field: "guests", exact: true },
        { field: "clean", exact: true },
        { field: "pets", exact: true },
        { field: "alcohol", exact: true },
        { field: "cigs", exact: true },
        { field: "weed", exact: true },
    ];

    // Loop through binary fields
    binaryFields.forEach(({ field }) => {
        if (self[field] === other[field]) {
            score += 1;
        }
    });

    // Handle three option field
    if (self.noise === other.noise) {
        score += 1; 
    } else if (Math.abs(self.noise - other.noise) === 1) {
        score += 0.5; 
    }

    return score;
};



const Matches = () => {
    const [roommates, error] = useDbData('/roommateInfo');

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    if (!roommates) {
        return <div>Loading...</div>;
    }

    // hardcoded for now, once user auth is implemented, get this automatically
    const self = roommates["Anya2"];

    return (
        <div>
            <h1 className='text-center'>Potential Roommates</h1>
            <h2 className='text-center fs-6'>Sorted by <i>Best Match</i></h2>
            { Object.entries(roommates).map(([id, profile]) => {
                const matchScore = calculateMatchScore(self, profile);
                if (profile.fullName !== self.fullName && matchScore > 0) {
                    return <MatchCard key={id} profile={profile} matchScore={matchScore} self={self} />;
                }
            }) }
        </div>
    );
};

export default Matches;
