import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
}));

export default function AddUserForm() {
  const classes = useStyles();

  return (
    <Grid item>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Add new user
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="username"
              name="username"
              label="User name"
              
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Full Name"
              fullWidth
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              id="role"
              name="role"
              label="Role"
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}