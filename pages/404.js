import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

export default function Custom404() {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.root}>
        <h1>404 - Page Not Found</h1>
      </Container>
    </Layout>
  )
}