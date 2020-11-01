import React, {useState, useContext, useEffect} from 'react';
import Groups from './Groups';
import Drawer from 'react-drag-drawer'
import Button from '@material-ui/core/Button';
import CalendarComponent from './Calendar';
import { makeStyles } from '@material-ui/core/styles';
import {store} from '../store'
import EventsHomePage from './EventsHomePage';

const NavBar = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [city, setCity] = useState('Houston')
  const [groups, setGroups] = useState([])
  const [groupId, setIds] = useState([])
  const [eventsState, setEvents] = useState([])

  //---------------------------------------------------//

  let events;

  const updateEvents = () => {
    console.log(store.getState())
    events = store.getState()
    setEvents(events)
    console.log(events)
  }

  // useEffect(() => {
  //   const updateState = async () => {
  //     console.log(store.getState())
  //     events = store.getState()
  //     setEvents(events)
  //     console.log(events)
  //   }
  // }, [])


  const unsubscribeUpdateEvents = store.subscribe(updateEvents);




  const updateInputVal = e => setInputValue(e.target.value)

  const cityContext = useContext([city, setCity])

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();


  // returns an array of groups that satisfy the search query, as well as updates the groups state to that array

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userCity = {city}
    console.log(userCity)
    const res = await fetch(`http://localhost:8080/api/groups/search/${userCity.city}`)
    if (res.ok && inputValue) {
      const returnedGroups = await res.json({groups})
      console.log(returnedGroups.groups)

      let groupMatches = []
      let groupIds = []

      returnedGroups.groups.forEach(group => {
        let groupName = group.name
        let lowerGroupName = groupName.toLowerCase()
        if(lowerGroupName.includes(inputValue.toLowerCase())) {
          groupMatches.push(groupName)
          groupIds.push(group.id)
        }
        // console.log(group.name)
      })

      console.log(groupMatches)

      setGroups(groupMatches)
      setIds(groupIds)

      return
    }

    console.error('something went wrong with the search')
  }
  return (
    <>
      <div className="navbar-container">

        <div className="search-bar-container">
          <form onSubmit={handleSubmit}>
            <input className="search-bar" value={inputValue} onChange={updateInputVal} placeholder={'Search'} />
          </form>
        </div>

        <div className="location-container">
          City: <span className="city-name">Houston</span>
        </div>

        <div className="group-events-toggle">
          <div className="group-button">
              <Button variant="outlined" color="primary" style={{color: "teal"}}>Groups</Button>
          </div>
          <div className="event-button">
          <Button variant="contained" color="primary">Events</Button>
          </div>
        </div>

      </div>
      <div className="calendar">
        <CalendarComponent />
      </div>
{/*
        {() =>{
          if(eventsState) {
            return (
              <div>
                <EventsHomePage events={events} />
              </div>
            )
          } else {
            return (
              <div>
                NO EVENTS
              </div>
            )
          }
        }} */}

      <EventsHomePage events={eventsState} />
      <Groups groups={groups} ids={groupId} />
    </>
  )
}

export default NavBar;
