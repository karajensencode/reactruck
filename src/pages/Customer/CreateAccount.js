import React, { useState } from 'react';

const CreateAccount = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await fetch('/api/create-customer', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            console.log('Customer created successfully');
        } else {
            console.error('Error creating customer');
        }
        } catch (error) {
        console.error('Error creating customer:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Create Customer</button>
        </form>
    );
};

export default CreateAccount;