import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from './Banner'
import SubBanner from './SubBanner';
import { makeStyles } from "@material-ui/core/styles";
import { TiLocationOutline } from "react-icons/ti";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { CardActionArea, Grid, Paper } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { BiDownArrow  } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { CheckBox } from '@material-ui/icons';



const SpecificGroup = () => {

  const [group, setGroup] = useState({})
  const [isActive, setisActive] = useState(<BiDownArrow />)
  const [divState, setdivState] = useState('expandable-content--inactive')
  // const [isMember, setisMember] = useState('')
  const [checked, setChecked] = useState('Loading...')

  const useStyles = makeStyles((theme) => ({
    grid: {
      width: '100%',
      margin: '0px'
    },

    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: theme.palette.secondary.light,
      background: theme.palette.success.light,
      color: theme.palette.secondary.contrastText,
      height: '75px'
    },

    typography: {
      fontSize: theme.typography.fontSize
    }
  }));

  // let member;
  const classes = useStyles()
  const {id} = useParams()
  useEffect(() => {

    const fetchGroups = async () => {
      const res = await fetch(`http://localhost:8080/api/groups/${id}`)

      if(res.ok) {
        // console.log('hello')
        const data = await res.json()
        // console.log(data)
        await setGroup(data)
        // console.log(data)

      } else {
        console.error('someting went wrong')
      }
    }

    const fetchMembershipState = async () => {
      const memberKey = localStorage.key(0)
      const member_id = localStorage.getItem(memberKey)
      console.log('MEMBER ID:', member_id)
      const res = await fetch(`http://localhost:8080/api/groups/${id}/${member_id}`)

      if(res.ok) {
        const membershipStatus = await res.json()
        console.log('MEMBERSHIP STATUS:', membershipStatus)
        membershipStatus.content ? await setChecked(true) : await setChecked(false)

      } else {
        console.error('something went wrong')
      }
    }


    fetchGroups()
    fetchMembershipState()

  },[])
  console.log(checked)

  const handleClick = async () => {
    // console.log(isActive.type.name === "BiDownArrow")
    await isActive.type.name === "BiUpArrow" ? setisActive(<BiDownArrow />) : setisActive(<BiUpArrow />)
    // status =
    await divState === "expandable-content--inactive" ? setdivState("expandable-content--active") : setdivState("expandable-content--inactive")
    // console.log(isActive)
    // console.log(divState)
  }

  const joinGroup = async () => {
    const memberKey = localStorage.key(0)
    const member_id = localStorage.getItem(memberKey)
    // console.log(member_id)
    const body = {member_id}
      if(checked === false){
        await setChecked(true)
        const res = await fetch(`http://localhost:8080/api/groups/${id}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      const response = await res.json()
    } else {
      await setChecked(false)
      const res = await fetch(`http://localhost:8080/api/groups/${id}/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    }
    // console.log(response)
  }




  // console.log(group)
  // Object.keys(group).length ? console.log('yes') : console.log('no')

  return(

    <>
      <div className="banner-container">
        <SubBanner />
      </div>

      <div className="group-info-parent-container">

        <div className="group-info-container-left">

          <div className="group-title">
            <h1>{Object.keys(group).length ? group.groupData.name : 'Loading...'}</h1>
          </div>

          <div className="about-us-header">
            <h2>What We're About</h2>
          </div>

          <div className="description">
          {Object.keys(group).length ? group.groupData.description : 'Loading...'}
          </div>

        </div>

        <div className="group-info-container-right">
          <h3><TiLocationOutline size={30}/> <span>{Object.keys(group).length ? `${group.groupData.city}, TX`: 'Loading...'}</span></h3>

          <div className="number-of-members">
            <BsFillPeopleFill size={25}/>
            TODO: Find # of members from DB
          </div>
            <br></br>
          <div className="organizer">
            <BsFillPersonFill size={30} />
            TODO: Find the organizer's name from DB
          </div>
            <br></br>
          <div className="join-group">
            {/* {checked} */}
            <Checkbox className="join-group-checkbox" onClick={joinGroup} checked={checked}/>
            <div className="count-me-in">
              <h3>Join Group!</h3>
            </div>
          </div>

        </div>

      </div>

      <h1 className="upcoming-events">Upcoming Events</h1>

      <div className="events-container">

        {Object.keys(group).length ? group.eventData.map((event, idx) => {
          return (
            <Grid item xs={5} md={10} key={idx}>
               <div>
                  <h3>{event.date_start}</h3>
                </div>
              <CardActionArea >
                <Card className={classes.paper}>
                  <div className="event-card" key={idx} onClick={handleClick} >
                      <CardContent>
                        <div className="event-name-with-button">
                          <span className="event-name" >
                            {event.name}
                          </span>
                          <span className="expand-arrow">
                            {isActive}
                          </span>

                        </div>

                      </CardContent>
                  </div>
                </Card>
              </CardActionArea>
                <div className={divState}>
                  <div className="event-description-left">
                    {event.description}
                  </div>
                  <div className="event-description-right">
                    <div className="event-description-right-attending">
                      <BsFillPeopleFill size={25}/><span><h4>X People Going</h4></span>
                    </div>
                    <div className="checkbox-container">
                      <form className="attending-form">
                        <label for="attending" className="label-for-attending-button">
                          <Checkbox />
                        </label>
                        <div className="count-me-in">
                          <h4>Count Me In!</h4>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </Grid>
          )
        }) : console.log('Loading...')}
      </div>
    </>
  )
}

export default SpecificGroup;
