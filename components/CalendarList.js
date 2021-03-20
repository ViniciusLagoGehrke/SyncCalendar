import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Calendar from '../components/Calendar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

function CalendarList({ Calendars }) {
  const classes = useStyles();

  const filtered = Calendars.map(calendar =>
    <Grid key={calendar.id} item xs={12} sm={6} md={4}>
      <Paper className={classes.paper}>
        <Calendar calendar={calendar} />
      </Paper>
    </Grid>
  );
  
  return (
    <>
      {filtered}
    </>
  )
}

export default CalendarList;