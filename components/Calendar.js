/*
  Calendar should contain:
    -calendar name
    -contributor name
    -owner
    -their current time (done)
    -diff from local time (down to seconds 
*/

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Title from './Title';
import useClock from '../utils/useClock';

// Generate Calendar Data
function createData(id, deliverDate, work) {
  return { id, deliverDate, work };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Email'),
  createData(1, '16 Mar, 2019', 'Meeting'),
  createData(2, '16 Mar, 2019', 'Lunch'),
  createData(3, '16 Mar, 2019', 'Code'),
  createData(4, '15 Mar, 2019', 'Code Review'),
];

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  boxBaseline:{
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  clockIcon:{
    marginRight: theme.spacing(1)
  },
  table: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Calendar({ calendar }) {
  const time = useClock();
  const classes = useStyles();
  return (
    <>
      <Box className={classes.boxBaseline}>
        <Title>{calendar.name}</Title>
        <Typography align='right' component="p" variant="body1" noWrap >
          {calendar.owner}
        </Typography>
      </Box>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Deliver Date</TableCell>
            <TableCell>Work</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.deliverDate}</TableCell>
              <TableCell>{row.work}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box className={classes.box}>
        <Box className={classes.box}>
          <AccessTimeIcon className={classes.clockIcon}/>
          <Typography component="p" variant="body1" noWrap >
            {time.toLocaleTimeString()}
          </Typography>
        </Box>
        <Typography component="p" variant="body1" noWrap >
          {'+4 hours'}
        </Typography>
      </Box>
    </>
  );
}