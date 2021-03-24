import { useState } from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../utils/useInput';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
}));

const roles = ['basic','manager','admin'];

export default function AddUserForm({ users, updateUsers }) {
  const classes = useStyles();
  const [newUserRole, setNewUserRole] = useState('basic');

  const handleChange = (event) => {
    setNewUserRole(event.target.value);
  };

  let newUser = { id: "VGehrke", name: 'Vinicius Gehrke', password: "VGehrke", role: "basic" }

  const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
  const { value:name, bind:bindName, reset:resetName } = useInput('');
  const { value:role, bind:bindRole, reset:resetRole } = useInput('');
  
  const handleSubmit = (event) => {
      event.preventDefault();
      alert(`Submitting Name ${username} ${password} ${name} ${role}`);
      resetUsername();
      resetPassword();
      resetName();
      resetRole();
  }

  return (
    <Grid item sm={4}>
      <form
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
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
              type="submit"
              aria-label="add"
            >
              <AddCircleRoundedIcon color="secondary" fontSize="large"/>
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              variant="outlined"
              required
              id="username"
              name="username"
              label="User name"
              fullWidth
              {...bindUsername}
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
              {...bindPassword}
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
              {...bindName}
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
              value={newUserRole}
              onChange={handleChange}
              {...bindRole}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

AddUserForm.propTypes = {
  onSubmit: PropTypes.func,
}