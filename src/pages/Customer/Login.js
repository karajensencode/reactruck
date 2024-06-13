import { useState } from "react";

import LoginHeader from '../../components/layout/Header/LoginHeader';

import Input from '../../components/common/Input';
import FormExtra from "../../components/forms/login/FormExtra";
import FormAction from "../../components/forms/login/FormAction";
import { loginFields } from "../../components/forms/login/FormField";

const Login = ({ setEmail, handleSetLoggedIn }) => {
    const [ loginState, setLoginState ] = useState({ email: '', password: '' });

    const handleInputChange = (event) => {
        setLoginState({ ...loginState, [event.target.id]: event.target.value, });
        if (event.target.id === 'email') {
            setEmail(event.target.value);
        }
    }; //https://dashboard.chec.io/developer/logs/log_2LM5QGAnMrwZV1

    return (
        <>
            <LoginHeader heading="Login to your account" paragraph="Don't have an account yet? " linkName="Signup" linkUrl="/signup" />
            <form>
                {loginFields.map((field, index) => (
                    <Input
                        key={index}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        type={field.type}
                        id={field.id}
                        placeholder={field.placeholder}
                        value={loginState[field.id]}
                        onChange={handleInputChange}
                    />
                ))}
                <FormAction handleSubmit={handleSetLoggedIn} text="Login" />
                <FormExtra>
                    <a href="/password" className="font-medium text-purple-600 hover:text-purple-500">
                        Forgot your password?
                    </a>
                </FormExtra>
            </form>
        </>
    )
};

export default Login;

           /*const response = await commerce.customer.login({
                email: 'leslie.lawless@example.com', //loginState.email,
                base_url: 'https://yourwebsite.com/login/callback',
            });*/