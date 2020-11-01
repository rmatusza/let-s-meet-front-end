import React, {useEffect, useState, createContext} from 'react'
import Calendar from 'react-calendar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {store} from '../store'
import {updateEvents} from '../actions/updateEvents';
import {updateDate} from '../actions/currentDate';

const CalendarComponent = () => {

  const [currentDate, setCurrentDate] = useState('')
  const [events, setEvents] = useState([]);



  const handleDateChange = async (e, currentDate) => {
    const memberKey = localStorage.key(0)
    const userid = localStorage.getItem(memberKey)
    console.log(currentDate)
    if(e) {
      setCurrentDate(e.target.value)
    }
    const res = await fetch(`http://localhost:8080/api/events/${currentDate}/${userid}`)

    if(res.ok) {
      const data = await res.json()
      console.log(data.events)
      setEvents(data)
      store.dispatch(updateEvents(data.events))
    }
    console.log(store.getState())
  }

  useEffect( async () => {
    const memberKey = localStorage.key(0)
    const userid = localStorage.getItem(memberKey)

    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()

    // await setCurrentDate(`${year}-${month}-${day}`)
    let currentDate = `${year}-${month}-${day}`
    handleDateChange(null, currentDate)
    // await setCurrentDate(`${year}-${month}-${day}`)
    // console.log(currentDate)
    // if(currentDate) {
    //   //   // const res = await fetch(`http://localhost:8080/api/events/${currentDate}/${userid}`)

    //   //   // if(res.ok) {
    //   //   //   const data = await res.json()
    //   //   //   setEvents[data]
    //   //   //   // console.log(data)
    //   //   // }
    //   await handleDateChange(null, )
    // }


  }, [])

  const getDate = () => {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()

    // setCurrentDate(`${year}-${month}-${day}`)

    // store.dispatch(updateDate([`${year}-${month}-${day}`]))
    return `${year}-${month}-${day}`
  }



  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

    const classes = useStyles();
    // console.log(currentDate)
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Event Calendar"
          defaultValue={getDate()}
          type="date"
          className={classes.textField}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
}

export default CalendarComponent;
