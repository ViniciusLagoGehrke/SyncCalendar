import LinkMui from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Coded with &hearts; by{' '}
      <LinkMui color="inherit" href="https://github.com/ViniciusLagoGehrke">
        Vinicius Gehrke
      </LinkMui>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}