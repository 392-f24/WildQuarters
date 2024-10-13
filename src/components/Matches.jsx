import MatchCard from './MatchCard'
import { useDbData } from '../utilities/firebase';

<<<<<<< HEAD
// FIXME: hardcoded for now, jiahui will write database fetch data feature
const roommates = {
    "patrickJiang": {
        fullName: "Patrick J.",
        phone: "123456789",
        major: "cs",
        desc: "student",
        housing: 0,
        gender: 1,
        roommateGender: [1, 2],
        size: [0, 1],
        wakeUpTime: 0,
        bedTime: 0,
        guests: 0,
        clean: 0,
        noise: 2,
        pets: 0,
        alcohol: 0,
        cigs: 0,
        weed: 1,
        photo: "https://bysophialee.com/wp-content/uploads/college-essentials-for-guys-4.jpg"
    },
    "patrickChen": {
        fullName: "Test",
        phone: "123456789",
        major: "cs",
        desc: "student",
        housing: 0,
        gender: 1,
        roommateGender: [1, 2],
        size: [0, 1],
        wakeUpTime: 0,
        bedTime: 0,
        guests: 0,
        clean: 0,
        noise: 2,
        pets: 0,
        alcohol: 1,
        cigs: 0,
        weed: 1,
        photo: "https://bysophialee.com/wp-content/uploads/college-essentials-for-guys-4.jpg"
    }
};

const checkStrictFilters = (self, other) => {
    if (self.housing !== other.housing) return false;
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

// hardcoded for now, once user auth is implemented, get this automatically
const self = roommates["patrickJiang"];
=======
const Matches = () => {
    const [rm, error] = useDbData('/roommateInfo');

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }
>>>>>>> main

    if (!rm) {
        return <div>Loading...</div>;
    }

    return (
        <div>
<<<<<<< HEAD
        { Object.entries(roommates).map(([id, profile]) => {
            const matchScore = calculateMatchScore(self, profile);
            if (profile.fullName !== self.fullName && matchScore > 0) {
                return <MatchCard key={id} profile={profile} matchScore={matchScore} />;
            }
        }) }
=======
            <h1 className='text-center'>Potential Roommates</h1>
            <p className='text-center'>Sorted by <i>Best Match</i></p>
            <div>
                {Object.entries(rm).map(([id, profile]) => (
                    <MatchCard key={id} profile={profile} />
                ))}
            </div>
>>>>>>> main
        </div>
    );
};

export default Matches;
<<<<<<< HEAD
=======


>>>>>>> main
