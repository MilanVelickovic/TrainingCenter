import React from "react";
import { withRouter, useParams } from "react-router-dom";

import datesData from "../../data/dates.json";

import "./Reserve.css";

const Reserve = (props) => {
  const { date } = useParams();

  function formatDate(date) {
    let formatedDate = date.replaceAll("-", "/");
    return formatedDate;
  }

  function timeDetails(time) {
    let formatTime = time.replaceAll(" ","");
    props.history.push(`${date}/${formatTime}`);
  }

  function isAvailable(date, time, participants, reserved) {
    let currentFullDate = new Date();
    // dd/mm/yyyy
    let currentDate = currentFullDate.getDate() + "/" + (currentFullDate.getMonth() + 1) + "/" + currentFullDate.getFullYear();
    // hh/mm
    let currentTime = currentFullDate.getHours() + ":" + currentFullDate.getMinutes();

    if (((formatDate(date) >= currentDate && time.slice(0, 5) >= currentTime) || formatDate(date) > currentDate) && participants > reserved) {
      return true;
    } else {
      return false;
    }
  }

  function content() {
    let content = <p className="errorMessage">Nema zakazanih treninga za ovaj dan.</p>;

    datesData.forEach((dateData) => {
      if (dateData.date === formatDate(date)) {
        content = <div className="list">
                    {dateData.terms.map(term => {
                      let classes = ["rightSide"];
                      if (isAvailable(date, term.time, term.participants, term.reserved)) {
                        classes.push("available");
                      }

                      return <div className="item" onClick={() => timeDetails(term.time)} key={term.time}>
                              <div className="leftSide">
                                <p>{term.sport}</p>
                                <p>({term.participants}/{term.reserved})</p>
                              </div>
                              <div className={classes.join(' ')}>
                                <p>{term.time}</p>
                              </div>
                             </div>;
                    })}
                  </div>;
      }
    });

    return content;
  }

  function goBack() {
    props.history.replace('/home');
  }

  return (
    <div className="Reserve">
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        className="close-icon"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => goBack()}
      >
        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
      </svg>
      {content()}
    </div>
  );
};

export default withRouter(Reserve);