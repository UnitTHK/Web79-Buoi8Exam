import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user.username}</p>
        </div>
    );
};

export default Dashboard;
