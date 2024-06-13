import { useState } from 'react';

import LoginHeader from '../../components/layout/Header/LoginHeader';
import Input from "../../components/common/Input";
import FormAction from '../../components/forms/login/FormAction';
import { signupFields } from "../../components/forms/login/FormField";

const CreateAccountOld = () => {
    const [signupState, setSignupState] = useState({ name: '', email: '', password: '', });

    const handleInputChange = (event) => {
        setSignupState({
        ...signupState,
        [event.target.name]: event.target.value,
        });
    };


    const handleSubmit = () => { 
    }

    return(
        <>
        <LoginHeader heading="Create an account" paragraph="Already have an account? " linkName="Login" linkUrl="/login" />
        <form>
            {signupFields.map((field, index) => (
            <Input
                key={index}
                labelText={field.labelText}
                labelFor={field.labelFor}
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                value={signupState[field.id]}
                onChange={handleInputChange}
            />
            ))}
            <FormAction handleSubmit={handleSubmit} text="Signup" />
        </form>
        </>
    )
}

export default CreateAccountOld;