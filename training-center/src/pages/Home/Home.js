import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionTypes from "../../store/actions/actions";
import * as pages from '../pages';

import Calendar from "react-calendar";

import "./Home.css";
import "react-calendar/dist/Calendar.css";

import logo from "../../assets/logo/logo.png";

const Home = (props) => {
  const [date, setDate] = useState(new Date());

  function signOutHandler() {
    props.setAuthentificationHandler(false);
    props.history.replace("/signin");
  }

  function formatDate(date) {
    let formatedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    return formatedDate;
  }

  function redirectUser(page, date) {
    switch(page) {
        case pages.SIGN_IN:
            props.history.replace("/signin");
            break;
        case pages.RESERVE:
            props.history.push(`reserve/${formatDate(date)}`);
            break;
        default:
            break;
    }
  }

  function onChange(date) {
    setDate(date);
    redirectUser(pages.RESERVE, date);
  }

  return(
    <div className="Home">
      <div className="navigation">
        <img src={logo} alt="Logo" />
        <span onClick={signOutHandler}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"></path></svg>
        </span>
      </div>
      <div className="calendarBox">
        <h2>Zakaži svoj trening</h2>
        <Calendar onChange={onChange} value={date} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthentificationHandler: (value) =>
      dispatch({
        type: actionTypes.SET_AUTHENTIFICATION,
        value: value,
      }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Home));
