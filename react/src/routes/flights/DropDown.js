import React from 'react';
import classes from './DropDown.module.css';
const DropDown = props => {
  const passInfo = e => {
    e.preventDefault();
    props.fillInput(e);
    
  };
  return (
    <div>
      <div>
        {props.dataSource
          ? props.dataSource.data.map(city => {
              return (
                <button 
                  value={city}
                  onClick={passInfo}
                  className={classes.list}
                  name={city.iataCode}
                  key= {city.name}
                >
                  {city.name}
                </button>
              );
            })
          : 'hi'}
      </div>
    </div>
  );
};

export default DropDown;
