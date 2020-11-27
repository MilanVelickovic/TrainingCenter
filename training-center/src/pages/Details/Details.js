import React from 'react';
import { useParams } from 'react-router-dom';

import datesData from "../../data/dates.json";

import Button from '../../components/UI/Button/Button';

import './Details.css';

const Details = (props) => {

  const {date} = useParams();
  const {time} = useParams();

  function formatDate(date) {
    let formatedDate = date.replaceAll("-", "/");
    return formatedDate;
  }

  function formatTime(time) {
    let formatedTime = time.replaceAll("-"," - ");
    return formatedTime;
  }

  function showOption(date, time, participants, reserved) {
    let currentFullDate = new Date();
    // dd/mm/yyyy
    let currentDate = currentFullDate.getDate() + "/" + (currentFullDate.getMonth() + 1) + "/" + currentFullDate.getFullYear();
    // hh/mm
    let currentTime = currentFullDate.getHours() + ":" + currentFullDate.getMinutes();

    if (((formatDate(date) >= currentDate && time.slice(0, 5) >= currentTime) || formatDate(date) > currentDate) && participants > reserved) {
      return <Button for="reserveOption">Zakaži</Button>;
    } else {
      return null;
    }
  }

  function content() {
    let content = <p>Došlo je do greške!<br/> Podaci o ovom terminu nisu trenutno dostupni.</p>;

    {datesData.forEach(dateData => {
      if (dateData.date === formatDate(date)) {
        dateData.terms.forEach(term => {
          if (term.time === formatTime(time)) {
            content = <>
                        <h2>{term.sport}</h2>
                        <p>{formatDate(date)} {formatTime(time).slice(0, 5)}</p>
                        <p>{term.participants} / {term.reserved}</p>
                        <div className="summary">
                          <p>{term.exercises}</p>
                          <p><b>Instruktor:</b> {term.instructor}</p>
                        </div>
                        <div className="buttons">
                          {showOption(date, time, term.participants, term.reserved)}
                          <Button for="backOption" onClickFunction={goBack}>Nazad</Button>
                        </div>
                      </>;
          }
        });
      }
    })}

    return content;
  }

  function goBack() {
    props.history.replace(`/reserve/${date}`);
  }

  return (
    <div className="Details">
      <div className="detailsBox">
        {content()}
      </div>
    </div>
  );
}

export default Details;