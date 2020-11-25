import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actionTypes from '../../store/actions/actions';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import usersData from '../../data/users.json';

import './SignIn.css';

import logo from '../../assets/logo/logo.png'; 

const SignIn = (props) => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [errorDisplay, setErrorDisplay] = useState(false);

    const error = <p className="error">Email ili lozinka nije tačna.</p>;

    function inputChangeHandler(event, element) {
        if (element === "email") {
            let emailCopy = email;
            emailCopy = event.target.value;
            setEmail(emailCopy);
        } else {
            let passwordCopy = password;
            passwordCopy = event.target.value;
            setPassword(passwordCopy);
        }
    }

    function signInHandler (event) {
        const userInput = {
            email: email,
            password: password
        }

        let validation = false;

        usersData.forEach(userData => {
            if (userData.email === userInput.email) {
                if (userData.password === userInput.password) {
                    validation = true;
                }
            }
        });

        if (validation) {
            setErrorDisplay(false);
            props.setAuthentificationHandler(true);
            props.history.replace('/home');
        } else {
            setErrorDisplay(true);
            props.setAuthentificationHandler(false);
        }

        event.preventDefault();
    } 

    return(
        <div className="SignIn centerContent">
            <div className="box">
                <div className="logoHolder centerContent">
                    <img src={logo} alt="Logo"/>
                </div>
                <form className="centerContent" onSubmit={signInHandler}>
                    <h2>Prijavi se</h2>
                    <Input 
                        for="email" 
                        value={email}
                        onChangeFunction={inputChangeHandler}/>
                    <Input 
                        for="password" 
                        value={password}
                        onChangeFunction={inputChangeHandler}/>
                    {errorDisplay ? error : null}
                    <Button for="signInOption"/>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authorized: state.userReducer.authorized
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthentificationHandler: (value) => dispatch({
            type: actionTypes.SET_AUTHENTIFICATION,
            value: value
        }) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));