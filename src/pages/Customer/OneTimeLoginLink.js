import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const OneTimeLoginLink = ({ email }) => {
    const navigate = useNavigate();
    const [loginLinkData, setLoginLinkData ] = useState(null);

    useEffect(() => { 
        console.log(loginLinkData);
        handleLoginEndpoint();
    });
    // Send a POST request to the /api/login endpoint
    const handleLoginEndpoint = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('https://api.chec.io/v1/customers/forgot-password', {
            email
        });

        console.log(response.data);
        } catch (error) {
        console.error(error.response.data);
        }
    };


    const handleLoginLinkClick = async (email) => {
        try {
            const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
            });

            if (!response.ok) {
            throw new Error('Failed to log in');
            }

            const data = await response.json();
            setLoginLinkData(data);
            // Handle success
            // Navigate to the login link page
            navigate('/login-link');
            // Redirect to the login link
            window.location.href = data.loginLink;

        } catch (error) {
            // Handle errors
        }
        };

    const handleLinkClick = () => {
        handleLoginLinkClick(email);
    };

    return (
        <a href="/#" onClick={handleLinkClick}>
        One-time login link
        </a>
    );
};

export default OneTimeLoginLink;