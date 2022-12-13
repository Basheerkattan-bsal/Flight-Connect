import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classes from './Nav.module.css';
import { FlightsContext } from '../context/FlightsContext';

const Nav = (props) => {
  const [state] = useContext(FlightsContext);
  const {scrollToggle} = props

  return (
    <div className={`${classes.nav} ${scrollToggle ? classes.scrollNav : ''}`}>
      <nav>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${classes.active}` : `${classes.anchor} `
          } 
          to="/"
        >
          Deals
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${classes.active}` : `${classes.anchor}`
          }
          to="about"
        >
          About
        </NavLink>
        {state.user && state.user !== undefined ? (
          <NavLink id='change'
            className={({ isActive }) =>
              isActive ? `${classes.active}` : `${classes.anchor}`
            }
            to="bookmarks"
          >
            Bookmarks
          </NavLink>
        ) : null}
        {state.offers && state.offers !== undefined ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.active}` : `${classes.anchor}`
            }
            to="flights"
          >
            Flights
          </NavLink>
        ) : null}
      </nav>

      <Outlet className={classes.outlet} />
    </div>
  );
};

export default Nav;
