import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function SignUpForm() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/add',
            data
        });
    };

    return (
        <div style={{border: "1px solid black"}}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Username" name="username" ref={register} />
                <input type="email" placeholder="Email" name="email" ref={register} />
                <input type="text" placeholder="Password" name="password" ref={register} />

                <input type="submit" />
            </form>
        </div>
    );
}

export default SignUpForm;
