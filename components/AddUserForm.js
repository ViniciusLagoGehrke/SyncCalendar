import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { data } from '../initialData';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
}));

const handleAddUser = () => { alert(roles) }

const roles = Object.values(data.ROLE);

export default function AddUserForm() {
  const classes = useStyles();
  const [role, setRole] = useState('basic');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Grid item sm={4}>

      <Grid
        container
        spacing={3}
        alignItems="baseline"
        wrap="nowrap"
      >
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Add new user
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <IconButton
            aria-label="add"
            onClick={handleAddUser}
          >
            <AddCircleRoundedIcon color="secondary" fontSize="large"/>
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            id="username"
            name="username"
            label="User name"
            fullWidth
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            required
            select
            id="role"
            label="Role"
            fullWidth
            value={role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}