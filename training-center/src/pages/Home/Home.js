import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actionTypes from '../../store/actions/actions';

import Calendar from 'react-calendar';
import Button from '../../components/UI/Button/Button';

import './Home.css';
import 'react-calendar/dist/Calendar.css';

import logo from '../../assets/logo/logo.jpg';

const Home = (props) => {
    const [date, setDate] = useState(new Date());

    function signOutHandler() {
        props.setAuthentificationHandler(false);
        props.history.replace('/signin');
    }

    function redirectUser() {
        props.history.replace('/signin');
    }

    let home = <div className="Home message">
                    <h1>Please <span onClick={() => redirectUser()}>sign in</span> to access this page!</h1>
                </div>;

    if (props.authorized) {
        home = <div className="Home">
                    <div className="navigation">
                        <img src={logo} alt="Logo"/>
                        <Button for="signOutOption" onClickFunction={signOutHandler}/>
                    </div>
                    <div className="calendarBox">
                        <Calendar
                            onChange={setDate}
                            value={date}/>
                    </div>
                </div>;
    } 

    return home;
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));