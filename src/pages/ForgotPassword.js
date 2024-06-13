import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post('https://api.chec.io/v1/customers/forgot-password', {
    //         email
    //         });

    //         if (response.data.forgot_password_url) {
    //         // Password reset link was sent successfully
    //         alert('A password reset link has been sent to your email address.');
    //         } else {
    //         // Password reset link was not sent
    //         alert('There was an error sending the password reset link. Please try again later.');
    //         }
    //     } catch (error) {
    //         // Handle API errors
    //         if (error.response.data.errors) {
    //         error.response.data.errors.forEach((error) => {
    //             alert(error.message);
    //         });
    //         } else {
    //         alert('There was an error sending the password reset link. Please try again later.');
    //         }
    //     }
    //     };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Send Password Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;