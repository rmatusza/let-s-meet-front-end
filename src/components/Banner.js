import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import { Grid, Typography } from '@material-ui/core';
import { palette } from '@material-ui/system';
import Logo from '../images/logo.png'

const useStyles = makeStyles((theme) => ({
  myColor: {
    color: theme.palette.primary.main
  }
}))


const Banner = (props) => {
  const classes = useStyles();
  const userName = localStorage.key(0)
  return (
    <>
      <div className="banner-component">

        {/* left side of banner */}

        <div className="left-side">

          <div className="logo-container">
            <img src={Logo} className="logo"></img>
          </div>

          <div className="site-name-container">
            <h1 className="site-name">Let's Meet!</h1>
          </div>

        </div>

        {/* right side of banner */}

        <div className="right-side">
          <div className="welcome-user">
            Welcome Back {userName}!
          </div>

          <div className="user-icon">
            <AccountCircleIcon />
          </div>

        </div>

      </div>

      {/* sub banner -- maybe can make into its own component later */}

      <div className="sub-banner">

        <div className="catch-phrase">
          <h1 className="catch-phrase-text">Find Your Next Event</h1>
        </div>

        <div className="events-nearby">
          <h4 className="events-nearby-text">30 Events in Your Area</h4>
        </div>

      </div>

    </>
  )
}

// bgcolor="primary.main" color="primary.contrastText" p={2}
export default Banner;
