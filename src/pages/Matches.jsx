import MatchCard from '../components/MatchCard';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import '../styles/Matches.css'
import { useAuthState } from '../utilities/firebase';


const checkStrictFilters = (self, other) => {
    // if (self.housing !== other.housing) return false;
    if (!other.roommateGender.includes("Any") && !other.roommateGender.includes(self.gender)) return false;
    if (!self.roommateGender.includes("Any") && !self.roommateGender.includes(other.gender)) return false;
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
        { field: "noise", extact: true }
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
    } else if (self.noise === "Occasional" || other.noise === "Occasional") {
        score += 0.5; 
    }

    return score;
};



const Matches = ({roommates}) => {    
    const [user, loading] = useAuthState();
    const [filterCategory, setFilterCategory] = useState("");
    const [sortMethod, setSortMethod] = useState("best");

    if (loading) {
        return <div>Loading...</div>
    }

    // const self = roommates[user.displayName];
    const self = roommates["Levy Deckard"];
    console.log(user);
    if (!self) {
        console.log("User not found in roommatesInfo...");
        return <div>User not found...</div>
    }

    const filterMatches = (self, other) => {
        if (!filterCategory) { return true; }
        return self[filterCategory] === other[filterCategory];
    };

    const sortedMatches = Object.entries(roommates)
    .map(([id, profile]) => ({ id, profile, matchScore: calculateMatchScore(self, profile) }))
    .filter(({ profile, matchScore }) => self.fullName !== profile.fullName && matchScore > 0 && filterMatches(self, profile))
    .sort((a, b) => {
        if (sortMethod === "best") { return b.matchScore - a.matchScore }
        else if (sortMethod === "worst") { return a.matchScore - b.matchScore };
    });

    return (
        <div>
            <h1 className='text-center'>Potential Roommates</h1>

            {/* Counter for number of results */}
            <p className='text-center'><i>Showing {sortedMatches.length} {sortedMatches.length === 1 ? 'match' : 'matches'}</i></p>

            {/* Filter by */}
            <div className="dropdown-container text-center">
                <label htmlFor="filter-dropdown">Filter by</label>
                <select 
                    id="filter-dropdown" 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">Show All</option>
                    <option value="wakeUpTime">Wake Up Time</option>
                    <option value="bedTime">Bed Time</option>
                    <option value="guests">Guests</option>
                    <option value="clean">Cleanliness</option>
                    <option value="noise">Noise</option>
                    <option value="pets">Pets</option>
                    <option value="alcohol">Alcohol</option>
                    <option value="cigs">Cigarettes</option>
                    <option value="weed">Weed</option>
                </select>
            </div>

            {/* Sort by */}
            <div className="dropdown-container text-center">
                <label htmlFor="sort-dropdown">Sort by</label>
                <select 
                    id="sort-dropdown" 
                    value={sortMethod} 
                    onChange={(e) => setSortMethod(e.target.value)}
                >
                    <option value="best">Best Match</option>
                    <option value="worst">Worst Match</option>
                </select>
            </div>

            {/* Show sorted list of matches */}
            { sortedMatches.map(({ id, profile, matchScore }) => (
                <MatchCard key={id} profile={profile} matchScore={matchScore} self={self} />
            )) }

            <Navbar/>
        </div>
    );
};

export default Matches;
