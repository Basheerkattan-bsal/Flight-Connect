import React, { useEffect, useState } from "react";
import { getDeals } from "../../api/deals.api.js";
import classes from './Deals.module.css'

const DealDisplay = props => {
  const [topDestinations, setTopDestinations] = useState(false)
  const [deals, setDeals] = useState(false)
  const [dealInfo, setDealInfo] = useState(false)

  const dateOfDeparture = document.getElementById("departureDate");
  const dateOfReturn = document.getElementById("returnDate");

  useEffect(() => {
    if (!localStorage.getItem("deals")) {
      const getData = async () => {
        const deals = await getDeals({
          geoInfo: props.geoInfo,
          dateOfDeparture: dateOfDeparture.value,
          dateOfReturn: dateOfReturn.value,
        });
        console.log('deals', deals)
        if (deals.data[0]) {
          console.log('if deals', deals.data)
          localStorage.setItem('deals', JSON.stringify(deals.data))
          setTopDestinations(deals.data[0])
          setDeals(deals.data[1])
          setDealInfo(deals.data[2])
        } 
      };
      getData();
    } else if (localStorage.getItem("deals") && !deals) {
      const localDeals = JSON.parse(localStorage.getItem("deals"))
      setTopDestinations(localDeals[0])
      setDeals(localDeals[1])
      setDealInfo(localDeals[2])
    }
  }, []);

  const TopDestinations = () => {
    return (
      <div>
        <p>Top 15 Destinations from {props.geoInfo[0].countryName}</p>
        {topDestinations.Destinations.map((dest, i) => {
          // AirportName: "Lisboa"
          // CityName: "Lisbon"
          // CountryCode: "PT"
          // CountryName: "Portugal"
          // DestinationLocation: "LIS"
          // RegionName: "Europe"
          // Type: "Airport"
          return (
            <div key={dest.Destination.DestinationLocation}>
              <p>
                Rank {dest.Rank}:{" "}
                {dest.Destination.CityName ||
                  dest.Destination.MetropolitanAreaName}{" "}
                | {dest.Destination.CountryName}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const TopDeals = () => {
    return (
      <div>
        <p>Top Deals from {props.geoInfo[0].cityName}</p>
        {deals.FareInfo.slice(0, 20).map((deal, i) => {
          return (
            <div key={i}>
              <p>
                Price: {deal.LowestFare.Fare} {deal.CurrencyCode}
              </p>
            </div>
          );
        })}
      </div>
    );
  };


  return (
    <div className= {classes.dealsDisplay}>
      {topDestinations ? <TopDestinations /> : null}
      {deals ? <TopDeals /> : null}
    </div>
  );
};

export default DealDisplay;
