import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { profile, status, error } = useSelector((state) => state.profile);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>{error}</p>;
    }

    if (!profile) {
        return <p>No profile found</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {profile.name}</p>
            <p>DOB: {new Date(profile.dob).toLocaleDateString()}</p>
            <p>Place of Birth: {profile.placeOfBirth}</p>
            <p>Nationality: {profile.nationality}</p>
            <h3>Education</h3>
            <ul>
                {profile.education.map((edu, index) => (
                    <li key={index}>
                        {edu.degree} from {edu.institution} ({new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
