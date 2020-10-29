import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';



const Groups = (props) => {

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
      height: '250px'
    },

    typography: {
      fontSize: theme.typography.fontSize
    }
  }));

  const classes = useStyles()

  console.log(props.groups)
  const groups = props.groups
  return(
    <>
      <div className="groups-container">
        {/* <Grid container spacing={2} className={classes.grid} >
          {groups.map((group, idx) => {
            return (
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper} >
                  <div className="group-card" key={idx} id={props.ids[idx]}>
                    <span className="group-name">
                      {group}
                    </span>
                  </div>
                </Paper>
              </Grid>
            )
          })}
        </Grid> */}
        <Grid container spacing={2} className={classes.grid} >
          {groups.map((group, idx) => {
            return (
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper} >
                  <div className="group-card" key={idx} id={props.ids[idx]}>
                    <span className="group-name">
                      {group}
                    </span>
                  </div>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </div>

    </>
  )
}


export default Groups;
