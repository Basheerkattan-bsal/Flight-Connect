import React, { Fragment, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FlightsContext } from "../../context/FlightsContext";
import airPlane from "../../media/Airplane-logo.png";
import classes from "./Offers.module.css";
import ActivityDisplay from "./activityDisplay.js";
import { useNavigate } from "react-router";


const Offers = (props) => {
  const [state, dispatch] = useContext(FlightsContext);
  const { offers } = state;
  
  const navigate = useNavigate();
  const inputFrom = document.getElementById("from");
  const inputTo = document.getElementById("to");

  useEffect(() => {
    if (!offers) {
      navigate("/");
    }
  }, []);

  const bookFlight = (e) => {
    e.preventDefault()
   
    if(!state.user){
     dispatch({
      type: 'setLogin',
      login: true
     })
    }else{

      fetch('http://localhost:1338/flights', {method: 'POST', headers: {token: localStorage.getItem('token'), 'Content-Type': 'application/json'}, body: JSON.stringify({flight: JSON.stringify(offers[e.target.value]) , userId: state.user._id})})
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if(result.success){
          console.log(result);
          dispatch({
            type: 'setUser',
            user: result.data
          })
        }
      })
    }
  }

  if (offers.length > 0) {
    return (
      <div className={classes.offers}>
        <ActivityDisplay />

        <div className={classes.offersHeader}>
          <h2>
            {inputFrom.value} | {inputTo.value}
          </h2>
        </div>
        {offers.map((offer, iOffer) => {
          return (
            <div key={iOffer} className={classes.mainBox}>
              <div className={classes.singleOffer}>
                {offer.itineraries.map((iti, itiIndex) => {
                  const segments = iti.segments;
                  const duration = iti.duration.slice(0, -1);

                  const toggleSegments = e => {
                    e.preventDefault();
                    e.target.parentElement.nextElementSibling.classList.toggle(
                      classes.hidden
                    );
                    e.target.parentElement.nextElementSibling.classList.toggle(
                      classes.segments
                    );
                    console.log(
                      e.target.parentElement.nextElementSibling.classList
                    );
                  };

                  return (
                    <div key={itiIndex}>
                      <div className={classes.itineraries}>
                        <div>
                          <img
                            src={`https://www.skyscanner.net/images/airlines/${segments[0].carrierCode}.png`}
                            alt="airline logo"
                          />
                        </div>

                        <div>
                          <p>{segments[0].departure.at.slice(11, 16)}</p>
                          <p>{segments[0].departure.iataCode}</p>
                        </div>

                        <div className={classes.duration}>
                          <p>
                            {duration.slice(2, 4)}h{" "}
                            {duration.slice(5, 7)
                              ? `${duration.slice(5, 7)}m`
                              : ""}
                          </p>

                          <div className={classes.timeBox}>
                            <div className={classes.timeLine}>
                              {segments.map((stop, index) => {
                                return (
                                  <Fragment key={index}>
                                    {index > 0 ? (
                                      <div className={classes.redDot}></div>
                                    ) : null}
                                  </Fragment>
                                );
                              })}
                            </div>

                            <div className={classes.plane}>
                              <img src={airPlane} alt="plane" />
                            </div>
                          </div>

                          {segments.length === 1 ? (
                            <p style={{ color: "green" }}>Non-stop</p>
                          ) : segments.length === 2 ? (
                            <p style={{ color: "blue" }}>
                              1 stop <span>{segments[0].arrival.iataCode}</span>
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>
                              {segments.length - 1} stops
                              {segments.map((stop, stopIndex) => {
                                if (stopIndex !== 0) {
                                  return (
                                    <span key={stopIndex}>
                                      <span> {stop.departure.iataCode} </span>
                                    </span>
                                  );
                                } else {
                                  return <span key={stopIndex}></span>;
                                }
                              })}
                            </p>
                          )}
                        </div>

                        <div>
                          <p>
                            {segments[segments.length - 1].arrival.at.slice(
                              11,
                              16
                            )}
                          </p>
                          <p>
                            {segments[segments.length - 1].arrival.iataCode}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          onClick={toggleSegments}
                          className={classes.toggleButton}
                          icon={faAngleDown}
                        />
                      </div>
                      <div className={classes.hidden}>
                        {segments.map((segment, i) => {
                          return (
                            <div key={i} className={classes.singleSegment}>
                              <div>Flight {i + 1}</div>
                              <div>
                                <p>{segment.departure.at.slice(11, 16)}</p>
                                <p>{segment.departure.iataCode}</p>
                              </div>
                              |
                              <div>
                                <p>{segment.arrival.at.slice(11, 16)}</p>
                                <p>{segment.arrival.iataCode}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={classes.price} key={offer.id}>
                <h2> {offer.price.total}€</h2>
              <button value={offer.id} onClick={ bookFlight }>Select</button> 
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (offers.length === 0) {
    return (
      <div>
        <h2>No results for this route</h2>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Offers;
